import os

from flask import Flask, request, jsonify
from dotenv import load_dotenv

from src.embeddings import EmbeddingService
from src.vector_store import MongoVectorStore
from src.retriever import Retriever
from src.llm import LLMService
from src.rag import RAGService


# Load environment variables
load_dotenv()


# Create Flask application
app = Flask(__name__)


# --------------------------------------------------
# Initialize RAG components ONCE when server starts
# --------------------------------------------------

print("Initializing FraudLens RAG service...")

embedding_service = EmbeddingService()

vector_store = MongoVectorStore(
    connection_string=os.getenv("MONGO_URI"),
    database_name=os.getenv("MONGODB_DATABASE"),
    collection_name=os.getenv("MONGODB_COLLECTION")
)

vector_store.connect()

retriever = Retriever(
    embedding_service=embedding_service,
    vector_store=vector_store
)

llm = LLMService()

rag = RAGService(
    retriever=retriever,
    llm=llm
)

print("FraudLens RAG service initialized successfully.")


# --------------------------------------------------
# Health check
# --------------------------------------------------

@app.route("/health", methods=["GET"])
def health():

    return jsonify({
        "status": "ok",
        "service": "FraudLens RAG"
    })


# --------------------------------------------------
# Chat endpoint
# --------------------------------------------------

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "error": "Request body is required."
            }), 400

        query = data.get("message")

        if not query:
            return jsonify({
                "error": "Message is required."
            }), 400

        print(f"User query: {query}")

        answer = rag.answer(
            query=query,
            limit=5
        )

        return jsonify({
            "answer": answer
        })

    except Exception as error:

        print(f"RAG Error: {error}")

        return jsonify({
            "error": "Something went wrong while processing your question."
        }), 500


# --------------------------------------------------
# Start server
# --------------------------------------------------

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5002,
        debug=True
    )