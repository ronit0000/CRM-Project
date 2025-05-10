import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Settings = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024);
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    role: "User",
    email: "",
    password: "",
  });
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/settings") {
      navigate("/settings/users");
    }
    fetchUsers();
  }, [location.pathname, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/settings/users");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch users: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/settings/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add user: ${response.status} - ${errorText}`);
      }
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setShowAddUserForm(false);
      setNewUser({ name: "", role: "User", email: "", password: "" });
    } catch (error) {
      console.error("Failed to add user:", error.message);
      setError(error.message);
    }
  };

  const editUserForm = (user) => {
    setEditUser(user);
    setShowEditUserForm(true);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`http://localhost:8080/api/settings/users/${editUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editUser),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update user: ${response.status} - ${errorText}`);
      }
      const updatedUser = await response.json();
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      setShowEditUserForm(false);
      setEditUser(null);
    } catch (error) {
      console.error("Failed to update user:", error.message);
      setError(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/settings/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete user: ${response.status} - ${errorText}`);
      }
      setUsers(users.filter((user) => user.id !== id));
      setError("");
    } catch (error) {
      console.error("Failed to delete user:", error.message);
      setError(error.message);
    }
  };

  const renderContent = () => {
    switch (location.pathname) {
      case "/settings/users":
        return (
          <div style={styles.section}>
            <h2>User Management</h2>
            <button style={styles.button} onClick={() => setShowAddUserForm(true)}>
              Add User
            </button>
            {error && <p style={styles.error}>{error}</p>}
            {loading && <p>Loading users...</p>}
            {showAddUserForm && (
              <form onSubmit={addUser} style={styles.form}>
                <label style={styles.label}>
                  Name:
                  <input
                    type="text"
                    style={styles.input}
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                  />
                </label>
                <label style={styles.label}>
                  Role:
                  <select
                    style={styles.input}
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    required
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </label>
                <label style={styles.label}>
                  Email:
                  <input
                    type="email"
                    style={styles.input}
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                </label>
                <label style={styles.label}>
                  Password:
                  <input
                    type="password"
                    style={styles.input}
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                  />
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" style={styles.button}>
                    Save
                  </button>
                  <button
                    type="button"
                    style={styles.button}
                    onClick={() => setShowAddUserForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            {showEditUserForm && editUser && (
              <form onSubmit={updateUser} style={styles.form}>
                <label style={styles.label}>
                  Name:
                  <input
                    type="text"
                    style={styles.input}
                    value={editUser.name}
                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                    required
                  />
                </label>
                <label style={styles.label}>
                  Role:
                  <select
                    style={styles.input}
                    value={editUser.role}
                    onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                    required
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </label>
                <label style={styles.label}>
                  Status:
                  <select
                    style={styles.input}
                    value={editUser.status}
                    onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                    required
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </label>
                <label style={styles.label}>
                  Email:
                  <input
                    type="email"
                    style={styles.input}
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    required
                  />
                </label>
                <label style={styles.label}>
                  Password:
                  <input
                    type="password"
                    style={styles.input}
                    value={editUser.password}
                    onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                    required
                  />
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" style={styles.button}>
                    Save
                  </button>
                  <button
                    type="button"
                    style={styles.button}
                    onClick={() => setShowEditUserForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && !loading && !error ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td style={styles.td}>{user.id}</td>
                      <td style={styles.td}>{user.name}</td>
                      <td style={styles.td}>{user.role}</td>
                      <td style={styles.td}>{user.status}</td>
                      <td style={styles.td}>{user.email}</td>
                      <td style={styles.td}>
                        <button
                          style={styles.actionButton}
                          onClick={() => editUserForm(user)}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.actionButton}
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
    marginBottom: "20px",
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
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Settings;