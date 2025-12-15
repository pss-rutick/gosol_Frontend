// AddMeetingForm.jsx
import React, { useState, useEffect } from "react";
import Input from "./Input";
import { meetingsAPI, dashboardAPI } from "../../services/apiService";
import axios from "axios";


export default function AddMeetingForm({
  onClose,
  onSuccess,
  existingData = null,
  isEditMode = false
}) {
  const [loading, setLoading] = useState(false);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    ClientId: "",
    Title: "",
    Date: "",
    StartTime: "",
    EndTime: "",
    MeetingType: "",
    AdditionalNotes: "",
  });

  // ==============================
  // LOAD CLIENTS DROPDOWN
  // ==============================
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setClientsLoading(true);
        const data = await dashboardAPI.getAllClients();
        if (Array.isArray(data)) {
          setClients(data);
        }
      } catch (err) {
        console.error("Failed to load clients:", err);
        setClients([]);
      } finally {
        setClientsLoading(false);
      }
    };

    fetchClients();
  }, []);

  // ==============================
  // PREFILL WHEN EDITING
  // ==============================
  useEffect(() => {
    if (isEditMode && existingData) {
      setFormData({
        ClientId: existingData.ClientId || "",
        Title: existingData.Title || "",
        Date: existingData.Date || "",
        StartTime: existingData.StartTime || "",
        EndTime: existingData.EndTime || "",
        MeetingType: existingData.MeetingType || "",
        AdditionalNotes: existingData.AdditionalNotes || "",
      });
    }
  }, [isEditMode, existingData]);


  // ==============================
  // HANDLE INPUTS
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // FORM SUBMIT (ADD / UPDATE)
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validation
      if (!formData.ClientId) throw new Error("Please select a client");
      if (!formData.Title) throw new Error("Meeting title is required");
      if (!formData.Date) throw new Error("Meeting date is required");
      if (!formData.StartTime) throw new Error("Start time is required");
      if (!formData.EndTime) throw new Error("End time is required");
      if (!formData.MeetingType) throw new Error("Meeting type is required");

      const selectedClient = clients.find(
        (c) => String(c.ClientId) === String(formData.ClientId)
      );

      const clientName =
        `${selectedClient?.FirstName || ""} ${selectedClient?.LastName || ""}`.trim() ||
        selectedClient?.Client ||
        "Unknown";

      const submitData = {
        ClientId: Number(formData.ClientId),
        ClientName: clientName,
        Title: formData.Title.trim(),
        Date: formData.Date,
        StartTime: formData.StartTime,
        EndTime: formData.EndTime,
        MeetingType: formData.MeetingType,
        AdditionalNotes: formData.AdditionalNotes.trim() || "",
      };

      // ADD or UPDATE MEETING
      if (isEditMode && existingData?.MeetingId) {
        await meetingsAPI.updateMeeting(existingData.MeetingId, submitData);
      } else {
        await meetingsAPI.addMeeting(submitData);
      }

      // ================================
      // EXTRA GET CALL AFTER SUBMIT
      // ================================
      try {
        const apiUrl = import.meta.env.VITE_AUTH_API_URL + "/auth/callback";
        const getResponse = await axios.get(apiUrl);

        console.log("🔵 GET /auth/callback Response:", getResponse.data);
      } catch (err) {
        console.error("❌ GET API CALL FAILED:", err);
      }

      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // ==============================
  // RENDER FORM
  // ==============================
  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isEditMode ? "Update Meeting" : "Schedule Meeting"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* CLIENT DROPDOWN */}
          <div>
            <label className="block mb-1 text-sm font-medium">Select Client *</label>
            <select
              name="ClientId"
              value={formData.ClientId}
              onChange={handleChange}
              disabled={clientsLoading}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
            >
              <option value="">
                {clientsLoading ? "Loading clients..." : "Select a client"}
              </option>
              {clients.map((client) => (
                <option key={client.ClientId} value={client.ClientId}>
                  {client.FirstName} {client.LastName} (ID: {client.ClientId})
                </option>
              ))}
            </select>
          </div>

          <Input
            inputProps={{
              type: "text",
              lable: "Meeting Title *",
              placeholder: "Enter meeting title",
              value: formData.Title,
              onChange: handleChange,
              name: "Title",
            }}
          />

          <Input
            inputProps={{
              type: "date",
              lable: "Date *",
              value: formData.Date,
              onChange: handleChange,
              name: "Date",
            }}
          />

          <Input
            inputProps={{
              type: "time",
              lable: "Start Time *",
              value: formData.StartTime,
              onChange: handleChange,
              name: "StartTime",
            }}
          />

          <Input
            inputProps={{
              type: "time",
              lable: "End Time *",
              value: formData.EndTime,
              onChange: handleChange,
              name: "EndTime",
            }}
          />

          <div>
            <label className="block mb-1 text-sm font-medium">Meeting Type *</label>
            <select
              name="MeetingType"
              value={formData.MeetingType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
            >
              <option value="">Select meeting type</option>
              <option value="Video Call">Video Call</option>
              <option value="Phone Call">Phone Call</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>

        </div>
      </div>

      {/* NOTES */}
      <div>
        <label className="block mb-1 text-sm font-medium">Additional Notes</label>
        <textarea
          name="AdditionalNotes"
          value={formData.AdditionalNotes}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
          placeholder="Enter any details..."
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-6 py-3 rounded-lg border"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || clientsLoading}
          className="flex-1 px-6 py-3 rounded-lg bg-[#0000FF] text-white"
        >
          {loading
            ? "Saving..."
            : isEditMode
              ? "Update Meeting"
              : "Schedule Meeting"}
        </button>
      </div>
    </form>
  );
}