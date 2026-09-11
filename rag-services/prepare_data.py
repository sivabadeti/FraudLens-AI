import json
import os

DATA_DIR = "documents/financial_safety"
OUTPUT_FILE = "clean_knowledge.jsonl"


def read_jsonl(filename):
    path = os.path.join(DATA_DIR, filename)

    records = []

    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()

            if line:
                records.append(json.loads(line))

    return records


def clean_first_dataset(records):
    cleaned = []

    for record in records:

        document = {
            "question": record.get("user_query", ""),
            "answer": record.get("combined_completion", ""),
            "actions": record.get("actions_suggestions_next_step", ""),
            "guidance": record.get("answer_guidance", ""),
            "category": record.get("domain_category", ""),
            "topic": record.get("subdomain", ""),
            "source": record.get("source", "")
        }

        cleaned.append(document)

    return cleaned


def clean_second_dataset(records):
    cleaned = []

    for record in records:

        steps = record.get("steps", [])

        document = {
            "question": f"What should I know about {record.get('fraud_type', '')}?",
            "scenario": record.get("scenario", ""),
            "actions": steps,
            "advice": record.get("advice", ""),
            "severity": record.get("severity", ""),
            "tags": record.get("tags", []),
            "source_type": record.get("source_type", "")
        }

        cleaned.append(document)

    return cleaned


# Load datasets
dataset1 = read_jsonl("train_0.jsonl")
dataset2 = read_jsonl("INDIA-SPECIFIC-FRAUD-V1.jsonl")

print(f"Dataset 1: {len(dataset1)} records")
print(f"Dataset 2: {len(dataset2)} records")


# Clean
cleaned1 = clean_first_dataset(dataset1)
cleaned2 = clean_second_dataset(dataset2)

all_documents = cleaned1 + cleaned2


# Save
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:

    for document in all_documents:
        f.write(json.dumps(document, ensure_ascii=False) + "\n")


print(f"\nCreated {OUTPUT_FILE}")
print(f"Total documents: {len(all_documents)}")