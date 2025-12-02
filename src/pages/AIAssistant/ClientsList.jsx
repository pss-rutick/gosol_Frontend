import React, { useEffect, useState } from "react";
import { clientsAPI } from "../../services/apiService";
import { Loader, X } from "lucide-react";

const ClientsList = ({ selectedClientId, onSelectClient, onClose, isOpen }) => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const response = await clientsAPI.getAllClients();
        console.log("Clients Response:", response);
        // API returns array directly
        setClients(Array.isArray(response) ? response : response.data || []);
      } catch (err) {
        console.error("Failed to load clients:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (isLoading) {
    return (
      <div className={`${isOpen ? "w-80" : "w-0"} bg-white shadow-lg flex items-center justify-center transition-all duration-300 overflow-hidden border-r border-gray-200`}>
        <Loader className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
     <div
  className={`${isOpen ? "w-80" : "w-0"} 
  bg-white h-screen shadow-lg 
  transition-all duration-300 overflow-hidden 
  flex flex-col border-r border-gray-200`}
>
        <p className="text-red-500 text-sm">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`${isOpen ? "w-80" : "w-0"} bg-white  shadow-lg transition-all duration-300 overflow-hidden flex flex-col border-r border-gray-200`}>
      {/* Header */}
      <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white sticky top-0 flex justify-between items-center flex-shrink-0">
        <h3 className="text-lg font-semibold">Clients</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-blue-700 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Clients List - Scrollable */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {clients && clients.length > 0 ? (
          clients.map((client) => {
            const clientId = client.ClientId;
            const clientName = client.Client || `${client.FirstName} ${client.LastName}`.trim() || "Unknown";

            return (
              <div
                key={clientId}
                onClick={() => onSelectClient(clientId, clientName)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedClientId === clientId
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <p className="font-semibold text-sm truncate">{clientName}</p>
                <p className={`text-xs mt-1 ${selectedClientId === clientId ? "text-blue-100" : "text-gray-500"}`}>
                  ID: {clientId}
                </p>
                {client.Email && (
                  <p className={`text-xs truncate ${selectedClientId === clientId ? "text-blue-100" : "text-gray-400"}`}>
                    {client.Email}
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center py-8">No clients available</p>
        )}
      </div>
    </div>
  );
};

export default ClientsList;
