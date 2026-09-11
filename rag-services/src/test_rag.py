import os

from dotenv import load_dotenv

from src.embeddings import EmbeddingService
from src.vector_store import MongoVectorStore
from src.retriever import Retriever
from src.llm import LLMService
from src.rag import RAGService


def main():

    load_dotenv()

    # -------------------------
    # Embedding service
    # -------------------------

    embedding_service = EmbeddingService()

    # -------------------------
    # MongoDB vector store
    # -------------------------

    vector_store = MongoVectorStore(
        connection_string=os.getenv("MONGO_URI"),
        database_name=os.getenv("MONGODB_DATABASE"),
        collection_name=os.getenv("MONGODB_COLLECTION")
    )

    vector_store.connect()

    # -------------------------
    # Retriever
    # -------------------------

    retriever = Retriever(
        embedding_service=embedding_service,
        vector_store=vector_store
    )

    # -------------------------
    # LLM
    # -------------------------

    llm = LLMService()

    # -------------------------
    # RAG
    # -------------------------

    rag = RAGService(
        retriever=retriever,
        llm=llm
    )

    # -------------------------
    # Test query
    # -------------------------

    query = (
        "Someone is asking me for my UPI PIN. "
        "What should I do?"
    )

    print()
    print("=" * 80)
    print("USER:")
    print(query)
    print("=" * 80)

    answer = rag.answer(
        query=query,
        limit=5
    )

    print()
    print("FRAUDLENS ASSISTANT:")
    print(answer)
    print("=" * 80)


if __name__ == "__main__":
    main()