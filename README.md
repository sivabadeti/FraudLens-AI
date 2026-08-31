# 🛡️ FraudLens AI

## AI-Powered Transaction Fraud Risk Analysis System

FraudLens AI is a full-stack machine learning application designed to analyze transaction data and estimate potential fraud risk before a transaction is completed.

The system combines a modern React frontend, Node.js backend, Flask-based machine learning service, MongoDB transaction storage, and a CatBoost classification model to provide real-time fraud risk analysis and monitoring.

---

## 🚀 Features

- 🤖 AI-powered fraud risk prediction
- 📊 Fraud probability and risk level classification
- 🔍 Analyze transactions before proceeding
- 📈 Live transaction monitoring and history
- 🧠 Model insights and prediction information
- 💾 MongoDB-based transaction storage
- ⚡ Real-time communication between frontend, backend, and ML service
- 🎨 Modern responsive fintech-inspired UI
- 🔐 Secure environment variable configuration

---

## 📸 Screenshots

### 🏠 Home Page

![Home Page](./screenshots/home.png)

### 🔍 Analyze Transaction

![Analyze Transaction](./screenshots/analyze.png)

### ✏️ Form

![Form](./screenshots/form.png)


### 📊 Live Monitor

![Live Monitor](./screenshots/live-monitor.png)

### 🧠 Model Insights

![Model Insights](./screenshots/model-insights.png)

---

## 🏗️ System Architecture

```text
                    ┌───────────────────┐
                    │   React Frontend  │
                    │      (Vite)       │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │  Node.js Backend  │
                    │     Express.js    │
                    └─────────┬─────────┘
                              │
                  ┌───────────┴───────────┐
                  ▼                       ▼
        ┌─────────────────┐      ┌─────────────────┐
        │   Flask ML API  │      │     MongoDB     │
        │                 │      │                 │
        │ CatBoost Model  │      │ Transaction     │
        │ Fraud Detection │      │    History      │
        └─────────────────┘      └─────────────────┘
```

🔄 Application Workflow:
  1.The user enters transaction details.
  2.The React frontend sends the transaction data to the Node.js backend.
  3.The backend forwards the data to the Flask ML service.
  4.The CatBoost model analyzes the transaction.
  5.The ML service returns the fraud probability and prediction.
  6.The system categorizes the transaction as Low, Medium, or High risk.
  7.The result is displayed to the user.
  8.Transaction history can be monitored through the Live Monitor page.



## 🧠 Machine Learning Model

FraudLens AI uses a **CatBoost Classifier** to analyze transaction patterns and predict potential fraud risk.

### Features Used by the Model

| Feature | Description |
| --- | --- |
| TransactionDT | Transaction time represented in seconds |
| TransactionAmt | Transaction amount |
| ProductCD | Product or transaction category |
| card1 | Primary card identifier |
| card2 | Secondary card information |
| card3 | Additional card information |
| card4 | Card network |
| card5 | Additional card attribute |
| card6 | Card type |
| addr1 | Billing address identifier |
| addr2 | Address region identifier |
| P_emaildomain | Purchaser email domain |
| R_emaildomain | Recipient email domain |
| has_R_emaildomain | Indicates whether recipient email exists |

### Risk Threshold

The fraud detection threshold is set to:

**30%**

Transactions are classified into different risk levels:

| Risk Level | Description |
| --- | --- |
| 🟢 LOW | Low probability of fraud |
| 🟡 MEDIUM | Potential fraud risk detected |
| 🔴 HIGH | High probability of fraud |


## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sivabadeti/FraudLens-AI.git
cd FraudLens-AI
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URI= your_mongodb_connection_string
PORT=5000
ML_SERVICE_URL=http://127.0.0.1:5001
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 4. ML Service Setup

Navigate to the ML service:

```bash
cd ml-service
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Run the Flask application:

```bash
python app.py
```

The ML service will run on:

```text
http://localhost:5001
```

### 5. Start the Application

Make sure all three services are running:

- Frontend → `http://localhost:5173`
- Backend → `http://localhost:5000`
- ML Service → `http://localhost:5001`

Open the frontend URL in your browser and start analyzing transactions.


🛠️ Tech Stack
Frontend :
  1.React
  2.Vite
  3.Tailwind CSS
  4.Axios
  5.Lucide React
Backend :
  1.Node.js
  2.Express.js
  3.MongoDB
  4.Mongoose
  5.Axios
Machine Learning :
  1.Python
  2.Flask
  3.CatBoost
  4.Pandas
  5.Flask-CORS
  

📂 Project Structure
FraudLens-AI/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── ml-service/
│   ├── app.py
│   ├── fraud_model.cbm
│   ├── model_config.json
│   └── requirements.txt
│
├── .gitignore
├── .gitattributes
└── README.md

🔗 Application Flow :
  Frontend
     ↓
  Node.js Backend
     ↓
  Flask ML Service
     ↓
  CatBoost Fraud Detection Model
     ↓
  Fraud Probability
     ↓
  Risk Classification
     ↓
  Frontend Result 

📊 Example Prediction Response :
  {
    "success": true,
    "prediction": 0,
    "fraud_probability": 12.45,
    "risk_level": "LOW",
    "threshold": 30
  }

Risk Recommendation :
  🟢 LOW → Safe to proceed with normal caution
  🟡 MEDIUM → Review the transaction carefully
  🔴 HIGH → High fraud risk detected

⚠️ FraudLens AI is designed as a decision-support system. Predictions should not be treated as absolute guarantees.

🔐 Environment Variables :
Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000
ML_SERVICE_URL=http://127.0.0.1:5001

Never commit your actual .env file or database credentials to GitHub.

🎯 Future Improvements
1.User authentication and authorization
2.Advanced analytics dashboard
3.Fraud trend visualization
4.Transaction filtering and search
5.Model performance metrics
6.Real-time alerts
7.Email and SMS notifications
8.Role-based access control
9.Cloud deployment
10.Improved model retraining pipeline



👨‍💻 Author

Siva Badeti

Computer Science Engineering Student
