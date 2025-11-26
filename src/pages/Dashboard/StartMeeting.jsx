// C:\PSS\gosol\src\pages\Dashboard\StartMeeting.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, MapPin, Mic, 
  Bot, ChevronDown, Plus, Send, FileText, Save, Sparkles 
} from 'lucide-react';

// Import the constants
import { meetingData } from '../../constants/startMeetingData';

export default function Meeting() {
  const navigate = useNavigate();
  const { header, quickFacts, propertyIntelligence, transcript, smartSuggestions, actionItems } = meetingData;
  const [inputValue, setInputValue] = useState("");
  
  // State to toggle the action menu
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Top Header - Fixed Height */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#0000FF] flex items-center gap-2">
              {header.clientName} <span className="text-gray-400 font-normal">-</span> <span className="text-black font-medium text-lg">{header.role}</span>
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {header.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {header.phone}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {header.location}</span>
            </div>
          </div>
        </div>
        <button 
            onClick={() => navigate(-1)} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
        >
          End Meeting
        </button>
      </header>

      {/* Main Grid Layout - 3 Columns */}
      <main className="flex-1 p-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          
          {/* --- LEFT COLUMN: Quick Facts & Intelligence --- */}
          <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Quick Facts Card */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-lg">{quickFacts.title}</h3>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {quickFacts.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                    <p className="text-xs font-bold text-[#0000FF] mb-1">{item.label}:</p>
                    <p className="text-sm font-medium text-gray-800">
                      {item.value} 
                      {item.highlight && <span className="text-blue-500 ml-1 text-xs font-bold">• verified</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Intelligence Card */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-lg">{propertyIntelligence.title}</h3>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                 {propertyIntelligence.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                    <p className="text-xs font-bold text-[#0000FF] mb-1">{item.label}:</p>
                    <p className="text-sm font-medium text-gray-800">{item.value}</p>
                    {item.subValue && <p className="text-xs text-green-600 font-semibold mt-1">{item.subValue}</p>}
                    {item.trend && <p className="text-xs text-gray-500 mt-0.5">{item.trend}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- CENTER COLUMN: Live Transcript --- */}
          <div className="lg:col-span-2 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 h-full relative">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#0000FF] font-bold text-lg">{transcript.title}</span>
                <span className="text-red-500 text-sm flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> 
                  {transcript.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100"><Mic className="w-4 h-4" /></button>
                <button className="p-2 rounded-full bg-blue-50 text-[#0000FF] hover:bg-blue-100"><Mail className="w-4 h-4" /></button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"><Bot className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
              <div className="flex justify-center mb-6">
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{transcript.date}</span>
              </div>

              <div className="space-y-6">
                {transcript.messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.type === 'agent' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type === 'client' && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                        {msg.sender}
                      </div>
                    )}

                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.type === 'agent' 
                        ? 'bg-green-50 text-gray-800 rounded-tr-none border border-green-100'
                        : 'bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100'
                    }`}>
                      {msg.text}
                    </div>

                    {msg.type === 'agent' && (
                      <div className="w-8 h-8 rounded-full bg-[#0000FF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {msg.sender}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex items-center gap-2 text-gray-400 text-xs font-medium">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span> AI is listening...
              </div>
            </div>

            {/* Chat Input & Actions */}
            <div className="p-4 border-t border-gray-100 relative">
              
              {/* --- POPUP MENU FOR BUTTONS --- */}
              {showActions && (
                <div className="absolute bottom-20 left-4 z-20 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2">
                   {/* Green Button: Send Summary */}
                   <button className="flex items-center gap-2 bg-[#22c55e] hover:bg-green-700 text-white px-5 py-2.5 rounded-full shadow-lg font-medium text-sm transition-all">
                      <FileText className="w-4 h-4" /> Send Summary
                   </button>
                   
                   {/* Blue Button: Save Notes */}
                   <button className="flex items-center gap-2 bg-[#0000FF] hover:bg-blue-800 text-white px-5 py-2.5 rounded-full shadow-lg font-medium text-sm transition-all">
                      <Save className="w-4 h-4" /> Save Notes
                   </button>

                   {/* Orange/Yellow Button: Generate Recommendations */}
                   <button className="flex items-center gap-2 bg-[#f59e0b] hover:bg-yellow-600 text-white px-5 py-2.5 rounded-full shadow-lg font-medium text-sm transition-all">
                      <Sparkles className="w-4 h-4" /> Generate Recommendations
                   </button>
                </div>
              )}

              <div className="relative">
                {/* Plus Button Toggle */}
                <button 
                  onClick={() => setShowActions(!showActions)}
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 ${
                    showActions ? 'bg-gray-200 rotate-45 text-gray-800' : 'text-gray-400 hover:text-[#0000FF]'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                </button>

                <input 
                  type="text" 
                  placeholder="Ask AI anything about your clients..." 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0000FF] transition"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Smart Suggestions & Actions --- */}
          <div className="lg:col-span-1 space-y-6 overflow-y-auto pl-2 custom-scrollbar">
            
            {/* Smart Suggestions */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
               <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-lg">{smartSuggestions.title}</h3>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {smartSuggestions.cards.map((card, idx) => (
                  <div key={idx} className="p-4 bg-blue-50/30 rounded-xl border border-blue-100 hover:border-blue-300 transition cursor-pointer">
                    <h4 className="text-[#0000FF] font-bold text-sm mb-1">{card.title}</h4>
                    <p className="text-xs text-gray-600 leading-5">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>

             {/* Action Items */}
             <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
               <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-lg">{actionItems.title}</h3>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {actionItems.items.map((item, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition">
                    <p className="text-sm font-medium text-gray-800 mb-3">{item.task}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${item.priorityColor}`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}