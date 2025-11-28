// // src/pages/AIAssistant.jsx
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Search,
//   Bot,
//   MessageCircle,
//   Sparkles,
//   Send,
//   Settings,
//   FileText,
//   Zap
// } from "lucide-react";

// // Import the Sidebar
// import Sidebar from "./Sidebar";
// import { aiAPI } from "../services/apiService";

// const AIAssistant = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       role: "assistant",
//       content: "Hello! I'm your AI Assistant. I can help you with task management, meeting summaries, client insights, and more. How can I assist you today?",
//       timestamp: new Date().toISOString()
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedTools, setSelectedTools] = useState([]);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const tools = [
//     { id: "tasks", name: "Task Management", icon: Zap, description: "Create, update, and prioritize tasks" },
//     { id: "meetings", name: "Meeting Analysis", icon: MessageCircle, description: "Summarize meetings and extract action items" },
//     { id: "clients", name: "Client Insights", icon: Users, description: "Get client data and relationship insights" },
//     { id: "emails", name: "Email Drafting", icon: FileText, description: "Draft professional emails and follow-ups" },
//     { id: "research", name: "Quick Research", icon: Sparkles, description: "Research clients, topics, or market trends" }
//   ];

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     const userMessage = {
//       id: Date.now(),
//       role: "user",
//       content: inputMessage,
//       timestamp: new Date().toISOString()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage("");
//     setIsLoading(true);

//     try {
//       // Simulate AI response (replace with actual API call)
//       setTimeout(async () => {
//         const response = await aiAPI.generateResponse({
//           message: inputMessage,
//           tools: selectedTools,
//           context: "priority-tasks"
//         });

//         const aiMessage = {
//           id: Date.now() + 1,
//           role: "assistant",
//           content: response.message || "Here's how I can help you with that! Let me know if you need more details.",
//           timestamp: new Date().toISOString(),
//           toolsUsed: response.toolsUsed || []
//         };

//         setMessages(prev => [...prev, aiMessage]);
//         setIsLoading(false);
//       }, 1500);
//     } catch (error) {
//       console.error("AI Assistant error:", error);
//       const errorMessage = {
//         id: Date.now() + 1,
//         role: "assistant",
//         content: "I apologize, but I encountered an issue processing your request. Please try again!",
//         timestamp: new Date().toISOString()
//       };
//       setMessages(prev => [...prev, errorMessage]);
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 font-sans text-[#1E1E1E]">
//       {/* Sidebar */}
//       <Sidebar handleLogout={() => console.log("Logout clicked")} />

//       {/* Main Content Area */}
//       <main className="flex-1 ml-64">
//         <div className="p-8">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0000FF] to-blue-700 bg-clip-text text-transparent mb-2">
//                 AI Assistant
//               </h1>
//               <p className="text-gray-600 text-sm">
//                 Your intelligent copilot for tasks, meetings, and client management
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-white/50 transition-colors">
//                 <Settings className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           {/* Tools Selection */}
//           <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8 shadow-lg">
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Sparkles className="h-5 w-5 text-[#0000FF]" />
//               Quick Tools
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//               {tools.map((tool) => {
//                 const Icon = tool.icon;
//                 const isActive = selectedTools.includes(tool.id);
//                 return (
//                   <button
//                     key={tool.id}
//                     onClick={() => {
//                       setSelectedTools(prev =>
//                         prev.includes(tool.id)
//                           ? prev.filter(id => id !== tool.id)
//                           : [...prev, tool.id]
//                       );
//                     }}
//                     className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${
//                       isActive
//                         ? 'border-[#0000FF] bg-[#0000FF]/5 shadow-lg'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     <Icon className={`h-6 w-6 mb-2 ${
//                       isActive ? 'text-[#0000FF]' : 'text-gray-500 group-hover:text-gray-700'
//                     }`} />
//                     <div className="text-sm font-medium text-gray-900 group-hover:text-gray-800">
//                       {tool.name}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tool.description}</p>
//                     {isActive && (
//                       <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#0000FF] rounded-full flex items-center justify-center">
//                         <div className="w-3 h-3 bg-white rounded-full"></div>
//                       </div>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Chat Interface */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col h-[70vh]">
//             {/* Messages Container */}
//             <div className="flex-1 p-6 overflow-y-auto space-y-6">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-3xl ${
//                       message.role === 'user'
//                         ? 'bg-gradient-to-r from-[#0000FF] to-blue-600 text-white'
//                         : 'bg-gray-50 border border-gray-200'
//                     } rounded-2xl p-4 rounded-br-md`}
//                   >
//                     <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    
//                     {/* Tools Used */}
//                     {message.toolsUsed?.length > 0 && (
//                       <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-current/20">
//                         {message.toolsUsed.map((tool) => (
//                           <span
//                             key={tool}
//                             className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
//                           >
//                             {tool}
//                           </span>
//                         ))}
//                       </div>
//                     )}
                    
//                     <p className="text-xs opacity-70 mt-3 text-right">
//                       {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </p>
//                   </div>
//                 </div>
//               ))}
              
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 rounded-br-md">
//                     <div className="flex items-center gap-2">
//                       <div className="flex space-x-1">
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//                       </div>
//                       <span className="text-sm text-gray-500">AI Assistant is typing...</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Area */}
//             <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-white/50">
//               <div className="max-w-4xl mx-auto">
//                 <div className="flex items-end gap-3">
//                   <div className="flex-1 relative">
//                     <textarea
//                       value={inputMessage}
//                       onChange={(e) => setInputMessage(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       placeholder="Ask me anything about your tasks, meetings, or clients..."
//                       className="w-full resize-none pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0000FF] focus:border-transparent placeholder-gray-500"
//                       rows={1}
//                       style={{ minHeight: '44px', maxHeight: '120px' }}
//                     />
//                     <button
//                       onClick={handleSendMessage}
//                       disabled={!inputMessage.trim() || isLoading}
//                       className="absolute bottom-3 right-3 p-2 text-[#0000FF] hover:bg-blue-50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                       <Send className={`h-5 w-5 ${inputMessage.trim() ? 'rotate-0' : 'rotate-45'} transition-transform`} />
//                     </button>
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2 text-center">
//                   Try asking: "What's my highest priority task?" or "Summarize my last meeting"
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AIAssistant;