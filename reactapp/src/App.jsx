import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/DashBoard";
import Landing from "./components/Landing";
import Customers from "./components/Customers";
import Support from "./components/Support";
import Billing from "./components/Billing";
import NetworkManagement from "./components/NetworkManagement";
import ReportsAnalytics from "./components/ReportsAnalytics";
import Settings from "./components/Settings";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/billing/*" element={<Billing />} />
        <Route path="/network/*" element={<NetworkManagement />} />
        {/* Replace the wildcard /reports/* with explicit routes */}
        <Route path="/reports" element={<ReportsAnalytics key="default" />} />
        <Route path="/reports/customers" element={<ReportsAnalytics key="customers" />} />
        <Route path="/reports/revenue" element={<ReportsAnalytics key="revenue" />} />
        <Route path="/reports/network" element={<ReportsAnalytics key="network" />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers/*" element={<Customers />} />
        <Route path="/support/*" element={<Support />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;