import React, { useState } from "react";

// Optional: Move this to global.css if you prefer
const styles = `
@keyframes dots {
  0%, 20% { content: ''; }
  40% { content: '.'; }
  60% { content: '..'; }
  80%, 100% { content: '...'; }
}
.typing::after {
  content: '';
  animation: dots 1.2s steps(4, end) infinite;
}
`;

export const ChatAgent = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setOutput(""); // Reset previous output

    const payload = {
      output_type: "chat",
      input_type: "chat",
      input_value: input,
      session_id: "user_1", // Can customize per user
    };

    try {
      const response = await fetch(
        "http://localhost:7860/api/v1/run/ad618d95-aaa9-4f37-8f71-5b91e5e5f66c",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_LANGFLOW_API_KEY || "",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      setOutput(data?.result || "No response from agent.");
    } catch (err) {
      console.error(err);
      setOutput("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="p-4 border rounded max-w-md mx-auto space-y-4 shadow bg-white">
        <h2 className="text-lg font-semibold">Ask our Loan Agent</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. What are the interest rates?"
          className="w-full border px-3 py-2 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Ask Agent
        </button>
        <div className="min-h-[2rem] text-gray-700">
          {loading ? (
            <span className="typing text-gray-400">Thinking</span>
          ) : (
            output && <p>{output}</p>
          )}
        </div>
      </div>
    </>
  );
};

const response = await fetch("https://langflow-1-og1f.onrender.com/agent", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ input: "Tell me about loan options" }),
});
