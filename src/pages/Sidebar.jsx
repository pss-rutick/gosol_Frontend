// src/components/Sidebar.jsx
import {
  LayoutDashboard,
  Users,
  Calendar,
  CheckSquare,
  Bot,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "clients", label: "All Clients", icon: Users, path: "/allclients" },
    { id: "meetings", label: "Meetings", icon: Calendar, path: "/allmeetings" },
    { id: "tasks", label: "Priority Tasks", icon: CheckSquare, path: "/tasks" }, // Assuming you will create this
    { id: "ai-assistant", label: "AI Assistant", icon: Bot, path: "/ai-assistant" },
    { id: "logout", label: "Logout", icon: LogOut, path: null },
  ];

  return (
    <aside className="w-64 bg-white border-gray-200 flex flex-col  fixed top-0 left-0 z-40 overflow-y-auto">
      {/* Logo */}
      <div className="p-3 border-gray-200 flex items-center justify-center bg-white">
        <img
          src={logo}
          alt="AgendaOne Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isLogout = item.id === "logout";

            // Check if the current URL path starts with the item's path
            const isActive = location.pathname.startsWith(item.path) ||
              (item.path === "/dashboard" && location.pathname === "/dashboard");

            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (isLogout) {
                      handleLogout && handleLogout();
                    } else {
                      navigate(item.path);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${isActive
                      ? "font-medium text-base bg-[#0000FF] text-white shadow-md"
                      : isLogout
                        ? "font-medium text-base text-[#1E1E1E] hover:bg-red-50 hover:text-red-600 group"
                        : "font-medium text-base text-[#1E1E1E] hover:bg-gray-100"
                    }`}
                >
                  <Icon
                    size={22}
                    strokeWidth={2.2}
                    className={isLogout ? "group-hover:text-red-600" : ""}
                  />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;