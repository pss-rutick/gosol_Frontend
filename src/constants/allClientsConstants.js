// src/constants/allClientsConstants.js

export const tableHeaders = [
  "Client ID",
  "Client Name",
  "Phone",
  "Email ID",
  "Credit Score",
  "Value",
  "Progress",
  "Stage",
  "Last Meeting",
];

export const stageColors = {
  "Pre-approved": "bg-green-100 text-green-700",
  "Application": "bg-blue-100 text-blue-700",
  "Rate Lock": "bg-purple-100 text-purple-700",
  "Initial": "bg-gray-100 text-gray-700",
  "Closing": "bg-indigo-100 text-indigo-700",
};

export const fallbackValues = {
  progress: "N/A",
  stage: "N/A",
  lastMeeting: "N/A",
};
