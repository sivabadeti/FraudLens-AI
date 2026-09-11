const RAG_SERVICE_URL =
  process.env.RAG_SERVICE_URL || "http://localhost:5002";

const askRAG = async (message) => {
  const response = await fetch(
    `${RAG_SERVICE_URL}/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "RAG service request failed"
    );
  }

  return data;
};

export default askRAG;