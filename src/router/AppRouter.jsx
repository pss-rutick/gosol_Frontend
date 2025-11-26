// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import ProtectedLayout from "../layouts/ProtectedLayout";
import CleanLayout from "../layouts/CleanLayout";

// Pages with Sidebar + Header
import Dashboard from "../pages/Dashboard";
import AllClients from "../pages/AllClients";
import AllMeetings from "../pages/AllMeetings";

// Pages WITHOUT Sidebar + Header
import ClientDetails from "../pages/Dashboard/ClientDetails";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Pages WITH Sidebar + Header */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/allclients" element={<AllClients />} />
        <Route path="/allmeetings" element={<AllMeetings />} />
        <Route path="/client/:id" element={<ClientDetails />} />
      </Route>

      {/* Pages WITHOUT Sidebar + Header */}
      <Route element={<CleanLayout />}>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

// ADD THIS LINE ↓↓↓
export default AppRouter;