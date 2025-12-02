import React from "react";
import { Bot, Send } from "lucide-react";

const StartScreen = ({ inputMessage, setInputMessage, onStart, selectedClientId }) => {
  const handleStartChat = () => {
    if (!selectedClientId) {
      alert("Please select a client first");
      return;
    }
    if (inputMessage.trim()) {
      onStart(inputMessage);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleStartChat();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-3">
        Ready when you are.
      </h1>
      <p className="text-gray-500 mb-12 text-lg">Ask anything about your client</p>

      <div className="w-full max-w-2xl">
        <div className={`flex items-center gap-3 bg-gray-800 text-white px-6 py-4 rounded-full shadow-xl border-2 transition-all ${
          !selectedClientId ? "border-gray-600 opacity-70" : "border-blue-500"
        }`}>
          <button className="text-gray-400 hover:text-white text-xl">+</button>
          <input
            type="text"
            placeholder={selectedClientId ? "Ask anything..." : "Select a client first..."}
            className="bg-transparent outline-none flex-1 text-white placeholder-gray-400 text-lg"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!selectedClientId}
          />
          <Bot className="text-green-400 text-xl" />
          <button
            onClick={handleStartChat}
            disabled={!selectedClientId || !inputMessage.trim()}
            className={`text-xl transition-colors ${
              !selectedClientId || !inputMessage.trim() 
                ? "text-gray-500 opacity-50 cursor-not-allowed" 
                : "text-white hover:text-green-400"
            }`}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;