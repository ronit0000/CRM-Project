import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import logo from "./LogoBg.png";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [session, setSession] = useState({
    user: {
      name: "Ronit Kumar Sahu",
      email: "2300030588cse@gmail.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024);
  const [stats, setStats] = useState({
    activeCustomers: 0,
    inactiveCustomers: 0,
    totalRevenue: 0,
    pendingInvoices: 0,
    onlineDevices: 0,
    offlineDevices: 0,
    openTickets: 0,
  });
  const [ticketData, setTicketData] = useState({
    labels: ["Open", "Closed", "Escalated"],
    datasets: [{ data: [0, 0, 0], backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }],
  });
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch and poll stats
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/dashboard/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch
      }
    };

    const fetchTicketStatus = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/dashboard/ticket-status");
        if (!response.ok) throw new Error("Failed to fetch ticket status");
        const data = await response.json();
        setTicketData({
          labels: data.labels,
          datasets: [{ ...ticketData.datasets[0], data: data.data }],
        });
      } catch (error) {
        console.error("Failed to fetch ticket status:", error);
      }
    };

    // Initial fetches
    setIsLoading(true); // Set loading to true before initial fetch
    fetchDashboardStats();
    fetchTicketStatus();

    // Set up polling every 5 seconds
    const intervalId = setInterval(() => {
      fetchDashboardStats();
      fetchTicketStatus();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSignOut = () => {
    setSession(null);
    navigate("/login");
  };

  // Determine network status based on online and offline devices
  const totalDevices = (stats.onlineDevices || 0) + (stats.offlineDevices || 0); // Handle undefined values
  const networkStatus = isLoading 
    ? "Loading..." 
    : totalDevices > 0 
      ? stats.offlineDevices === 0 
        ? "All Systems Operational" 
        : stats.offlineDevices / totalDevices > 0.5 
          ? "Critical Failure" 
          : "Some Issues"
      : "No Devices Detected";
  const statusColor = isLoading 
    ? "#6c757d" // Gray while loading
    : totalDevices > 0 
      ? stats.offlineDevices === 0 
        ? "#28a745" // Green for all operational
        : stats.offlineDevices / totalDevices > 0.5 
          ? "#dc3545" // Red for critical failure
          : "#ffc107" // Yellow for some issues
      : "#6c757d"; // Gray for no devices

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
        <header style={styles.header}>
          <img src={logo} alt="EaseConnect Logo" style={styles.logo} />
          <h1>Dashboard</h1>
          {session && (
            <div style={styles.userInfo}>
              <img src={session.user.image} alt="User" style={styles.userImage} />
              <span>{session.user.name}</span>
              <button onClick={handleSignOut} style={styles.signOutButton}>
                Sign Out
              </button>
            </div>
          )}
        </header>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3>Active Customers</h3>
            <p style={styles.statValue}>{stats.activeCustomers}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Inactive Customers</h3>
            <p style={styles.statValue}>{stats.inactiveCustomers}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Total Revenue (₹)</h3>
            <p style={styles.statValue}>{stats.totalRevenue.toFixed(2)}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Pending Invoices</h3>
            <p style={styles.statValue}>{stats.pendingInvoices}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Online Devices</h3>
            <p style={styles.statValue}>{stats.onlineDevices}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Offline Devices</h3>
            <p style={styles.statValue}>{stats.offlineDevices}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Open Tickets</h3>
            <p style={styles.statValue}>{stats.openTickets}</p>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={{ ...styles.card, gridColumn: "span 2" }}>
            <h2>Support Tickets Status</h2>
            <Pie data={ticketData} options={{ responsive: true }} />
          </div>
          <div style={styles.card}>
            <h2>Network Status</h2>
            <div style={{ ...styles.statusIndicator, backgroundColor: statusColor }}>
              {networkStatus}
            </div>
          </div>
          <div style={styles.card}>
            <h2>Customer Growth</h2>
            <Bar
              data={{
                labels: ["Active", "Inactive"],
                datasets: [
                  {
                    label: "Customers",
                    data: [stats.activeCustomers, stats.inactiveCustomers],
                    backgroundColor: "#007BFF",
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          </div>
          <div style={styles.card}>
            <h2>Goals</h2>
            <div style={styles.goal}>
              <p>Active Customers Goal: 100</p>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${(stats.activeCustomers / 100) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div style={styles.goal}>
              <p>Pending Invoices Goal: 0</p>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${(stats.pendingInvoices / 10) * 100}%`, // Example threshold
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div style={styles.card}>
            <h2>Recent Activity</h2>
            <ul style={styles.activityList}>
              <li>New customer added: {stats.activeCustomers > 0 ? "Yes" : "No"}</li>
              <li>Pending invoice count: {stats.pendingInvoices}</li>
              <li>Network check: {stats.onlineDevices} online</li>
            </ul>
          </div>
        </div>
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
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  logo: {
    width: "150px",
    height: "auto",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  userImage: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  },
  signOutButton: {
    padding: "5px 10px",
    backgroundColor: "black",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007BFF",
    marginTop: "5px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  statusIndicator: {
    padding: "10px",
    borderRadius: "5px",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: "10px",
  },
  goal: {
    marginBottom: "15px",
  },
  progressBar: {
    width: "100%",
    height: "10px",
    backgroundColor: "#E9ECEF",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007BFF",
    transition: "width 0.3s ease",
  },
  activityList: {
    listStyle: "none",
    padding: 0,
  },
};

export default Dashboard;