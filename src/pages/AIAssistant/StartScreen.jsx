import React from "react";
import { Bot, Send } from "lucide-react";

const StartScreen = ({ inputMessage, setInputMessage, onStart }) => {
  const handleStartChat = () => {
    if (inputMessage.trim()) {
      onStart(inputMessage); // Pass message to parent
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h2 className="text-2xl font-medium text-gray-600 mb-6">
        Ready when you are.
      </h2>

      <div className="flex items-center bg-[#2A2A2A] text-white px-4 py-3 rounded-full w-[50%] shadow-lg">
        <button className="mr-3 text-gray-300">+</button>
        <input
          type="text"
          placeholder="Ask anything"
          className="bg-transparent outline-none flex-1"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          // ❌ remove onFocus
        />
        <Bot className="text-green-500 mx-2" />
        <Send
          className="mx-2 cursor-pointer"
          onClick={handleStartChat} // 🔥 Click send starts chat
        />
      </div>
    </div>
  );
};

export default StartScreen;