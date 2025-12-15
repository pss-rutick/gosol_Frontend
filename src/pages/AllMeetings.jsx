// AllMeetings.jsx
import React, { useState, useEffect } from "react";
import { Video, Phone, MapPin, Calendar as CalendarIcon, Clock, Edit, Trash2 } from "lucide-react";
import Spinner from "../components/common/spinner";
import Modal from "../components/common/Modal";
import AddMeetingForm from "../components/common/AddMeetingForm";
import { meetingsAPI } from "../services/apiService";
import { meetingsData } from "../constants/meetingsData";
import { format } from "date-fns";
import CommonCard from "../components/common/CommonCard";

const AllMeetings = () => {
  const [activeTab, setActiveTab] = useState("All Meetings");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [meetings, setMeetings] = useState([]);
  const [editMeeting, setEditMeeting] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all meetings
  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const data = await meetingsAPI.getAllMeetings();

      let meetingsArray = [];
      if (Array.isArray(data)) {
        meetingsArray = data;
      } else if (Array.isArray(data?.data)) {
        meetingsArray = data.data;
      } else {
        meetingsArray = [];
      }

      setMeetings(meetingsArray);
    } catch (err) {
      console.error(err);
      setError("Failed to load meetings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // ==============================
  // DELETE MEETING
  // ==============================
  const handleDelete = async (meetingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this meeting?");
    if (!confirmDelete) return;

    try {
      await meetingsAPI.deleteMeeting(meetingId);
      fetchMeetings();
    } catch (err) {
      console.error(err);
      alert("Failed to delete meeting.");
    }
  };

  // ==============================
  // OPEN EDIT MODAL
  // ==============================
  const handleEdit = (meeting) => {
    setEditMeeting(meeting);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E1E1E] w-full">

      {/* CONTENT */}
      <div className="p-8">

        {/* Title */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0000FF] mb-2">All Meetings</h1>
            <p className="text-gray-600 text-sm">
              Start live meetings or review previous transcripts.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0000FF] text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-700"
          >
            <Video className="h-4 w-4" />
            Schedule Meeting
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {meetingsData.stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <CommonCard
                key={stat.label}
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

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center min-h-64">
            <Spinner />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-600">{error}</div>
        )}

        {/* Meeting List */}
        {!loading && !error && (
          <div className="space-y-4">
            {meetings.length > 0 ? (
              meetings.map((meeting, index) => (
                <div
                  key={meeting.MeetingId || index}
                  className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-sm transition-shadow"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{meeting.Title}</h3>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(meeting)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(meeting.MeetingId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* META INFO */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-5">

                    {/* Date */}
                    {meeting.Date && (
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="h-4 w-4" />
                        {format(new Date(meeting.Date), "MMM d, yyyy")}
                      </div>
                    )}

                    {/* Time */}
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {meeting.StartTime} - {meeting.EndTime}
                    </div>

                    {/* Type */}
                    <div className="flex items-center gap-1.5">
                      {meeting.MeetingType === "Video Call" && (
                        <Video className="h-4 w-4 text-[#0000FF]" />
                      )}
                      {meeting.MeetingType === "Phone Call" && (
                        <Phone className="h-4 w-4 text-[#0000FF]" />
                      )}
                      {meeting.MeetingType === "In-Person" && (
                        <MapPin className="h-4 w-4 text-[#0000FF]" />
                      )}
                      <span className="text-[#0000FF] font-medium">
                        {meeting.MeetingType}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  {meeting.AdditionalNotes && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <p className="text-sm text-gray-800">
                        <span className="font-bold text-[#0000FF]">Notes:</span>{" "}
                        {meeting.AdditionalNotes}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                No meetings found.
              </div>
            )}
          </div>
        )}

        {/* ADD MEETING MODAL */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Schedule Meeting"
          size="lg"
        >
          <AddMeetingForm
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              setIsModalOpen(false);
              fetchMeetings();
            }}
          />
        </Modal>

        {/* EDIT MEETING MODAL */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Meeting"
          size="lg"
        >
          <AddMeetingForm
            existingData={editMeeting}
            isEditMode={true}
            onClose={() => setIsEditModalOpen(false)}
            onSuccess={() => {
              setIsEditModalOpen(false);
              fetchMeetings();
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default AllMeetings;
