// src/layouts/ProtectedLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar";  // Fixed path
import Header from "../pages/Header";

export default function ProtectedLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar handleLogout={handleLogout} />
      <div className="flex-1 ml-64">
        <Header handleLogout={handleLogout} />
        <main className="pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}