import { useState, useEffect } from "react";
import { dashboardAPI } from "../services/apiService";
import { Search, TrendingUp, Users, Plus } from "lucide-react";
import { format } from "date-fns";
import Modal from "../components/common/Modal";
import AddClientForm from "../components/common/AddClientForm";
import {
  tableHeaders,
  stageColors, // Kept for future use if you map stages later
  fallbackValues,
} from "../constants/allClientsConstants";

export default function AllClients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state for better UX
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await dashboardAPI.getAllClients();
      console.log("API Response:", data);

      // Handle both array and object responses
      let clientsArray = [];
      if (Array.isArray(data)) {
        clientsArray = data;
      } else if (data && typeof data === "object" && Array.isArray(data.data)) {
        clientsArray = data.data;
      } else if (data && typeof data === "object" && Array.isArray(data.clients)) {
        clientsArray = data.clients;
      } else {
        console.error("Unexpected API format:", data);
        throw new Error("Received invalid data format from server");
      }

      setClients(clientsArray);
    } catch (error) {
      console.error("Fetch error:", error.message);
      setError("Failed to load clients. Please try again later.");
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(
    (c) =>
      String(c.ClientId).includes(searchTerm) ||
      `${c.FirstName || ""} ${c.LastName || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      c.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ContactNumber?.includes(searchTerm)
  );

  const handleSelectAll = (e) => {
    setSelectedClients(
      e.target.checked ? filteredClients.map((c) => c.ClientId) : []
    );
  };

  const handleSelectOne = (id) => {
    setSelectedClients((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Loading clients...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header & Add Button */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#0000FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
            <Plus size={20} /> Add New Client
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-[#1E1E1E]">
                  {clients.length}
                </p>
                <p className="text-base font-medium text-[#1E1E1E]">
                  Total Clients
                </p>
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
                <p className="text-sm text-gray-600 mt-1">
                  New Clients (This month)
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#0000FF]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedClients.length === filteredClients.length &&
                        filteredClients.length > 0
                      }
                    />
                  </th>
                  {tableHeaders.map((title, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <tr
                      key={client.ClientId}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedClients.includes(client.ClientId)}
                          onChange={() => handleSelectOne(client.ClientId)}
                        />
                      </td>

                      <td className="px-6 py-4">
                        {client.ClientId || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {client.FirstName && client.LastName
                          ? `${client.FirstName} ${client.LastName}`
                          : client.Client || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {client.ContactNumber || "N/A"}
                      </td>
                      <td className="px-6 py-4">{client.Email || "N/A"}</td>
                      <td className="px-6 py-4">
                        {client.CreditScore
                          ? `${client.CreditScore}/900`
                          : "N/A"}
                      </td>

                      <td className="px-6 py-4 text-green-600 font-medium">
                        {client.LoanAmount
                          ? `₹${Number(client.LoanAmount).toLocaleString()}`
                          : "N/A"}
                      </td>

                      <td className="px-6 py-4">{fallbackValues.progress}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200">
                          {fallbackValues.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {client.LastMeeting
                          ? format(
                              new Date(client.LastMeeting),
                              "MMM d, yyyy | h:mm a"
                            )
                          : fallbackValues.lastMeeting}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={tableHeaders.length + 1} className="text-center py-8 text-gray-500">
                      No clients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Client"
        size="xl"
      >
        <AddClientForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => fetchClients()}
        />
      </Modal>
    </div>
  );
}
