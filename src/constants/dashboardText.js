// C:\PSS\gosol\src\constants\dashboardText.js

export const dashboardText = {
  // Header
  appName: "AgendaOne Dashboard",
  welcomeMessage: "Here's what's happening with your clients today.",
  logoutButton: "Logout",
  // Stats Cards (Matching the image)
  stats: {
    totalClients: {
      label: "Total Clients",
      value: "28",
      icon: 'UserGroup', // Mapped to 'Users' in Dashboard.jsx
      color: 'text-blue-600 bg-blue-50'
    },
    meetingsToday: {
      label: "Meetings Today",
      value: "04",
      icon: 'Calendar', 
      color: 'text-green-600 bg-green-50'
    },
    pendingTasks: {
      label: "Pending Tasks",
      value: "12",
      icon: 'Clock', 
      color: 'text-red-600 bg-red-50 '
    },
  },
  
  // Client Activity (Matching the image)
  clientActivity: [
    {
      id: 1,
      name: "Robert Chen",
      type: "Investment Property Consultation",
      details: "Property valued at $1.2M • Meeting tomorrow 2PM",
      tag: "High conversion potential",
      
    },
    {
      id: 2,
      name: "Lisa Chang",
      type: "First Home Buyer",
      details: "Smart recommendation: 3.8% fixed rate available",
      tag: "Ready for approval",
      
    },
    {
      id: 3,
      name: "Jennifer Brown",
      type: "Refinance",
      details: "Meeting summary sent • Follow-up in 3 days",
      tag: "Interest rate sensitive",
      
    },
    {
      id: 4,
      name: "Jennifer Brown",
      type: "Refinance",
      details: "Meeting summary sent • Follow-up in 3 days",
      tag: "Interest rate sensitive",
      
    },
  ],

  // Priority Task (Matching the image)
  priorityTask: [
    {
      id: 1,
      type: "Follow up:",
      name: "Mike Johnson",
      details: "Refinance application - Decision due today",
    },
    {
      id: 2,
      type: "Rate Alert:",
      name: "Emma Wilson",
      details: "Better rate available - Call ASAP",
    },
  ],

  // Quick Actions (Icon name updated to FileText)
  quickActions: [
    { label: "Add New Client", icon: "Plus", primary: true },
    { label: "Start Meeting", icon: "VideoCamera" },
    { label: "Generate Report", icon: "FileText" }, 
    { label: "Schedule Follow-up", icon: "Calendar" },
  ],

  // Placeholder section texts
  tasksSection: {
    title: "Tasks Management",
    description: "Your task management interface will appear here",
    addTaskButton: "Add New Task",
  },
  meetingsSection: {
    title: "Meetings Schedule",
    description: "Your meetings schedule will appear here",
    scheduleMeetingButton: "Schedule Meeting",
  },
  clientsSection: {
    title: "Client Management",
    description: "Your client management interface will appear here",
    addClientButton: "Add New Client",
  },
};