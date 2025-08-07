import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const NetworkManagement = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024);
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ deviceName: "", ipAddress: "", status: "Online" });
  const [editDevice, setEditDevice] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDevices = async () => {
      console.log("Fetching for path:", location.pathname);
      let url;
      switch (location.pathname) {
        case "/network/devices":
          url = "http://localhost:8080/api/network/devices";
          break;
        case "/network/devices/online":
          url = "http://localhost:8080/api/network/devices/online";
          break;
        case "/network/devices/offline":
          url = "http://localhost:8080/api/network/devices/offline";
          break;
        default:
          url = null;
          console.log("No URL matched for path:", location.pathname);
      }
      if (url) {
        try {
          const response = await fetch(url, { method: "GET" });
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();
          console.log(`Fetched data for ${url}:`, data);
          setDevices(data);
          setError(null);
        } catch (error) {
          console.error("Fetch error:", error.message);
          setError("Failed to load devices. Please try again.");
          setDevices([]);
        }
      }
    };
    fetchDevices();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/network") {
      console.log("Redirecting to /network/devices");
      navigate("/network/devices");
    }
  }, [location.pathname, navigate]);

  const handleCreateDevice = async (e) => {
    e.preventDefault();
    console.log("Creating device:", newDevice); // Debug form submission
    try {
      const response = await fetch("http://localhost:8080/api/network/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDevice),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const createdDevice = await response.json();
      console.log("Created device response:", createdDevice);
      setDevices([...devices, createdDevice]);
      setNewDevice({ deviceName: "", ipAddress: "", status: "Online" });
      setError(null);
      navigate("/network/devices");
    } catch (error) {
      console.error("Error creating device:", error.message);
      setError("Failed to create device. Please try again.");
    }
  };

  const handleEditDevice = (device) => {
    setEditDevice({ ...device });
    navigate("/network/edit");
  };

  const handleUpdateDevice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/network/update/${editDevice.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDevice),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const updatedDevice = await response.json();
      setDevices(devices.map((d) => (d.id === updatedDevice.id ? updatedDevice : d)));
      setEditDevice(null);
      setError(null);
      navigate("/network/devices");
    } catch (error) {
      console.error("Error updating device:", error.message);
      setError("Failed to update device. Please try again.");
    }
  };

  const handleDeleteDevice = async (id) => {
    if (window.confirm("Are you sure you want to delete this device?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/network/delete/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        setDevices(devices.filter((d) => d.id !== id));
        setError(null);
      } catch (error) {
        console.error("Error deleting device:", error.message);
        setError("Failed to delete device. Please try again.");
      }
    }
  };

  const renderContent = () => {
    console.log("Rendering content for path:", location.pathname);
    switch (location.pathname) {
      case "/network/create":
        console.log("Rendering Create New Device form");
        return (
          <div style={styles.section}>
            <h2>Create New Device</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleCreateDevice} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Device Name:</label>
                <input
                  type="text"
                  value={newDevice.deviceName}
                  onChange={(e) => setNewDevice({ ...newDevice, deviceName: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>IP Address:</label>
                <input
                  type="text"
                  value={newDevice.ipAddress}
                  onChange={(e) => setNewDevice({ ...newDevice, ipAddress: e.target.value })}
                  style={styles.input}
                  required
                  pattern="^(\d{1,3}\.){3}\d{1,3}$"
                  title="Enter a valid IP address (e.g., 192.168.1.1)"
                />
              </div>
              <div style={styles.formGroup}>
                <label>Status:</label>
                <select
                  value={newDevice.status}
                  onChange={(e) => setNewDevice({ ...newDevice, status: e.target.value })}
                  style={styles.input}
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <button type="submit" style={styles.submitButton}>Create Device</button>
            </form>
          </div>
        );
      case "/network/edit":
        console.log("Rendering Edit Device form");
        if (!editDevice) return <p>No device selected for editing.</p>;
        return (
          <div style={styles.section}>
            <h2>Edit Device</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleUpdateDevice} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Device Name:</label>
                <input
                  type="text"
                  value={editDevice.deviceName}
                  onChange={(e) => setEditDevice({ ...editDevice, deviceName: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>IP Address:</label>
                <input
                  type="text"
                  value={editDevice.ipAddress}
                  onChange={(e) => setEditDevice({ ...editDevice, ipAddress: e.target.value })}
                  style={styles.input}
                  required
                  pattern="^(\d{1,3}\.){3}\d{1,3}$"
                  title="Enter a valid IP address (e.g., 192.168.1.1)"
                />
              </div>
              <div style={styles.formGroup}>
                <label>Status:</label>
                <select
                  value={editDevice.status}
                  onChange={(e) => setEditDevice({ ...editDevice, status: e.target.value })}
                  style={styles.input}
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <button type="submit" style={styles.submitButton}>Update Device</button>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={() => {
                  setEditDevice(null);
                  navigate("/network/devices");
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        );
      case "/network/devices":
        console.log("Rendering All Devices");
        return (
          <div style={styles.section}>
            <h2>All Devices</h2>
            {error && <p style={styles.error}>{error}</p>}
            {devices.length === 0 ? (
              <p>No devices found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Device Name</th>
                    <th style={styles.th}>IP Address</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id}>
                      <td style={styles.td}>{device.id}</td>
                      <td style={styles.td}>{device.deviceName}</td>
                      <td style={styles.td}>{device.ipAddress}</td>
                      <td style={styles.td}>{device.status}</td>
                      <td style={styles.td}>
                        <button
                          style={styles.actionButton}
                          onClick={() => handleEditDevice(device)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ ...styles.actionButton, backgroundColor: "#DC3545" }}
                          onClick={() => handleDeleteDevice(device.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      case "/network/devices/online":
        console.log("Rendering Online Devices");
        return (
          <div style={styles.section}>
            <h2>Online Devices</h2>
            {error && <p style={styles.error}>{error}</p>}
            {devices.length === 0 ? (
              <p>No devices found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Device Name</th>
                    <th style={styles.th}>IP Address</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id}>
                      <td style={styles.td}>{device.id}</td>
                      <td style={styles.td}>{device.deviceName}</td>
                      <td style={styles.td}>{device.ipAddress}</td>
                      <td style={styles.td}>{device.status}</td>
                      <td style={styles.td}>
                        <button
                          style={styles.actionButton}
                          onClick={() => handleEditDevice(device)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ ...styles.actionButton, backgroundColor: "#DC3545" }}
                          onClick={() => handleDeleteDevice(device.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      case "/network/devices/offline":
        console.log("Rendering Offline Devices");
        return (
          <div style={styles.section}>
            <h2>Offline Devices</h2>
            {error && <p style={styles.error}>{error}</p>}
            {devices.length === 0 ? (
              <p>No devices found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Device Name</th>
                    <th style={styles.th}>IP Address</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id}>
                      <td style={styles.td}>{device.id}</td>
                      <td style={styles.td}>{device.deviceName}</td>
                      <td style={styles.td}>{device.ipAddress}</td>
                      <td style={styles.td}>{device.status}</td>
                      <td style={styles.td}>
                        <button
                          style={styles.actionButton}
                          onClick={() => handleEditDevice(device)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ ...styles.actionButton, backgroundColor: "#DC3545" }}
                          onClick={() => handleDeleteDevice(device.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      default:
        console.log("Default case triggered for path:", location.pathname);
        return <div style={styles.section}><h2>Select an option from the sidebar</h2></div>;
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
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "400px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #E9ECEF",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  cancelButton: {
    padding: "10px",
    backgroundColor: "#6C757D",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  actionButton: {
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default NetworkManagement;