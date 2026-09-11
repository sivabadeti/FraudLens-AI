class RAGService:

    def __init__(
        self,
        retriever,
        llm
    ):

        self.retriever = retriever
        self.llm = llm

    def answer(
        self,
        query,
        limit=5
    ):

        # Retrieve relevant knowledge
        results = self.retriever.retrieve(
            query=query,
            limit=limit
        )

        if not results:
            return (
                "I couldn't find enough relevant information "
                "to answer that safely."
            )

        # Build context
        context = "\n\n".join(
            result["text"]
            for result in results
        )

        # Generate answer using retrieved context
        answer = self.llm.generate(
            query=query,
            context=context
        )

        return answer