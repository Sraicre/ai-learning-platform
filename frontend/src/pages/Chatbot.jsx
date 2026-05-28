import { useState, useEffect, useRef } from "react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("chat");

  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = message;

    setChat((prev) => [...prev, { user: userMsg }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMsg,
          mode: mode,
        }),
      });

      const data = await res.json();

      setChat((prev) => [...prev, { bot: data.reply }]);
    } catch (error) {
      setChat((prev) => [...prev, { bot: "Error connecting to server" }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">🤖 AI Assistant</h1>

        <div className="flex gap-3 justify-center mb-6">
          <button
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl"
            onClick={() => setMode("planner")}
          >
            📚 Study Planner
          </button>

          <button
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-xl"
            onClick={() => setMode("quiz")}
          >
            🧠 Quiz Generator
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl"
            onClick={() => setMode("chat")}
          >
            💬 Normal Chat
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 h-[500px] overflow-y-auto mb-4 shadow-lg">
          {chat.map((msg, index) => (
            <div key={index}>
              {msg.user && (
                <div className="flex justify-end mb-3">
                  <div className="bg-blue-500 px-4 py-2 rounded-2xl max-w-[70%]">
                    {msg.user}
                  </div>
                </div>
              )}

              {msg.bot && (
                <div className="flex justify-start mb-3">
                  <div className="bg-gray-700 px-4 py-2 rounded-2xl max-w-[70%]">
                    {msg.bot}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mb-3">
              <div className="bg-gray-700 px-4 py-2 rounded-2xl animate-pulse">
                Typing...
              </div>
            </div>
          )}

          <div ref={chatRef}></div>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something..."
            className="flex-1 p-3 rounded-xl bg-gray-800 text-white outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
