import json
import os

from embeddings import EmbeddingService


INPUT_FILE = os.path.join(
    "data",
    "chunks.jsonl"
)

OUTPUT_FILE = os.path.join(
    "data",
    "embedded_chunks.jsonl"
)


def load_chunks(file_path):
    chunks = []

    with open(file_path, "r", encoding="utf-8") as file:

        for line in file:
            line = line.strip()

            if line:
                chunks.append(json.loads(line))

    return chunks


def save_chunks(chunks, file_path):

    with open(file_path, "w", encoding="utf-8") as file:

        for chunk in chunks:
            file.write(
                json.dumps(
                    chunk,
                    ensure_ascii=False
                ) + "\n"
            )


def main():

    print("Loading chunks...")

    chunks = load_chunks(INPUT_FILE)

    print(f"Loaded {len(chunks)} chunks.")

    # Create reusable embedding service
    embedding_service = EmbeddingService()

    # Extract text
    texts = [
        chunk["text"]
        for chunk in chunks
    ]

    print("Generating embeddings...")

    embeddings = embedding_service.embed_documents(texts)

    print("Adding embeddings to chunks...")

    for chunk, embedding in zip(chunks, embeddings):

        chunk["embedding"] = embedding

    save_chunks(
        chunks,
        OUTPUT_FILE
    )

    print()
    print("Embedding completed!")
    print(f"Created: {OUTPUT_FILE}")
    print(f"Total chunks: {len(chunks)}")
    print(f"Embedding dimensions: {len(embeddings[0])}")

if __name__ == "__main__":
    main()