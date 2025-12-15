// src/pages/View_Details/TaskDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tasksAPI } from "../../services/apiService";
import { Calendar, Users, Edit, Trash2, ArrowLeft } from "lucide-react";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);
      const data = await tasksAPI.getAllTasks();
      const found = data.find((t) => String(t.TaskId) === String(id));
      setTask(found || null);
    } catch (err) {
      console.error("Failed to load task:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-center text-lg">Loading task...</div>
    );

  if (!task)
    return (
      <div className="p-10 text-center text-lg text-red-600">Task not found</div>
    );

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await tasksAPI.deleteTask(task.TaskId);
      navigate("/priority-tasks");
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <div className="p-8 mx-auto">

      {/* Back Button */}
      <button
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-5 w-5" /> Back
      </button>

      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold">{task.TaskName}</h1>
        <p className="text-gray-600 mt-1">{task.Description || "No description provided"}</p>
      </div>

      {/* Task Details */}
      <div className="space-y-6">

        {/* Client */}
        <div className="flex items-center gap-3 text-lg">
          <Users className="h-5 w-5 text-blue-600" />
          <span className="font-medium">{task.ClientName}</span>
        </div>

        {/* Due Date */}
        <div className="flex items-center gap-3 text-lg">
          <Calendar className="h-5 w-5 text-red-600" />
          <span className="font-medium">{task.DueDate}</span>
        </div>

        {/* Priority */}
        <div className="text-lg">
          <strong>Priority:</strong> {task.Priority}
        </div>

        {/* Status */}
        <div className="text-lg">
          <strong>Status:</strong> {task.Status}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">

        {/* Edit */}
        <button
          onClick={() => navigate(`/task/edit/${task.TaskId}`, { state: { task } })}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit Task
        </button>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="px-5 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete Task
        </button>

      </div>
    </div>
  );
};

export default TaskDetails;
