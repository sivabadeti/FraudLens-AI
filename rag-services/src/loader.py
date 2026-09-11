import json


class JSONLLoader:

    def load(self, file_path):
        documents = []

        with open(file_path, "r", encoding="utf-8") as file:

            for line in file:
                line = line.strip()

                if line:
                    documents.append(json.loads(line))

        return documents
