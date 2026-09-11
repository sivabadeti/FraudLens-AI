from pymongo import MongoClient


class MongoVectorStore:

    def __init__(
        self,
        connection_string,
        database_name,
        collection_name
    ):
        self.connection_string = connection_string
        self.database_name = database_name
        self.collection_name = collection_name

        self.client = None
        self.database = None
        self.collection = None

    def connect(self):

        self.client = MongoClient(
            self.connection_string
        )

        self.database = self.client[
            self.database_name
        ]

        self.collection = self.database[
            self.collection_name
        ]

        # Test connection
        self.client.admin.command("ping")

        print("Connected to MongoDB successfully.")

    def insert_documents(self, documents):

        if self.collection is None:
            raise RuntimeError(
                "MongoDB is not connected."
            )

        if not documents:
            return

        result = self.collection.insert_many(
            documents
        )

        print(
            f"Inserted {len(result.inserted_ids)} documents."
        )

    def count_documents(self):

        if self.collection is None:
            raise RuntimeError(
                "MongoDB is not connected."
            )

        return self.collection.count_documents({})

    def search(
        self,
        query_vector,
        index_name="vector_index",
        limit=5
    ):

        if self.collection is None:
            raise RuntimeError(
                "MongoDB is not connected."
            )

        pipeline = [
            {
                "$vectorSearch": {
                    "index": index_name,
                    "path": "embedding",
                    "queryVector": query_vector,
                    "numCandidates": 100,
                    "limit": limit
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "doc_id": 1,
                    "chunk_id": 1,
                    "text": 1,
                    "score": {
                        "$meta": "vectorSearchScore"
                    }
                }
            }
        ]

        return list(
            self.collection.aggregate(pipeline)
        )