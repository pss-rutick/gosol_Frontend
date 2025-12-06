// src/layouts/CleanLayout.jsx
import { Outlet } from "react-router-dom";

export default function CleanLayout() {
  return (
    <div className="min-h-screen bg-gray-700">
      <Outlet />
    </div>
  );
}