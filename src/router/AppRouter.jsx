// // C:\PSS\gosol\src\router\AppRouter.jsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import Dashboard from "../pages/Dashboard";
// import AllClients from "../pages/AllClients";
// import ClientDetails from "../pages/Dashboard/ClientDetails";
// import Meeting from "../pages/Dashboard/Meeting";
// import AllMeetings from "../pages/AllMeetings";

// const AppRouter = () => (
//   <BrowserRouter>
//     <Routes>
//       {/* Login Route */}
//       <Route path="/" element={<Login />} />
      
//       {/* Dashboard Route */}
//       <Route path="/dashboard/" element={<Dashboard />} />
//       <Route path="/allmeetings" element={<AllClients/>} />

//       <Route path="/Allclients/" element={<AllClients />} />
//       <Route path="/client/:id" element={<ClientDetails />} />
//       <Route path="/meeting/:id" element={<Meeting />} />
//       <Route path="/signup" element={<Signup />} />
      
//       {/* Redirect any unknown routes to login */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   </BrowserRouter>
// );

// export default AppRouter;

// C:\PSS\gosol\src\router\AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import AllClients from "../pages/AllClients";
import ClientDetails from "../pages/Dashboard/ClientDetails";
import Meeting from "../pages/Dashboard/Meeting";
import AllMeetings from "../pages/AllMeetings";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Login Route */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Main App Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* FIXED: Mapped to AllMeetings component */}
      <Route path="/allmeetings" element={<AllMeetings />} /> 

      <Route path="/allclients" element={<AllClients />} />
      <Route path="/client/:id" element={<ClientDetails />} />
      <Route path="/meeting/:id" element={<Meeting />} />
      
      {/* Redirect any unknown routes to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;