// C:\PSS\gosol\src\pages\AllClients.jsx
import { useState } from "react";
import { Search, TrendingUp, Users, Plus } from "lucide-react";
import { clientData } from "../constants/AllClients.js";
import { format } from "date-fns";

const stageColors = {
  "Pre-approved": "bg-green-100 text-green-700",
  "Application": "bg-blue-100 text-blue-700",
  "Rate Lock": "bg-purple-100 text-purple-700",
  "Initial": "bg-gray-100 text-gray-700",
  "Closing": "bg-indigo-100 text-indigo-700",
};

export default function AllClients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);

  const filteredClients = clientData.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.clientId.includes(searchTerm)
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedClients(filteredClients.map((c) => c.clientId));
    } else {
      setSelectedClients([]);
    }
  };

  const handleSelectOne = (clientId) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header will be handled by Dashboard layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title + Add Button */}
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center gap-2 bg-[#0000FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
            <Plus size={20} />
            Add New Client
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-[#1E1E1E]">{clientData.length}</p>
                <p className="text-base font-medium text-[#1E1E1E]">Total Clients</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-[#1E1E1E]">04</p>
                <p className="text-sm text-gray-600 mt-1">New Clients (This month)</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-[#1E1E1E]">18%</p>
                <p className="text-sm text-gray-600 mt-1">Conversion Rate (This month)</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search clients by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0000FF] transition"
            />
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedClients.length === filteredClients.length && filteredClients.length > 0}
                      className="w-4 h-4 text-[#0000FF] rounded focus:ring-[#0000FF]"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Score</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress In (%)</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Meeting Date & Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.clientId} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedClients.includes(client.clientId)}
                        onChange={() => handleSelectOne(client.clientId)}
                        className="w-4 h-4 text-[#0000FF] rounded focus:ring-[#0000FF]"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1E1E1E]">{client.clientId}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1E1E1E]">{client.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{client.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{client.email}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1E1E1E]">{client.creditScore}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">${client.value}K</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-[#1E1E1E] mr-2">{client.progress}%</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#0000FF] h-2 rounded-full"
                            style={{ width: `${client.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${stageColors[client.stage] || "bg-gray-100 text-gray-700"}`}>
                        {client.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {format(new Date(client.lastMeeting), "MMM d, yyyy | h:mm a")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}