// src/pages/PriorityTasks.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Users,
  Eye,
  CheckCircle,
  Clock,
  Calendar,
  Edit,
  AlertCircle
} from "lucide-react";

import Sidebar from "./Sidebar";
import Modal from "../components/common/Modal";
import AddTaskForm from "../components/common/AddTaskForm";
import { tasksAPI } from "../services/apiService";
import { tasksData } from "../constants/tasksData";
import { format } from "date-fns";
import CommonCard from "../components/common/CommonCard";

const PriorityTasks = () => {
  const [activeTab, setActiveTab] = useState("All Tasks");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ SAFE DATE PARSER
  const parseDate = (dateString) => {
    if (!dateString) return null;
    
    // Handle DD-MM-YYYY format (API format)
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split('-');
      return new Date(`${year}-${month}-${day}`);
    }
    
    // Handle YYYY-MM-DD format (HTML date input)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return new Date(dateString);
    }
    
    // Try standard Date constructor
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  // ✅ SAFE DATE FORMATTER
  const formatDateSafe = (dateString) => {
    const date = parseDate(dateString);
    return date ? format(date, "MMM d, yyyy") : "Invalid date";
  };

  // ✅ CHECK IF OVERDUE
  const isOverdue = (dueDateString, status) => {
    const date = parseDate(dueDateString);
    if (!date) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for comparison
    date.setHours(0, 0, 0, 0);
    
    return date < today && !['Completed', 'completed'].includes(status);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksAPI.getAllTasks();
      
      let tasksArray = [];
      if (Array.isArray(data)) {
        tasksArray = data;
      } else if (data && typeof data === "object" && Array.isArray(data.data)) {
        tasksArray = data.data;
      } else if (data && typeof data === "object" && Array.isArray(data.tasks)) {
        tasksArray = data.tasks;
      } else {
        tasksArray = data || [];
      }

      setTasks(tasksArray);
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError("Failed to load tasks. Please try again later.");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.TaskName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.ClientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityBadge = (priority) => {
    return tasksData.priorityBadges[priority] || tasksData.priorityBadges.Medium;
  };

  const getStatusBadge = (status) => {
    return tasksData.statusBadges[status] || tasksData.statusBadges.Pending;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-[#1E1E1E]">

      <main className="flex-1">
        <div className="p-8">
          {/* Title Section */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#0000FF] mb-2">Priority Tasks</h1>
              <p className="text-gray-600 text-sm">
                Manage your high-priority tasks and stay organized. AI assistant is available for all tasks.
              </p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-[#0000FF] text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {tasksData.stats.map((stat,index) => {
              const Icon = stat.icon;
              const Icon2 = stat.icon2;
              return (
                <CommonCard 
                key={index}
                  value={stat.value}
                  label={stat.label}
                  Icon={Icon}
                  bgColor={stat.bgColor}
                  textColor={stat.textColor}
                />
              );
            })}
          </div>

          {/* Search and Tabs */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks by name, client, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF]/20 focus:border-[#0000FF] transition-all duration-200"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {tasksData.tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#0000FF] text-white shadow-sm hover:shadow-md transform scale-105"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center min-h-64 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl p-8">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0000FF]"></div>
                <p className="mt-4 text-lg font-medium text-gray-600">Loading tasks...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex justify-center items-center min-h-64 bg-red-50 border-2 border-red-200/50 rounded-2xl p-8">
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
                <p className="text-lg font-medium text-red-600 mb-2">{error}</p>
                <button
                  onClick={fetchTasks}
                  className="bg-[#0000FF] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Tasks List */}
          {!loading && !error && (
            <div className="space-y-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => {
                  const priorityConfig = getPriorityBadge(task.Priority || 'Medium');
                  const statusConfig = getStatusBadge(task.Status || 'Pending');
                  const StatusIcon = statusConfig.icon || Clock;
                  
                  const taskDueDate = task.DueDate;
                  const overdue = isOverdue(taskDueDate, task.Status);
                  
                  return (
                    <div 
                      key={task.id || task.TaskId || `task-${index}`} 
                      className={`border rounded-xl p-6 bg-white hover:shadow-sm transition-all duration-200 ${
                        overdue ? 'border-red-200 bg-red-50/30' : 'border-gray-200'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <h3 
                            className="text-lg font-bold text-gray-900 truncate pr-2" 
                            title={task.TaskName || task.Title || "Untitled Task"}
                          >
                            {task.TaskName || task.Title || "Untitled Task"}
                          </h3>
                          <span 
                            className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                              priorityConfig.bg + ' ' + priorityConfig.text + ' ' + priorityConfig.border
                            }`}
                          >
                            {task.Priority || "Medium"}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 flex-shrink-0 ml-4 ${
                          statusConfig.bg + ' ' + statusConfig.text
                        }`}>
                          <StatusIcon className="h-3 w-3" />
                          {task.Status || "Pending"}
                        </span>
                      </div>

                      {/* Meta Details */}
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-5">
                        {taskDueDate && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span 
                              className={`font-medium ${overdue ? 'text-red-600' : ''}`}
                              title={taskDueDate}
                            >
                              {formatDateSafe(taskDueDate)}
                              {overdue && (
                                <span className="ml-1 text-red-600 font-semibold"> (Overdue)</span>
                              )}
                            </span>
                          </div>
                        )}
                        {task.ClientName && (
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 flex-shrink-0" />
                            <span 
                              className="truncate max-w-[150px]" 
                              title={task.ClientName}
                            >
                              {task.ClientName}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {task.Description && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-4">
                          <p 
                            className="text-sm text-gray-800 leading-relaxed line-clamp-3"
                            title={task.Description}
                          >
                            {task.Description}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <button className="text-[#0000FF] hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition-all duration-200 hover:underline">
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                        <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1 transition-all duration-200 hover:underline">
                          <CheckCircle className="h-4 w-4" />
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-dashed border-gray-200/50">
                  <CheckCircle className="mx-auto h-12 w-12 text-gray-300 mb-6" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
                  <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
                    {searchTerm 
                      ? "Try adjusting your search terms to find matching tasks." 
                      : "Get started by creating your first priority task."
                    }
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#0000FF] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Plus className="h-4 w-4" />
                    {searchTerm ? "Clear Search & Create Task" : "Create First Task"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Add Task Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add New Task"
            size="lg"
          >
            <AddTaskForm
              onClose={() => setIsModalOpen(false)}
              onSuccess={fetchTasks}
            />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default PriorityTasks;