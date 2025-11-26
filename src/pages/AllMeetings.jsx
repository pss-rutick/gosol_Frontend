// src/pages/AllMeetings.jsx
import React, { useState } from "react";
import { 
  Search, 
  Bell, 
  Video, 
  Phone, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock 
} from "lucide-react";

// Import the Sidebar
import Sidebar from "./Sidebar"; 
import { meetingsData } from "../constants/meetingsData";

const AllMeetings = () => {
  const [activeTab, setActiveTab] = useState("All Meetings");
  
  return (
    <div className="flex min-h-screen bg-white font-sans text-[#1E1E1E]">
      {/* Sidebar - No longer needs activeSection props */}
      <Sidebar handleLogout={() => console.log("Logout clicked")} />

      {/* Main Content Area - Added margin-left to account for fixed sidebar */}
      <main className="flex-1">
        
        {/* Page Content */}
        <div className="p-8">
            {/* The rest of your UI code remains exactly the same as previous */}
            
            {/* Title Section */}
            <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#0000FF] mb-2">All Meetings</h1>
              <p className="text-gray-600 text-sm">
                Start live meetings or review previous transcripts. AI assistant is available for all meetings.
              </p>
            </div>
            <button className="bg-[#0000FF] text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <Video className="h-4 w-4" />
              Schedule Meeting
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {meetingsData.stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.id} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                  <div>
                    <h2 className={`text-2xl font-bold ${stat.id === 1 ? 'text-[#0000FF]' : 'text-gray-900'}`}>
                      {stat.value}
                    </h2>
                    <p className="text-gray-500 text-xs font-medium mt-1">{stat.label}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor || 'bg-gray-50'}`}>
                    <Icon className={`h-5 w-5 ${stat.textColor || 'text-gray-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6">
            {meetingsData.tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-[#0000FF] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Meeting List */}
          <div className="space-y-4">
            {meetingsData.meetings.map((meeting) => (
              <div key={meeting.id} className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-sm transition-shadow">
                
                {/* Card Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{meeting.title}</h3>
                    <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-green-200">
                      {meeting.status}
                    </span>
                  </div>
                  <button className="bg-[#0000FF] text-white text-xs px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                    View AI Summary
                  </button>
                </div>

                {/* Sub Header */}
                <p className="text-sm font-medium text-gray-700 mb-3">
                  {meeting.client} • <span className="text-gray-500">{meeting.company}</span>
                </p>

                {/* Meta Details */}
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-5">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="h-4 w-4" />
                    {meeting.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {meeting.time} ({meeting.duration})
                  </div>
                  <div className="flex items-center gap-1.5">
                    {meeting.type === "Video call" && <Video className="h-4 w-4 text-[#0000FF]" />}
                    {meeting.type === "Phone call" && <Phone className="h-4 w-4 text-[#0000FF]" />}
                    {meeting.type === "In-Person" && <MapPin className="h-4 w-4 text-[#0000FF]" />}
                    <span className={meeting.type !== "In-Person" ? "text-[#0000FF] font-medium" : "text-[#0000FF] font-medium"}>
                      {meeting.type}
                    </span>
                  </div>
                </div>

                {/* AI Summary Box */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    <span className="font-bold text-[#0000FF]">AI Summary:</span> {meeting.summary}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default AllMeetings;