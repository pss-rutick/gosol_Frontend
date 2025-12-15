// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";

// Protected layout (with sidebar)
import ProtectedLayout from "../layouts/ProtectedLayout";

// Clean layout (without sidebar – typically for login pages)
import CleanLayout from "../layouts/CleanLayout";

// Protected Pages
import Dashboard from "../pages/Dashboard";
import AllClients from "../pages/AllClients";
import AllMeetings from "../pages/AllMeetings";
import PriorityTasks from "../pages/PriorityTasks";
import AIAssistant from "../pages/AIAssistant";

// Pages WITHOUT Sidebar + Header
import ClientDetails from "../pages/Dashboard/ClientDetails";
import StartMeeting from "../pages/Dashboard/StartMeeting";
import TaskDetails from "../pages/View_Details/TaskDetails";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>

      {/* Public Routes (no auth) */}
      <Route element={<CleanLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/meeting/start/:clientId" element={<StartMeeting />} />
      </Route>

      {/* Protected Routes (with sidebar and access control) */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/allclients" element={<AllClients />} />
        <Route path="/allmeetings" element={<AllMeetings />} />
        <Route path="/tasks" element={<PriorityTasks />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/client/:id" element={<ClientDetails />} />
        <Route path="/task/:id" element={<TaskDetails />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
