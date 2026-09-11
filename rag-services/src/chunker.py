from langchain_text_splitters import RecursiveCharacterTextSplitter


class DocumentChunker:

    def __init__(self, chunk_size=500, chunk_overlap=100):

        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )

    def chunk_document(self, document):

        text_parts = []

        for key, value in document.items():

            if value:

                if isinstance(value, list):
                    value = ", ".join(map(str, value))

                text_parts.append(f"{key}: {value}")

        text = "\n".join(text_parts)

        return self.splitter.split_text(text)

    def chunk_documents(self, documents):

        all_chunks = []

        for doc_id, document in enumerate(documents):

            chunks = self.chunk_document(document)

            for chunk_id, chunk in enumerate(chunks):

                all_chunks.append({
                    "doc_id": doc_id,
                    "chunk_id": chunk_id,
                    "text": chunk
                })

        return all_chunks