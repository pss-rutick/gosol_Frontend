// PriorityTasks.jsx
import React, { useState, useEffect } from "react";
import { Search,Plus, Users, Eye, CheckCircle, Clock, Calendar, Edit, AlertCircle, Trash2 } from "lucide-react";

import Modal from "./Modal";
import AddTaskForm from "./AddTaskForm";
import { tasksAPI } from "../../services/apiService";
import { tasksData } from "../../constants/tasksData";
import { format } from "date-fns";
import CommonCard from "./CommonCard";
import Spinner from "./spinner";
import { useNavigate } from "react-router-dom";


const PriorityTasks = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All Tasks");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ---------------- SAFE DATE PARSER ----------------
  const parseDate = (dateString) => {
    if (!dateString) return null;

    if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split('-');
      return new Date(`${year}-${month}-${day}`);
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return new Date(dateString);
    }

    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  // ---------------- SAFE DATE FORMATTER ----------------
  const formatDateSafe = (dateString) => {
    const date = parseDate(dateString);
    return date ? format(date, "MMM d, yyyy") : "Invalid date";
  };

  // ---------------- CHECK IF OVERDUE ----------------
  const isOverdue = (dueDateString, status) => {
    const date = parseDate(dueDateString);
    if (!date) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date < today && !['Completed', 'completed'].includes(status);
  };

  // ---------------- FETCH TASKS ----------------
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await tasksAPI.getAllTasks();

      let tasksArray = [];
      if (Array.isArray(data)) {
        tasksArray = data;
      } else if (Array.isArray(data?.data)) {
        tasksArray = data.data;
      } else if (Array.isArray(data?.tasks)) {
        tasksArray = data.tasks;
      } else {
        tasksArray = [];
      }

      setTasks(tasksArray);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------- FILTER TASKS ----------------
  const filteredTasks = tasks.filter(task =>
    task.TaskName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.ClientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ---------------- PRIORITY BADGE ----------------
  const getPriorityBadge = (priority) =>
    tasksData.priorityBadges[priority] || tasksData.priorityBadges.Medium;

  // ---------------- STATUS BADGE ----------------
  const getStatusBadge = (status) =>
    tasksData.statusBadges[status] || tasksData.statusBadges.Pending;

  return (
    <div className="flex min-h-screen bg-white font-sans text-[#1E1E1E]">

      <main className="flex-1">
        <div className="p-8">

          {/* ---------------- TITLE ---------------- */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#0000FF] mb-2">Priority Tasks</h1>
              <p className="text-gray-600 text-sm">
                Manage your high-priority tasks and stay organized.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0000FF] text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </div>

          {/* ---------------- STATS ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {tasksData.stats.map((stat, index) => {
              const Icon = stat.icon;
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

          {/* ---------------- SEARCH + TABS ---------------- */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF]/20"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {tasksData.tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium ${activeTab === tab
                      ? "bg-[#0000FF] text-white"
                      : "bg-white border border-gray-200 text-gray-600"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

          </div>

          {/* ---------------- LOADING ---------------- */}
          {loading && (
            <div className="flex justify-center items-center min-h-64">
              <Spinner />
            </div>
          )}

          {/* ---------------- ERROR ---------------- */}
          {error && !loading && (
            <div className="text-center min-h-64 p-10 bg-red-50 rounded-lg border border-red-200">
              <AlertCircle className="h-10 w-10 text-red-400 mx-auto" />
              <p className="text-red-600 font-medium mt-3">{error}</p>
              <button
                onClick={fetchTasks}
                className="mt-4 bg-[#0000FF] text-white px-6 py-2 rounded-lg"
              >
                Retry
              </button>
            </div>
          )}

          {/* ---------------- TASK LIST ---------------- */}
          {!loading && !error && (
            <div className="space-y-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => {
                  const priorityConfig = getPriorityBadge(task.Priority);
                  const statusConfig = getStatusBadge(task.Status);
                  const StatusIcon = statusConfig.icon || Clock;

                  const overdue = isOverdue(task.DueDate, task.Status);

                  return (
                    <div
                      key={task.TaskId || index}
                      className={`border rounded-xl p-6 bg-white hover:shadow-sm transition ${overdue ? "border-red-200 bg-red-50/40" : "border-gray-200"
                        }`}
                    >
                      {/* HEADER */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-gray-900">
                            {task.TaskName}
                          </h3>

                          <span className={`px-3 py-1 text-xs rounded-full ${priorityConfig.bg} ${priorityConfig.text}`}>
                            {task.Priority}
                          </span>
                        </div>

                        <span className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                          <StatusIcon className="h-3 w-3" />
                          {task.Status}
                        </span>
                      </div>

                      {/* META */}
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-4">

                        {/* Due Date */}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className={overdue ? "text-red-600" : ""}>
                            {formatDateSafe(task.DueDate)}
                          </span>
                        </div>

                        {/* Client */}
                        {task.ClientName && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {task.ClientName}
                          </div>
                        )}
                      </div>

                      {/* DESCRIPTION */}
                      {task.Description && (
                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-800 line-clamp-3">
                            {task.Description}
                          </p>
                        </div>
                      )}

                      {/* ACTION BUTTONS */}
                      <div className="flex items-center gap-5 pt-4 border-t border-gray-100">

                        {/* View Details */}
                        <button
                          onClick={() => navigate(`/task/${task.TaskId}`)}
                          className="text-[#0000FF] hover:text-blue-700 font-medium text-sm flex items-center gap-1 hover:underline"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>

                        {/* Mark Complete */}
                        <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1 hover:underline">
                          <CheckCircle className="h-4 w-4" />
                          Mark Complete
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => {
                            setEditTask(task);
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 hover:underline"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          onClick={async () => {
                            if (window.confirm("Are you sure you want to delete this task?")) {
                              try {
                                await tasksAPI.deleteTask(task.TaskId);
                                fetchTasks();
                              } catch (err) {
                                alert("Failed to delete task");
                              }
                            }
                          }}
                          className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-1 hover:underline"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>

                      </div>


                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No tasks found.
                </div>
              )}
            </div>
          )}

          {/* ADD TASK MODAL */}
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

          {/* ⭐ EDIT TASK MODAL ⭐ */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Task"
            size="lg"
          >
            <AddTaskForm
              existingData={editTask}
              isEditMode={true}
              onClose={() => setIsEditModalOpen(false)}
              onSuccess={fetchTasks}
            />
          </Modal>

        </div>
      </main>
    </div>
  );
};

export default PriorityTasks;
