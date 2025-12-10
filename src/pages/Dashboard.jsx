// C:\PSS\gosol\src\pages\Dashboard.jsx

import {
    Users,
    Calendar,
    Clock,
    Plus,
    Video,
    FileText,
    ChevronRight
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { dashboardText } from "../constants/dashboardText";
import { activityAPI, tasksAPI } from "../services/apiService";   // ✅ UPDATED
import AllClients from "./AllClients";

// ---------------- ICON Renderer ----------------
const Icon = ({ name, className }) => {
    switch (name) {
        case "UserGroup":
            return <Users className={className} />;
        case "Calendar":
            return <Calendar className={className} />;
        case "Clock":
            return <Clock className={className} />;
        case "Plus":
            return <Plus className={className} />;
        case "VideoCamera":
            return <Video className={className} />;
        case "FileText":
            return <FileText className={className} />;
        default:
            return <span className={className}>{name}</span>;
    }
};

// ---------------- STAT CARD ----------------
const StatCard = ({ label, value, icon }) => (
    <div className="bg-white rounded-lg p-5 flex items-center justify-between border border-gray-200">
        <div>
            <p className="text-base font-medium text-[#1E1E1E]">{label}</p>
            <p className="text-2xl font-bold text-[#0000FF] mt-1">{value}</p>
        </div>

        <div className="h-12 w-12 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-xl">
            <Icon name={icon} className="h-6 w-6 text-blue-600" />
        </div>
    </div>
);

// ---------------- CLIENT ACTIVITY ITEM ----------------
const ClientActivityItem = ({ client_name, description, title, tag, onClick }) => (
    <div
        onClick={onClick}
        className="p-4 rounded-[15px] bg-white border border-gray-200 hover:border-[#0000FF] hover:shadow-md transition-shadow cursor-pointer"
    >
        <p className="font-semibold text-xl text-[#0000FF]">
            {client_name} - <span className="text-[#0000FF]">{title}</span>
        </p>

        <p className="font-medium text-base text-[#1E1E1E] mt-1">
            {description}
        </p>

        <span className="inline-block mt-2 px-2 py-1 text-sm font-medium rounded-full border bg-white border-gray-200">
            {tag}
        </span>
    </div>
);

// ---------------- PRIORITY TASK ----------------
const PriorityTaskItem = ({ type, name, details }) => (
    <div className="mt-[15px] p-4 bg-white border border-gray-200 rounded-[15px] hover:shadow-md transition-shadow cursor-pointer">
        <p className="text-xl font-semibold text-[#0000FF]">
            {type} <span className="font-semibold">{name}</span>
        </p>
        <p className="text-base font-medium text-[#1E1E1E] mt-0.5">{details}</p>
    </div>
);

// =====================================================================
//                        MAIN DASHBOARD COMPONENT
// =====================================================================
export default function Dashboard() {
    const navigate = useNavigate();

    const [activeSection] = useState("dashboard");

    // ------------------------------------------------------------------
    // 🔵 CLIENT ACTIVITY API STATE
    // ------------------------------------------------------------------
    const [clientActivity, setClientActivity] = useState([]);
    const [loadingActivity, setLoadingActivity] = useState(true);
    const [errorActivity, setErrorActivity] = useState(null);

    // ------------------------------------------------------------------
    // 🔵 PRIORITY TASKS STATE (HIGH ONLY)
    // ------------------------------------------------------------------
    const [priorityTasks, setPriorityTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [tasksError, setTasksError] = useState(null);

    // ------------------------------------------------------------------
    // 🔵 FETCH DATA ON LOAD
    // ------------------------------------------------------------------
    useEffect(() => {
        // Load Client Activity
        const loadActivity = async () => {
            try {
                const data = await activityAPI.getRecentActivity();
                setClientActivity(data);
            } catch (error) {
                setErrorActivity("Failed to load client activity");
            } finally {
                setLoadingActivity(false);
            }
        };

        // Load Tasks (High Priority Only)
        const loadTasks = async () => {
            try {
                const allTasks = await tasksAPI.getAllTasks();

                const highPriority = allTasks.filter(
                    (task) => task.Priority?.toLowerCase() === "high"
                );

                setPriorityTasks(highPriority);
            } catch (err) {
                setTasksError("Failed to load tasks");
            } finally {
                setLoadingTasks(false);
            }
        };

        loadActivity();
        loadTasks();
    }, []);

    const stats = Object.values(dashboardText.stats);

    // =====================================================================
    //                        DASHBOARD VIEW
    // =====================================================================
    const DashboardView = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ---------------- LEFT COLUMN: CLIENT ACTIVITY ---------------- */}
            <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-xl shadow-sm border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Client Activity</h2>

                        <button
                            className="text-[#0000FF] text-lg font-semibold flex items-center"
                            onClick={() => navigate("/allclients")}
                        >
                            View All Clients
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>

                    {loadingActivity ? (
                        <p className="text-gray-500">Loading activity...</p>
                    ) : errorActivity ? (
                        <p className="text-red-600">{errorActivity}</p>
                    ) : (
                        <div className="space-y-4">
                            {clientActivity.map((item, index) => (
                                <ClientActivityItem
                                    key={index}
                                    {...item}
                                    onClick={() => navigate(`/client/${item.client_id}`)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ---------------- RIGHT COLUMN ---------------- */}
            <div className="lg:col-span-1 space-y-8">

                {/* QUICK ACTIONS */}
                <div className="bg-white p-6 rounded-xl shadow-sm border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>

                    <div className="space-y-3">
                        {dashboardText.quickActions.map((action, index) => (
                            <button
                                key={index}
                                className={`w-full flex items-center justify-center p-3 rounded-lg font-medium transition-colors duration-150 ${
                                    action.primary
                                        ? "bg-[#0000FF] text-white text-[18px]"
                                        : "bg-gray-50 text-[#1E1E1E] border border-gray-200 hover:bg-gray-100 text-[18px]"
                                }`}
                            >
                                <Icon name={action.icon} className="w-5 h-5 mr-2" />
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* PRIORITY TASKS */}
                <div className="bg-white p-6 rounded-xl shadow-sm border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-gray-800">Priority Task</h2>

                        <button
                            onClick={() => navigate("/tasks")}
                            className="text-[#0000FF] text-lg font-semibold flex items-center"
                        >
                            View All Tasks <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>

                    <div className="divide-y divide-gray-100">

                        {loadingTasks ? (
                            <p className="text-gray-500 py-2">Loading tasks...</p>
                        ) : tasksError ? (
                            <p className="text-red-600 py-2">{tasksError}</p>
                        ) : priorityTasks.length === 0 ? (
                            <p className="text-gray-500 py-2">No high priority tasks.</p>
                        ) : (
                            priorityTasks.map((task) => (
                                <PriorityTaskItem
                                    key={task.TaskId}
                                    type="Task:"
                                    name={task.TaskName}
                                    details={`${task.Description} • Due ${task.DueDate}`}
                                />
                            ))
                        )}

                    </div>
                </div>

            </div>
        </div>
    );

    // =====================================================================
    //                        RENDER CONTENT
    // =====================================================================
    const renderContent = () => {
        if (activeSection === "dashboard") return <DashboardView />;
        if (activeSection === "clients") return <AllClients />;

        return <div className="text-center py-10 text-gray-500">Section not found</div>;
    };

    return (
        <div className="min-h-screen">
            <div className="ml-1">
                <main className="px-8 pb-12">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-[32px] font-semibold text-[#0000FF]">
                            {dashboardText.appName}
                        </h1>
                        <p className="text-[26px] font-medium text-[#1E1E1E]">
                            {dashboardText.welcomeMessage}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                        {Object.values(dashboardText.stats).map((stat, index) => (
                            <StatCard key={index} {...stat} />
                        ))}
                    </div>

                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
