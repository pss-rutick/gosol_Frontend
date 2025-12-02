import React, { useRef, useEffect } from "react";
import { Send } from "lucide-react";

const ChatInterface = ({
  messages,
  isLoading,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleKeyPress,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="bg-white rounded-xl shadow-sm border flex flex-col h-[80vh]">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <div className="text-center text-xs text-gray-500">
          Today{" "}
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xl px-4 py-2 text-sm rounded-xl ${
                message.role === "user" ? "bg-[#0000FF] text-white" : "bg-gray-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && <p>AI Assistant is typing...</p>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t bg-gray-50">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask AI anything..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button onClick={handleSendMessage} className="p-2 bg-[#0000FF] text-white rounded-lg">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
