// C:\PSS\gosol\src\pages\Dashboard.jsx
import { Users, Calendar, Clock, Plus, Video, FileText, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardText } from '../constants/dashboardText';
// Assuming Header and Sidebar are imported correctly
import Sidebar from './Sidebar';
import Header from './Header';
import AllClients from "./AllClients";  // ← Add this line


// Utility component to render icons based on the string name from dashboardText.js
const Icon = ({ name, className }) => {
    switch (name) {
        case 'UserGroup': return <Users className={className} />; // Mapped 'UserGroup' name (from dashboardText) to the actual 'Users' component
        case 'Calendar': return <Calendar className={className} />;
        case 'Clock': return <Clock className={className} />;
        case 'Plus': return <Plus className={className} />;
        case 'VideoCamera': return <Video className={className} />;
        case 'FileText': return <FileText className={className} />;
        case 'ChartBar': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>; // Generic placeholder icon for newLeads
        default: return <span className={className}>{name}</span>;
    }
};


// Component for the main stats cards
const StatCard = ({ label, value, icon }) => (
    <div className="bg-white rounded-lg p-5 flex items-center justify-between border border-gray-200">
        <div>
            <p className="text-base font-medium text-[#1E1E1E]">{label}</p>
            <p className="text-2xl font-bold text-[#0000FF] mt-1">{value}</p>
        </div>
        {/* Adjusted icon style to match the image's aesthetic */}
        <div className={`h-12 w-12 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-xl`}>
            <Icon name={icon} className="h-6 w-6 text-blue-600" />
        </div>
    </div>
);

// Component for a single client activity item
const ClientActivityItem = ({ name, type, details, tag, tagStyle, onClick }) => (
    <div
        onClick={onClick} // Add the click handler here
        className="p-4 rounded-[15px] bg-white border border-gray-200 hover:border-[#0000FF] hover:shadow-md transition-shadow cursor-pointer"
    >
        {/* ... existing content ... */}
        <p className="font-semibold text-xl text-[#0000FF]">
            {name}- <span className="text-[#0000FF] font-semibold">{type}</span>
        </p>
        <p className="font-medium text-base text-[#1E1E1E] mt-1">{details}</p>
        <span className={`text-[#4B5563] bg-white border border-gray-200 inline-block mt-2 px-2 py-0.5 text-base font-medium rounded-full`}>
            {tag}
        </span>
    </div>
);

// Component for a single priority task item
const PriorityTaskItem = ({ type, name, details }) => (
    <div className="mt-[15px] p-4 bg-white border border-gray-200 rounded-[15px] hover:shadow-md transition-shadow cursor-pointer">
        {/* The p-4 class applies padding to the whole content */}
        <p className="text-xl font-semibold text-[#0000FF]">
            {type} <span className="font-semibold text-[#0000FF]">{name}</span>
        </p>
        <p className="text-base font-medium text-[#1E1E1E] mt-0.5">{details}</p>
    </div>
);

// Main Dashboard Component
export default function Dashboard() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');
    const [userName] = useState('John Doe'); // Replace with real user data later

    // Handle logout
    const handleLogout = () => {
        // Here you would clear authentication state (tokens, context, etc.)
        navigate('/');
    };

    // The stats data is now consolidated in dashboardText.js, but we structure it here for the map.
    const stats = Object.values(dashboardText.stats);

    // Dashboard Content - This is the main view based on the image
    const DashboardView = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (Client Activity) */}
            <div className="lg:col-span-2">
                {/* Client Activity Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Client Activity</h2>
                        <button className="text-[#0000FF] text-l font-semibold flex items-center">
                            View All Clients <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {dashboardText.clientActivity.map((client) => (
                            <ClientActivityItem
                                key={client.id}
                                {...client}
                                // Add the onClick event to navigate to the details page
                                // We pass the client.id so the URL becomes something like /client/123
                                onClick={() => navigate(`/client/${client.id || '1'}`)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column (Quick Actions & Priority Task) */}
            <div className="lg:col-span-1 space-y-8">
                {/* Quick Actions Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        {dashboardText.quickActions.map((action, index) => (
                            <button
                                key={index}
                                className={`w-full flex items-center justify-center p-3 rounded-lg font-medium transition-colors duration-150 ${action.primary
                                    ? 'bg-[#0000FF] text-white font-medium text-[18px]'
                                    : 'bg-gray-50 text-[#1E1E1E] hover:bg-gray-100 border border-gray-200 font-medium text-[18px]'
                                    }`}
                            >
                                <Icon name={action.icon} className="w-5 h-5 mr-2" />
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Priority Task Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-gray-800">Priority Task</h2>
                        <button className="text-[#0000FF] text-l font-semibold flex items-center">
                            View All Tasks <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {dashboardText.priorityTask.map((task) => (
                            <PriorityTaskItem key={task.id} {...task} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );


    // Render content based on active section
    const renderContent = () => {
        const title = activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/-/g, ' ');

        switch (activeSection) {
            case 'dashboard':
                return <DashboardView />;

            case 'clients':
                return <AllClients />;
                // Renders the My Clients table/page. (Placeholder)
                return (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title} Page</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">This page would display the detailed client table.</p>
                        <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                            {dashboardText.clientsSection.addClientButton}
                        </button>
                    </div>
                );

            case 'meetings':
            case 'priority-tasks':
            case 'ai-assistant':
                return (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title} Section</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">Content for the {title} section will go here.</p>
                        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                            Go to {title}
                        </button>
                    </div>
                );

            default:
                return <div className="text-center py-10 text-gray-500">Section not found</div>;
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fixed Sidebar */}
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                handleLogout={handleLogout}
            />

            {/* Main Content Area (starts after sidebar) */}
            <div className="ml-1">
                {/* Fixed Header */}
                <Header userName={userName} handleLogout={handleLogout} />

                {/* Page Content */}
                <main className="mt-2 px-8 pb-12">
                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-[32px] font-semibold text-[#0000FF]">{dashboardText.appName}</h1>
                        <p className="text-[26px] font-medium text-[#1E1E1E]">{dashboardText.welcomeMessage}</p>
                    </div>

                    {/* Stats Grid - Only on Dashboard */}
                    {activeSection === 'dashboard' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                            {stats.map((stat, index) => (
                                <StatCard key={index} {...stat} />
                            ))}
                        </div>
                    )}

                    {/* Main Section Content */}
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}