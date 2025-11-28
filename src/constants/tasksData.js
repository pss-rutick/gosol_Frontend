// src/constants/tasksData.js
import { CheckCircle, AlertCircle, Clock, CalendarDays, Edit } from "lucide-react";

export const tasksData = {
  // Stats Cards
  stats: [
    {
      id: 1,
      value: "12",
      label: "Total Tasks",
      icon: CheckCircle,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      id: 2,
      value: "3",
      label: "High Priority",
      icon: AlertCircle,
      bgColor: "bg-red-50",
      textColor: "text-red-600"
    },
    {
      id: 3,
      value: "8",
      label: "Completed",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      id: 4,
      value: "4",
      label: "Overdue",
      icon: Clock,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600"
    }
  ],

  // Filter Tabs
  tabs: ["All Tasks", "High Priority", "Today", "Upcoming", "Completed"],

  // Priority Badge Configuration
  priorityBadges: {
    High: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    Medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    Low: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    high: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    low: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' }
  },

  // Status Badge Configuration
  statusBadges: {
    Completed: { 
      bg: 'bg-green-100', 
      text: 'text-green-800', 
      icon: CheckCircle 
    },
    Pending: { 
      bg: 'bg-blue-100', 
      text: 'text-blue-800', 
      icon: Clock 
    },
    "In Progress": { 
      bg: 'bg-yellow-100', 
      text: 'text-yellow-800', 
      icon: Edit 
    }
  }
};