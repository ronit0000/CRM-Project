import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Settings = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024);
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/settings") {
      navigate("/settings/users");
    }
    fetchUsers();
  }, [location.pathname, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/settings/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const addUser = async () => {
    const newUser = { name: "New User", role: "User" }; // Example data
    try {
      const response = await fetch("http://localhost:8080/api/settings/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/settings/users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const renderContent = () => {
    switch (location.pathname) {
      case "/settings/users":
        return (
          <div style={styles.section}>
            <h2>User Management</h2>
            <button style={styles.button} onClick={addUser}>
              Add User
            </button>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={styles.td}>{user.id}</td>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.role}</td>
                    <td style={styles.td}>
                      <button style={styles.actionButton}>Edit</button>
                      <button
                        style={styles.actionButton}
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "/settings/config":
        return (
          <div style={styles.section}>
            <h2>System Configuration</h2>
            <p>Configure system settings (e.g., API keys, timeouts).</p>
            <form style={styles.form}>
              <label style={styles.label}>
                API Key:
                <input type="text" style={styles.input} defaultValue="xyz123" />
              </label>
              <label style={styles.label}>
                Timeout (seconds):
                <input type="number" style={styles.input} defaultValue="30" />
              </label>
              <button type="submit" style={styles.button}>
                Save
              </button>
            </form>
          </div>
        );
      case "/settings/notifications":
        return (
          <div style={styles.section}>
            <h2>Notifications</h2>
            <p>Manage notification settings (e.g., email, SMS).</p>
            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked /> Email Notifications
              </label>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" /> SMS Notifications
              </label>
              <button style={styles.button}>Save Settings</button>
            </div>
          </div>
        );
      default:
        return (
          <div style={styles.section}>
            <h2>Select a settings option from the sidebar</h2>
          </div>
        );
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
    width: "100%",
    boxSizing: "border-box",
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: "30px",
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
    marginTop: "20px",
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
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  actionButton: {
    padding: "5px 10px",
    marginRight: "5px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
  },
  input: {
    padding: "8px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #E9ECEF",
    fontSize: "14px",
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
  },
};

export default Settings;