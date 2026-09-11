import json
import os

from dotenv import load_dotenv

from src.vector_store import MongoVectorStore


INPUT_FILE = os.path.join(
    "data",
    "embedded_chunks.jsonl"
)


def load_embedded_chunks(file_path):
    chunks = []

    with open(
        file_path,
        "r",
        encoding="utf-8"
    ) as file:

        for line in file:
            line = line.strip()

            if line:
                chunks.append(
                    json.loads(line)
                )

    return chunks


def main():

    # Load environment variables
    load_dotenv()

    mongo_uri = os.getenv("MONGO_URI")
    database_name = os.getenv("MONGODB_DATABASE")
    collection_name = os.getenv("MONGODB_COLLECTION")

    if not mongo_uri:
        raise ValueError(
            "MONGO_URI is missing from .env"
        )

    if not database_name:
        raise ValueError(
            "MONGODB_DATABASE is missing from .env"
        )

    if not collection_name:
        raise ValueError(
            "MONGODB_COLLECTION is missing from .env"
        )

    print("Loading embedded chunks...")

    chunks = load_embedded_chunks(
        INPUT_FILE
    )

    print(
        f"Loaded {len(chunks)} chunks."
    )

    # Create MongoDB vector store
    vector_store = MongoVectorStore(
        connection_string=mongo_uri,
        database_name=database_name,
        collection_name=collection_name
    )

    # Connect to MongoDB
    vector_store.connect()

    print("Uploading chunks to MongoDB...")

    vector_store.insert_documents(
        chunks
    )

    total = vector_store.count_documents()

    print()
    print("Indexing completed successfully.")
    print(
        f"Documents in MongoDB: {total}"
    )


if __name__ == "__main__":
    main()