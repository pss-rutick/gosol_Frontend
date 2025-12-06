import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatInterface from "./AIAssistant/ChatInterface";
import StartScreen from "./AIAssistant/StartScreen";
import ClientsList from "./AIAssistant/ClientsList";
import { defaultInitialMessage } from "../constants/aiContent";
import { aiAPI } from "../services/apiService";
import { Menu } from "lucide-react";
import axios from "axios";

const AIAssistant = () => {
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [messages, setMessages] = useState([defaultInitialMessage]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedClientName, setSelectedClientName] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSelectClient = async (clientId, clientName) => {
    setSelectedClientId(clientId);
    setSelectedClientName(clientName);
    
    // Call get single client API
    try {
      const clientData = await clientsAPI.getClientById(clientId);
      console.log("Single Client Data:", clientData);
    } catch (error) {
      console.error("Error fetching single client:", error);
    }
  };

  const handleStartChat = async (messageText) => {
    if (!messageText.trim()) return;
    if (!selectedClientId) {
      alert("Please select a client first");
      return;
    }
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
        clientId: String(selectedClientId),
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
   <div className="flex h-[90vh] bg-[#F9FAFB] overflow-hidden">
      {/* Clients Sidebar */}
      <ClientsList 
        selectedClientId={selectedClientId} 
        onSelectClient={handleSelectClient}
        onClose={() => setIsSidebarOpen(false)}
        isOpen={isSidebarOpen}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden h-[90vh]">

        {/* Client Info Header - Top */}
        {selectedClientId && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-300 flex justify-between items-center flex-shrink-0">
            <div>
              <p className="text-sm text-gray-600">Client selected:</p>
              <p className="text-xl font-semibold text-blue-700">{selectedClientName || selectedClientId}</p>
            </div>
            <button
              onClick={() => {
                setSelectedClientId(null);
                setSelectedClientName(null);
                setIsChatStarted(false);
                setMessages([defaultInitialMessage]);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-white rounded transition-colors"
            >
              Change Client
            </button>
          </div>
        )}

        {/* Toggle Button */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="m-4 p-2 hover:bg-gray-200 rounded transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden h-full px-6 pt-6">

          {/* Chat or Start Screen - Scrollable */}
          <div className="flex-1 overflow-hidden">
            {!isChatStarted ? (
              <StartScreen
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                onStart={handleStartChat}
                selectedClientId={selectedClientId}
              />
            ) : (
              <ChatInterface
                messages={messages}
                isLoading={isLoading}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={() => handleSendMessage(inputMessage)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIAssistant;
