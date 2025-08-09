/*
 * MIT License
 * 
 * Copyright (c) 2025 Ronit Kumar Sahu
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
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