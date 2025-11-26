// C:\PSS\gosol\src\pages\Dashboard\ClientDetails.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Video, Phone, Mail, MoreHorizontal, ArrowLeft } from 'lucide-react';
import Sidebar from '../Sidebar';
import { clientDetailsData } from '../../constants/clientDetailsData';

export default function ClientDetails() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(clientDetailsData.tabs[0]);

    // Destructure the NEW data objects
    const { mockUser, actions, pageTitle, tabs, personalInfo, addressInfo, employmentInfo, loans } = clientDetailsData;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="ml-2">
                <main className="px-8 pb-12">

                    {/* Top Navigation Area */}
                    <div className="flex flex-col space-y-4 mb-6">
                        <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-[#0000FF] w-fit text-sm font-medium">
                            <ArrowLeft className="w-4 h-4 mr-2" /> {pageTitle.backButton}
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
                        {/* Header Card */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-[#0000FF] border border-blue-100">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">{mockUser.name}</h1>
                                    <p className="text-gray-500 text-sm">{mockUser.role}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    // 👇 UPDATE THIS LINE to match your specific route structure
                                    onClick={() => navigate(`/meeting/${mockUser.id}`)}
                                    className="flex items-center gap-2 bg-[#0000FF] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition shadow-sm"
                                >
                                    <Video className="w-4 h-4" /> {actions.meeting}
                                </button>
                                <ActionButton icon={Phone} label={actions.call} />
                                <ActionButton icon={Mail} label={actions.mail} />
                                <ActionButton icon={MoreHorizontal} label={actions.more} />
                            </div>
                        </div>

                        {/* Personal Info */}
                        <SectionCard title={personalInfo.title}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
                                {personalInfo.data.map((item, idx) => (
                                    <InfoRow key={idx} label={item.label} value={item.value} />
                                ))}
                            </div>
                        </SectionCard>

                        {/* Split Section: Address & Employment */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SectionCard title={addressInfo.title}>
                                <div className="space-y-5">
                                    {addressInfo.data.map((item, idx) => (
                                        <InfoRow key={idx} label={item.label} value={item.value} />
                                    ))}
                                </div>
                            </SectionCard>
                            <SectionCard title={employmentInfo.title}>
                                <div className="space-y-5">
                                    {employmentInfo.data.map((item, idx) => (
                                        <InfoRow key={idx} label={item.label} value={item.value} />
                                    ))}
                                </div>
                            </SectionCard>
                        </div>

                        {/* Loans (Mapped) */}
                        {loans.map((loan, index) => (
                            <SectionCard key={index} title={loan.title}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
                                    {loan.data.map((item, idx) => (
                                        <InfoRow key={idx} label={item.label} value={item.value} />
                                    ))}
                                </div>
                            </SectionCard>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

// Helpers
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
        <span className="text-gray-900 font-semibold text-sm text-right">{value}</span>
    </div>
);