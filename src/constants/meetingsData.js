// src/constants/meetingsData.js
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

export const meetingsData = {
  stats: [
    {
      id: 1,
      label: "Total meetings",
      value: "12",
      icon: Calendar,
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      label: "Completed Meetings",
      value: "04",
      icon: CheckCircle,
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      label: "Schedule Meetings",
      value: "05",
      icon: Clock, // Using Clock for scheduled
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      label: "Cancelled Meetings",
      value: "05",
      icon: XCircle,
      textColor: "text-red-600",
      bgColor: "bg-red-50",
    },
  ],
  tabs: ["All Meetings", "Scheduled", "Completed", "Cancelled"],
  meetings: [
    {
      id: 1,
      title: "Initial Consultation - Expansion Financing",
      client: "Robert Chen",
      company: "Innovation Labs",
      status: "Completed",
      date: "15 July 2025",
      time: "10:00 AM",
      duration: "45 minutes",
      type: "Video call",
      summary: "Sarah is planning a business expansion requiring $500K in financing. She's interested in our flexible terms and expansion packages. Strong fit for our premium tier.",
    },
    {
      id: 2,
      title: "Proposal Review Call",
      client: "Michael Chen",
      company: "Tech Ventures LLC",
      status: "Completed",
      date: "15 July 2025",
      time: "2:00 PM",
      duration: "30 minutes",
      type: "Phone call",
      summary: "Michael is satisfied with the proposal terms. Awaiting board approval before proceeding. Likelihood of close: 85%",
    },
    {
      id: 3,
      title: "Initial Meeting",
      client: "Emma Davis",
      company: "Growth Consulting",
      status: "Completed",
      date: "15 July 2025",
      time: "11:00 AM",
      duration: "60 minutes",
      type: "In-Person",
      summary: "Emma is a well-qualified prospect with multiple properties. Ready to move to proposal stage.",
    },
  ],
};