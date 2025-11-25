// C:\PSS\gosol\src\components\Header.jsx
import { useState, useEffect, useRef } from "react"; // 1. Import useEffect and useRef
import {
    Search,
    Bell,
    ChevronDown,
    User,
    LogOut,
} from "lucide-react";
// import logo from "../assets/logo.png"; 
import { dashboardText } from "../constants/dashboardText";

const Header = ({ userName = "User", handleLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    // 2. Create a reference for the dropdown container
    const dropdownRef = useRef(null);

    // 3. Add logic to detect clicks outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the dropdown is open AND the clicked element is NOT inside the ref
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        
        // Unbind the event listener on clean up
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-6 shadow-sm">
            {/* Left Side - AI Search Bar */}
            <div className="flex items-center bg-gray-50 rounded-xl px-4 py-1.5 w-96 border border-gray-200 focus-within:border-[#0000FF] transition-colors">
                <Search size={20} className="text-gray-500 mr-3" />
                <input
                    type="text"
                    placeholder="Ask AI anything about your clients..."
                    className="bg-transparent outline-none text-[#1E1E1E] placeholder-gray-500 text-sm flex-1"
                    onFocus={() => {}} 
                    onBlur={() => {}} 
                />
            </div>

            {/* Right Side - Notification + Profile */}
            <div className="flex items-center space-x-6">
                {/* Notification Bell */}
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell size={22} className="text-[#1E1E1E]" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {/* Profile Dropdown Container */}
                {/* 4. Attach the ref here so we can detect clicks inside this entire div */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-3 hover:bg-gray-100 rounded-full pr-3 py-1.5 transition-colors"
                    >
                        <div className="h-10 w-10 rounded-full bg-[#0000FF] flex items-center justify-center text-white font-bold text-lg">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-[#1E1E1E] hidden sm:inline">{userName}</span>
                        <ChevronDown
                            size={18}
                            className={`text-gray-600 transition-transform ${
                                dropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 origin-top-right animate-in fade-in-0 zoom-in-95">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="font-semibold text-[#1E1E1E]">{userName}</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>

                            <button 
                                // Optional: Close dropdown when clicking Profile option
                                onClick={() => setDropdownOpen(false)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-[#1E1E1E] transition-colors text-sm"
                            >
                                <User size={18} />
                                <span>Profile</span>
                            </button>

                            <button
                                onClick={handleLogout} // Logout usually redirects, but strictly speaking, this also closes the menu
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors text-sm"
                            >
                                <LogOut size={18} />
                                <span>{dashboardText.logoutButton}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;