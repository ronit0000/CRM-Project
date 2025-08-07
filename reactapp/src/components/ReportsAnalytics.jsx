import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportsAnalytics = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024);
  const [reportData, setReportData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchReport = async () => {
      setReportData({});
      setError(null);

      let url;
      switch (location.pathname) {
        case "/reports/customers":
          url = "http://localhost:8080/api/reports/customers";
          break;
        case "/reports/revenue":
          url = "http://localhost:8080/api/reports/revenue";
          break;
        case "/reports/network":
          url = "http://localhost:8080/api/reports/network";
          break;
        default:
          url = null;
      }

      if (url) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();
          console.log(`Fetched report for ${location.pathname}:`, data);
          setReportData(data);
          setError(null);
        } catch (error) {
          console.error(`Fetch error for ${url}:`, error.message);
          setError(`Failed to load report from ${url}. Please try again.`);
          setReportData({});
        }
      } else {
        console.log(`No URL defined for path: ${location.pathname}`);
      }
    };

    fetchReport();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/reports") {
      navigate("/reports/customers");
    }
  }, [location.pathname, navigate]);

  const renderContent = () => {
    switch (location.pathname) {
      case "/reports/customers":
        const customerStatusData = {
          labels: ["Active", "Inactive"],
          datasets: [
            {
              data: [reportData.activeCustomers || 0, reportData.inactiveCustomers || 0],
              backgroundColor: ["#0088FE", "#FFBB28"],
              hoverBackgroundColor: ["#007BFF", "#FFA500"],
            },
          ],
        };
        const planBreakdownData = {
          labels: reportData.planBreakdown
            ? reportData.planBreakdown.map((entry) => entry[0])
            : [],
          datasets: [
            {
              label: "Customer Count",
              data: reportData.planBreakdown
                ? reportData.planBreakdown.map((entry) => entry[1])
                : [],
              backgroundColor: "#82ca9d",
              hoverBackgroundColor: "#66BB6A",
            },
          ],
        };
        return (
          <div style={styles.section}>
            <h2>Customer Report</h2>
            {error && <p style={styles.error}>{error}</p>}
            {Object.keys(reportData).length === 0 ? (
              <p>Loading data...</p>
            ) : (
              <div>
                <p><strong>Total Customers:</strong> {reportData.totalCustomers}</p>
                <h3>Customer Status</h3>
                <Pie
                  data={customerStatusData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}` } },
                    },
                  }}
                  style={{ maxWidth: "400px", maxHeight: "300px", margin: "0 auto" }}
                />
                <h3>Plan Breakdown</h3>
                <Bar
                  data={planBreakdownData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}` } },
                    },
                    scales: {
                      y: { beginAtZero: true, title: { display: true, text: "Count" } },
                      x: { title: { display: true, text: "Plan" } },
                    },
                  }}
                  style={{ maxWidth: "500px", maxHeight: "300px", margin: "0 auto" }}
                />
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Plan</th>
                      <th style={styles.th}>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.planBreakdown &&
                      reportData.planBreakdown.map((entry, index) => (
                        <tr key={index}>
                          <td style={styles.td}>{entry[0]}</td>
                          <td style={styles.td}>{entry[1]}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case "/reports/revenue":
        const revenueData = {
          labels: ["Total Revenue", "Pending Revenue", "Pending Invoices", "Paid Invoices"],
          datasets: [
            {
              label: "Revenue and Invoices",
              data: [
                reportData.totalRevenue || 0,
                reportData.pendingRevenue || 0,
                reportData.pendingInvoicesCount || 0,
                reportData.paidInvoicesCount || 0,
              ],
              backgroundColor: ["#8884d8", "#FF8042", "#FFBB28", "#00C49F"],
              hoverBackgroundColor: ["#7B68EE", "#FF5722", "#FFA500", "#00BFA5"],
            },
          ],
        };
        return (
          <div style={styles.section}>
            <h2>Revenue Report</h2>
            {error && <p style={styles.error}>{error}</p>}
            {Object.keys(reportData).length === 0 ? (
              <p>Loading data...</p>
            ) : (
              <div>
                <p><strong>Total Revenue (Paid):</strong> ${reportData.totalRevenue.toFixed(2)}</p>
                <p><strong>Pending Revenue:</strong> ${reportData.pendingRevenue.toFixed(2)}</p>
                <p><strong>Pending Invoices Count:</strong> {reportData.pendingInvoicesCount}</p>
                <p><strong>Paid Invoices Count:</strong> {reportData.paidInvoicesCount}</p>
                <h3>Revenue Overview</h3>
                <Pie
                  data={revenueData}
                  options={{
                    responsive: false, // Enforce exact size
                    maintainAspectRatio: false, // Allow custom dimensions
                    plugins: {
                      legend: { position: "top" },
                      tooltip: {
                        callbacks: {
                          label: (context) =>
                            context.label.includes("Revenue")
                              ? `$${context.raw.toFixed(2)}`
                              : context.raw,
                        },
                      },
                    },
                  }}
                  style={{ maxWidth: "600px", maxHeight: "500px", margin: "0 auto" }} // Large Pie chart
                />
              </div>
            )}
          </div>
        );
      case "/reports/network":
        const networkData = {
          labels: ["Online", "Offline", "Maintenance"],
          datasets: [
            {
              data: [
                reportData.onlineDevices || 0,
                reportData.offlineDevices || 0,
                reportData.maintenanceDevices || 0,
              ],
              backgroundColor: ["#00C49F", "#FF8042", "#FFBB28"],
              hoverBackgroundColor: ["#00BFA5", "#FF5722", "#FFA500"],
            },
          ],
        };
        return (
          <div style={styles.section}>
            <h2>Network Report</h2>
            {error && <p style={styles.error}>{error}</p>}
            {Object.keys(reportData).length === 0 ? (
              <p>Loading data...</p>
            ) : (
              <div>
                <p><strong>Total Devices:</strong> {reportData.totalDevices}</p>
                <p><strong>Online Devices:</strong> {reportData.onlineDevices}</p>
                <p><strong>Offline Devices:</strong> {reportData.offlineDevices}</p>
                <p><strong>Maintenance Devices:</strong> {reportData.maintenanceDevices}</p>
                <h3>Device Status</h3>
                <Pie
                  data={networkData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}` } },
                    },
                  }}
                  style={{ maxWidth: "400px", maxHeight: "300px", margin: "0 auto" }}
                />
              </div>
            )}
          </div>
        );
      default:
        return <div style={styles.section}><h2>Select a report from the sidebar</h2></div>;
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        style={{
          ...styles.mainContent,
          marginLeft: collapsed ? "60px" : "250px",
          transition: "margin-left 0.3s ease",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#F5F6FA",
    overflowY: "auto",
    width: "100%", // Full width instead of 50%
    boxSizing: "border-box",
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: "30px", // More space
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "none",
    boxSizing: "border-box",
    overflow: "visible",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    borderBottom: "2px solid #E9ECEF",
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #E9ECEF",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default ReportsAnalytics;