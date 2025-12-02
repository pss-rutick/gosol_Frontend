// src/constants/aiContent.js

export const defaultInitialMessage = {
  id: 1,
  role: "assistant",
  content:
    "Hello! I'm your AI Assistant. I can help you with task management, meeting summaries, client insights, and more. How can I assist you today?",
  timestamp: new Date().toISOString(),
};

export const examplePrompts = [
  "What's my highest priority task?",
  "Summarize my last meeting",
  "What actions are pending for client Robert?",
  "Generate a follow-up email for yesterday's meeting",
];

export const quickTools = [
  {
    id: "tasks",
    name: "Task Management",
    icon: "Zap",
    description: "Create, update, and prioritize tasks",
  },
  {
    id: "meetings",
    name: "Meeting Analysis",
    icon: "MessageCircle",
    description: "Summarize meetings and extract action items",
  },
  {
    id: "clients",
    name: "Client Insights",
    icon: "Users",
    description: "Get client data and relationship insights",
  },
  {
    id: "emails",
    name: "Email Drafting",
    icon: "FileText",
    description: "Draft professional emails and follow-ups",
  },
  {
    id: "research",
    name: "Quick Research",
    icon: "Sparkles",
    description: "Research clients, topics, or market trends",
  },
];
