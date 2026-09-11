import json
from langchain_text_splitters import RecursiveCharacterTextSplitter

INPUT_FILE = "clean_knowledge.jsonl"
OUTPUT_FILE = "chunks.jsonl"

# Load documents
documents = []

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    for line in f:
        if line.strip():
            documents.append(json.loads(line))

print(f"Loaded documents: {len(documents)}")

# Text splitter
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)

chunks = []

for doc_id, document in enumerate(documents):

    # Convert the complete document into searchable text
    text_parts = []

    for key, value in document.items():

        if value:
            if isinstance(value, list):
                value = ", ".join(map(str, value))

            text_parts.append(f"{key}: {value}")

    text = "\n".join(text_parts)

    # Split into chunks
    document_chunks = splitter.split_text(text)

    for chunk_id, chunk in enumerate(document_chunks):

        chunks.append({
            "doc_id": doc_id,
            "chunk_id": chunk_id,
            "text": chunk
        })


# Save chunks
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:

    for chunk in chunks:
        f.write(
            json.dumps(chunk, ensure_ascii=False) + "\n"
        )

print(f"Created: {OUTPUT_FILE}")
print(f"Total chunks: {len(chunks)}")