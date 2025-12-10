// src/pages/Dashboard/ClientDetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Video, Phone, Mail, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { dashboardAPI } from '../../services/apiService';
import Spinner from '../../components/common/spinner';
import { format } from "date-fns";

export default function ClientDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("Overview");

    const tabs = ["Overview", "Documents", "Notes", "History"];

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                setLoading(true);
                const data = await dashboardAPI.getClientById(id);
                setClient(data);
            } catch (err) {
                console.error("Error fetching client details:", err);
                setError("Failed to load client information.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchClientDetails();
        }
    }, [id]);

    const formatCurrency = (amount) => {
        if (!amount) return "₹0";
        return `₹${Number(amount).toLocaleString('en-IN')}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return format(new Date(dateString), "dd MMM yyyy");
        } catch (e) {
            return dateString;
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <Spinner />
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="text-center">
                <p className="text-red-600 font-medium text-lg mb-4">{error}</p>
                <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">
                    Go Back
                </button>
            </div>
        </div>
    );

    if (!client) return null;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="ml-2">
                <main className="px-8 pb-12">

                    {/* Top Navigation */}
                    <div className="flex flex-col space-y-4 mb-6 pt-6">
                        <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-[#0000FF] w-fit text-sm font-medium">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Clients
                        </button>

                        <div className="flex bg-white p-1 rounded-lg w-full space-x-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 px-8 py-2 text-center rounded-md text-sm font-medium transition-all 
                                        ${activeTab === tab
                                            ? 'bg-[#0000FF] text-white shadow-md'
                                            : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">

                        {/* Header section */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-[#0000FF] border border-blue-100">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">
                                        {client.FirstName} {client.LastName}
                                    </h1>
                                    <p className="text-gray-500 text-sm">
                                        {client.Occupation || "Client"} • ID: {client.ClientId}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    onClick={() => navigate(`/meetings/schedule/${client.ClientId}`)}
                                    className="flex items-center gap-2 bg-[#0000FF] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition shadow-sm"
                                >
                                    <Video className="w-4 h-4" /> Schedule Meeting
                                </button>

                                <ActionButton icon={Phone} label="Call" />
                                <ActionButton icon={Mail} label="Email" />
                                <ActionButton icon={MoreHorizontal} label="More" />
                            </div>
                        </div>

                        {/* Personal info */}
                        <SectionCard title="Personal Information">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
                                <InfoRow label="Full Name" value={`${client.FirstName} ${client.LastName}`} />
                                <InfoRow label="Date of Birth" value={formatDate(client.DateOfBirth)} />
                                <InfoRow label="Marital Status" value={client.MaritalStatus} />
                                <InfoRow label="Dependents" value={client.Dependents} />
                                <InfoRow label="Contact Number" value={client.ContactNumber} />
                                <InfoRow label="Email Address" value={client.Email} />
                                <InfoRow label="Credit Score" value={client.CreditScore} />
                            </div>
                        </SectionCard>

                        {/* Address / Employment */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SectionCard title="Address Details">
                                <div className="space-y-5">
                                    <InfoRow label="Street Address" value={client.StreetAddress} />
                                    <InfoRow label="City" value={client.City} />
                                    <InfoRow label="State" value={client.State} />
                                    <InfoRow label="Postal Code" value={client.PostalCode} />
                                </div>
                            </SectionCard>

                            <SectionCard title="Employment Information">
                                <div className="space-y-5">
                                    <InfoRow label="Employment Status" value={client.EmploymentStatus} />
                                    <InfoRow label="Employer Name" value={client.EmployerName} />
                                    <InfoRow label="Occupation" value={client.Occupation} />
                                    <InfoRow label="Annual Income" value={formatCurrency(client.AnnualIncome)} />
                                </div>
                            </SectionCard>
                        </div>

                        {/* Loan details */}
                        <SectionCard title="Loan Details">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
                                <InfoRow label="Loan Amount" value={formatCurrency(client.LoanAmount)} />
                                <InfoRow label="Loan Purpose" value={client.LoanPurpose} />
                                <InfoRow label="Loan Type" value={client.LoanType} />
                                <InfoRow label="Down Payment" value={formatCurrency(client.DownPayment)} />
                                <InfoRow label="Property Address" value={client.PropertyAddress} />
                                <InfoRow label="Property Type" value={client.PropertyType} />
                            </div>
                        </SectionCard>

                    </div>
                </main>
            </div>
        </div>
    );
}

// ----------- Helper UI Components -----------
const ActionButton = ({ icon: Icon, label }) => (
    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition shadow-sm">
        <Icon className="w-4 h-4" /> {label}
    </button>
);

const SectionCard = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-[#0000FF] font-bold text-base mb-6">{title}</h2>
        {children}
    </div>
);

const InfoRow = ({ label, value }) => (
    <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-1 last:border-0 last:pb-0">
        <span className="text-gray-500 font-medium text-sm">{label}</span>
        <span className="text-gray-900 font-semibold text-sm text-right">{value || "N/A"}</span>
    </div>
);
