import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatInterface from "./AIAssistant/ChatInterface";
import StartScreen from "./AIAssistant/StartScreen";
import { defaultInitialMessage } from "../constants/aiContent";
import { aiAPI } from "../services/apiService";
import axios from "axios"; // 👈 FIXED

const AIAssistant = () => {
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [messages, setMessages] = useState([defaultInitialMessage]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStartChat = async (messageText) => {
    if (!messageText.trim()) return;
    setIsChatStarted(true);
    await handleSendMessage(messageText);
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(), // 👈 FIXED
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    await sendMessageToAPI(messageText);
  };

  const sendMessageToAPI = async (messageText) => {
    setIsLoading(true);

    try {
      let accumulatedText = "";
      const assistantMessageId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: "assistant", content: "", timestamp: new Date().toISOString() },
      ]);

      const onChunkHandler = (chunk) => {
        accumulatedText += chunk;
        
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId 
              ? { ...msg, content: accumulatedText }
              : msg
          )
        );
      };

      await aiAPI.generateResponse({
        messages: [{ role: "user", content: messageText }],
        onChunk: onChunkHandler,
      });
    } catch (error) {
      console.error("AI API Error:", error);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Sorry, I encountered an error. Please try again.", timestamp: new Date().toISOString() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <main className="flex-1 p-6">
        {!isChatStarted ? (
          <StartScreen
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            onStart={handleStartChat}
          />
        ) : (
          <ChatInterface
            messages={messages}
            isLoading={isLoading}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={() => handleSendMessage(inputMessage)} // 👈 IMPROVED
          />
        )}
      </main>
    </div>
  );
};

export default AIAssistant;
