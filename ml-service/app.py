from flask import Flask, request, jsonify
from flask_cors import CORS
from catboost import CatBoostClassifier
import pandas as pd
import json
import os

app = Flask(__name__)
CORS(app)


# Load model configuration

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

config_path = os.path.join(BASE_DIR, "model_config.json")

with open(config_path, "r") as file:
    config = json.load(file)

FEATURES = config["features"]
THRESHOLD = config["threshold"]


# Load CatBoost model

model_path = os.path.join(BASE_DIR, "fraud_model.cbm")

model = CatBoostClassifier()
model.load_model(model_path)





# Feature Types


NUMERIC_FEATURES = [
    "TransactionDT",
    "TransactionAmt",
    "card1",
    "card2",
    "card3",
    "card5",
    "addr1",
    "addr2"
]

CATEGORICAL_FEATURES = [
    "ProductCD",
    "card4",
    "card6",
    "P_emaildomain",
    "R_emaildomain"
]


# Health check

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "FraudLens AI ML Service is running",
        "model_loaded": True
    })



# Prediction API

@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No input data received"
            }), 400


       
        # Check missing features
        missing_features = [
            feature for feature in FEATURES
            if feature not in data
        ]

        if missing_features:
            return jsonify({
                "success": False,
                "message": "Missing required features",
                "missing_features": missing_features
            }), 400


        
        # Handle missing numeric values
        for feature in NUMERIC_FEATURES:
            if feature in data:
                if data[feature] is None or data[feature] == "":
                    data[feature] = 0


        
        # Handle missing categorical values
        for feature in CATEGORICAL_FEATURES:
            if feature in data:
                if data[feature] is None or data[feature] == "":
                    data[feature] = "unknown"


        # Handle recipient email flag
        if (
            data.get("R_emaildomain") is None
            or data.get("R_emaildomain") == ""
            or data.get("R_emaildomain") == "unknown"
        ):
            data["has_R_emaildomain"] = 0
        else:
            data["has_R_emaildomain"] = 1


        # Create DataFrame in exact order
        
        input_data = pd.DataFrame([
            {
                feature: data.get(feature)
                for feature in FEATURES
            }
        ])




        
        # Prediction probability
        probability = model.predict_proba(input_data)[0][1]

        prediction = int(probability >= THRESHOLD)


        # Risk level
        if probability >= 0.75:
            risk_level = "HIGH"

        elif probability >= THRESHOLD:
            risk_level = "MEDIUM"

        else:
            risk_level = "LOW"


        # Return prediction
        return jsonify({
            "success": True,
            "prediction": prediction,
            "fraud_probability": round(float(probability) * 100, 2),
            "risk_level": risk_level,
            "threshold": THRESHOLD * 100
        })


    except Exception as error:

        print("❌ Prediction Error:", str(error))

        return jsonify({
            "success": False,
            "message": "Prediction failed",
            "error": str(error)
        }), 500


# Run Flask Server
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )