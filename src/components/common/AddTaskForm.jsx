// src/components/common/AddTaskForm.jsx
import React, { useState, useEffect } from "react";
import { Check, X, Calendar, AlertTriangle, Users } from "lucide-react";
import { tasksAPI, dashboardAPI } from "../../services/apiService";

const AddTaskForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clientName: "",
    priority: "Medium",
    dueDate: ""
  });
  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);

  // ✅ FIXED: Uses "Client" field from your API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        console.log("🔄 Fetching clients from /api/clients...");
        const data = await dashboardAPI.getAllClients();
        console.log("📋 Raw API response:", data);
        
        let clientsArray = [];
        if (Array.isArray(data)) clientsArray = data;
        else if (data?.data) clientsArray = data.data;
        else if (data?.clients) clientsArray = data.clients;

        // ✅ CORRECT MAPPING for YOUR API
        const mappedClients = clientsArray
          .filter(c => c && c.Client) // ✅ Uses "Client" field
          .map(c => ({
            id: c.ClientId,
            name: c.Client // ✅ "Prasaan kamble"
          }));

        console.log("✅ Mapped clients:", mappedClients);
        setClients(mappedClients);
      } catch (err) {
        console.error("❌ Failed to load clients:", err);
        setClients([]);
      } finally {
        setLoadingClients(false);
      }
    };
    fetchClients();
  }, []);

  // Default due date = today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData(prev => ({ ...prev, dueDate: today }));
  }, []);

  const priorities = [
    { value: "Low", label: "Low", color: "bg-green-100 text-green-800" },
    { value: "Medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
    { value: "High", label: "High", color: "bg-red-100 text-red-800" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Validation
    if (!formData.title.trim()) return setErrors(prev => ({ ...prev, title: "Task name is required" }));
    if (!formData.clientName) return setErrors(prev => ({ ...prev, clientName: "Please select a client" }));
    if (!formData.dueDate) return setErrors(prev => ({ ...prev, dueDate: "Due date is required" }));

    try {
      const payload = {
        TaskName: formData.title.trim(),
        Description: formData.description.trim(),
        ClientName: formData.clientName, // ✅ "Prasaan kamble"
        Priority: formData.priority,
        DueDate: formData.dueDate,
        Status: "Pending"
      };

      console.log("✅ Creating task with ClientName:", payload.ClientName);
      await tasksAPI.createTask(payload);
      
      console.log("🎉 Task created successfully!");
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("❌ Error:", error);
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          {errors.general}
        </div>
      )}

      {/* Task Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Task Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Review Portfolio"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0000FF] ${
            errors.title ? "border-red-300 bg-red-50" : "border-gray-200"
          }`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      {/* Client Dropdown - NOW WORKS WITH YOUR API */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Client <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            disabled={loadingClients || clients.length === 0}
            className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[#0000FF] appearance-none ${
              errors.clientName ? "border-red-300 bg-red-50" : "border-gray-200"
            } ${loadingClients || clients.length === 0 ? "bg-gray-50" : ""}`}
          >
            <option value="">
              {loadingClients ? "Loading clients..." : 
               clients.length === 0 ? "No clients found" : 
               "Select a client"}
            </option>
            {clients.map(client => (
              <option key={client.id} value={client.name}>
                {client.name} {/* ✅ Shows "Prasaan kamble" */}
              </option>
            ))}
          </select>
          <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        {clients.length === 0 && !loadingClients && (
          <p className="mt-2 text-sm text-amber-600">
            No clients found. <a href="/dashboard" className="underline font-medium">Add clients first</a>
          </p>
        )}
        {errors.clientName && <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Optional details..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] resize-none"
        />
      </div>

      {/* Priority & Due Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Priority</label>
          <div className="grid grid-cols-3 gap-3">
            {priorities.map(p => (
              <label key={p.value} className="cursor-pointer">
                <input type="radio" name="priority" value={p.value} checked={formData.priority === p.value} onChange={handleChange} className="sr-only" />
                <div className={`p-3 rounded-xl border-2 text-center transition-all ${formData.priority === p.value ? `${p.color} border-current shadow-sm` : "border-gray-200 bg-gray-50"}`}>
                  <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${formData.priority === p.value ? "bg-current" : "bg-gray-400"}`} />
                  <span className="text-sm font-medium">{p.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0000FF] pr-10 ${
                errors.dueDate ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || clients.length === 0}
          className="px-6 py-2.5 bg-[#0000FF] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed shadow-sm"
        >
          {isLoading ? (
            <>Creating...</>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Create Task
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;