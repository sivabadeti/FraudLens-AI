export const chatWithAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate message
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    console.log(`💬 User message: ${message}`);

    // Send message to Python RAG service
    const response = await fetch(
      "http://localhost:5002/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: message.trim(),
        }),
      }
    );

    const data = await response.json();

    // Python returned an error
    if (!response.ok) {
      return res.status(500).json({
        success: false,
        error: data.error || "RAG service failed",
      });
    }

    console.log("🤖 RAG response received");

    // Send Python's answer back to React
    return res.status(200).json({
      success: true,
      answer: data.answer,
    });

  } catch (error) {

    console.error(
      "❌ Chat Controller Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error: "Unable to connect to RAG service",
    });
  }
};