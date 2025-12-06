// src/pages/AllMeetings.jsx
import React, { useState, useEffect } from "react";
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
import Modal from "../components/common/Modal";
import AddMeetingForm from "../components/common/AddMeetingForm";
import { meetingsAPI } from "../services/apiService";
import { meetingsData } from "../constants/meetingsData";
import { format } from "date-fns";
import CommonCard from "../components/common/CommonCard";

const AllMeetings = () => {
  const [activeTab, setActiveTab] = useState("All Meetings");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await meetingsAPI.getAllMeetings();
      console.log("Raw API response:", data);

      // Handle both array and object responses
      let meetingsArray = [];
      if (Array.isArray(data)) {
        meetingsArray = data;
      } else if (data && typeof data === "object" && Array.isArray(data.data)) {
        meetingsArray = data.data;
      } else if (data && typeof data === "object" && Array.isArray(data.meetings)) {
        meetingsArray = data.meetings;
      } else if (data && typeof data === "object" && Array.isArray(data.tasks)) {
        meetingsArray = data.tasks;
      } else {
        console.error("Unexpected API format:", data);
        throw new Error("Received invalid data format from server");
      }

      console.log("Setting meetings to:", meetingsArray);
      setMeetings(meetingsArray);
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError("Failed to load meetings. Please try again later.");
      setMeetings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E1E1E] w-full">

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
            <button onClick={() => setIsModalOpen(true)} className="bg-[#0000FF] text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <Video className="h-4 w-4" />
              Schedule Meeting
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {meetingsData.stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <CommonCard 
                  value={stat.value}
                  label={stat.label}
                  Icon={Icon}
                  bgColor={stat.bgColor}
                  textColor={stat.textColor}
                />
              );
            })}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6">
            {meetingsData.tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
                    ? "bg-[#0000FF] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Loading & Error States */}
          {loading && (
            <div className="flex justify-center items-center min-h-64">
              <p className="text-lg font-medium text-gray-600">Loading meetings...</p>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center min-h-64">
              <p className="text-lg font-medium text-red-600">{error}</p>
            </div>
          )}

          {/* Meeting List */}
          {!loading && !error && (
            <div className="space-y-4">
              {meetings.length > 0 ? meetings.map((meeting, index) => (
                <div key={meeting.MeetingId || meeting.Id || meeting.id || `meeting-${index}`} className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-sm transition-shadow">

                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-gray-900">{meeting.Title || "Untitled Meeting"}</h3>
                    </div>
                  </div>

                  {/* Meta Details */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-5">
                    {meeting.Date && (
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="h-4 w-4" />
                        {typeof meeting.Date === "string" ? format(new Date(meeting.Date), "MMM d, yyyy") : "N/A"}
                      </div>
                    )}
                    {(meeting.StartTime || meeting.startTime) && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {meeting.StartTime || meeting.startTime}{meeting.EndTime ? ` - ${meeting.EndTime}` : ""}
                      </div>
                    )}
                    {(meeting.MeetingType || meeting.meetingType) && (
                      <div className="flex items-center gap-1.5">
                        {(meeting.MeetingType || meeting.meetingType) === "Video Call" && <Video className="h-4 w-4 text-[#0000FF]" />}
                        {(meeting.MeetingType || meeting.meetingType) === "Phone Call" && <Phone className="h-4 w-4 text-[#0000FF]" />}
                        {(meeting.MeetingType || meeting.meetingType) === "In-Person" && <MapPin className="h-4 w-4 text-[#0000FF]" />}
                        <span className="text-[#0000FF] font-medium">
                          {meeting.MeetingType || meeting.meetingType}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Notes Box */}
                  {(meeting.AdditionalNotes || meeting.additionalNotes) && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        <span className="font-bold text-[#0000FF]">Notes:</span> {meeting.AdditionalNotes || meeting.additionalNotes}
                      </p>
                    </div>
                  )}

                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No meetings scheduled yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Schedule Meeting Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Schedule New Meeting"
            size="lg"
          >
            <AddMeetingForm
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => fetchMeetings()}
            />
          </Modal>

        </div>
    </div>
  );
};

export default AllMeetings;
