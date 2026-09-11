class Retriever:

    def __init__(self, embedding_service, vector_store):

        self.embedding_service = embedding_service
        self.vector_store = vector_store

    def retrieve(self, query, limit=5):

        # Convert user query into an embedding
        query_vector = self.embedding_service.embed_text(
            query
        )

        # Perform vector search
        results = self.vector_store.search(
            query_vector=query_vector,
            limit=limit
        )

        return results