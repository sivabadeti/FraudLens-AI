import os

from dotenv import load_dotenv

from src.embeddings import EmbeddingService
from src.vector_store import MongoVectorStore
from src.retriever import Retriever


def main():

    load_dotenv()

    mongo_uri = os.getenv("MONGO_URI")
    database_name = os.getenv("MONGODB_DATABASE")
    collection_name = os.getenv("MONGODB_COLLECTION")

    # Create embedding service
    embedding_service = EmbeddingService()

    # Create MongoDB vector store
    vector_store = MongoVectorStore(
        connection_string=mongo_uri,
        database_name=database_name,
        collection_name=collection_name
    )

    vector_store.connect()

    # Create retriever
    retriever = Retriever(
        embedding_service=embedding_service,
        vector_store=vector_store
    )

    # Test query
    query = "Someone is asking me for my UPI PIN. What should I do?"

    print()
    print("USER QUERY:")
    print(query)

    print()
    print("RETRIEVING RELEVANT KNOWLEDGE...")

    results = retriever.retrieve(
        query=query,
        limit=5
    )

    print()
    print(f"Retrieved {len(results)} results.")
    print("=" * 80)

    for i, result in enumerate(results, start=1):

        print()
        print(f"RESULT {i}")
        print(f"Score: {result.get('score')}")
        print(f"Document ID: {result.get('doc_id')}")
        print(f"Chunk ID: {result.get('chunk_id')}")
        print()
        print(result.get("text"))
        print("-" * 80)


if __name__ == "__main__":
    main()