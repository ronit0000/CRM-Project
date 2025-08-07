import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Customers = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024);
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", plan: "Basic", status: "Active" });
  const [editCustomer, setEditCustomer] = useState(null); // For editing
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch customers from backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/customers/all");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Fetched customers:", data);
        setCustomers(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching customers:", error.message);
        setError("Failed to load customers. Please try again.");
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (location.pathname === "/customers") {
      navigate("/customers/all");
    }
  }, [location.pathname, navigate]);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/customers/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const createdCustomer = await response.json();
      console.log("Created customer:", createdCustomer);
      setCustomers([...customers, createdCustomer]);
      setNewCustomer({ name: "", email: "", plan: "Basic", status: "Active" });
      setError(null);
      navigate("/customers/all");
    } catch (error) {
      console.error("Error adding customer:", error.message);
      setError("Failed to add customer. Please try again.");
    }
  };

  const handleEditCustomer = (customer) => {
    setEditCustomer({ ...customer });
    navigate("/customers/edit");
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/customers/update/${editCustomer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editCustomer),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const updatedCustomer = await response.json();
      setCustomers(customers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)));
      setEditCustomer(null);
      setError(null);
      navigate("/customers/all");
    } catch (error) {
      console.error("Error updating customer:", error.message);
      setError("Failed to update customer. Please try again.");
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/customers/delete/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        setCustomers(customers.filter((c) => c.id !== id));
        setError(null);
      } catch (error) {
        console.error("Error deleting customer:", error.message);
        setError("Failed to delete customer. Please try again.");
      }
    }
  };

  const renderContent = () => {
    switch (location.pathname) {
      case "/customers/all":
        return (
          <div style={styles.section}>
            <h2>All Customers</h2>
            {error && <p style={styles.error}>{error}</p>}
            {customers.length === 0 ? (
              <p>No customers found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Plan</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td style={styles.td}>{customer.id}</td>
                      <td style={styles.td}>{customer.name}</td>
                      <td style={styles.td}>{customer.email}</td>
                      <td style={styles.td}>{customer.plan}</td>
                      <td style={styles.td}>{customer.status}</td>
                      <td style={styles.td}>
                        <button
                          style={styles.actionButton}
                          onClick={() => handleEditCustomer(customer)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ ...styles.actionButton, backgroundColor: "#DC3545" }}
                          onClick={() => handleDeleteCustomer(customer.id)}
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
      case "/customers/add":
        return (
          <div style={styles.section}>
            <h2>Add New Customer</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleAddCustomer} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Plan:</label>
                <select
                  value={newCustomer.plan}
                  onChange={(e) => setNewCustomer({ ...newCustomer, plan: e.target.value })}
                  style={styles.input}
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label>Status:</label>
                <select
                  value={newCustomer.status}
                  onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
                  style={styles.input}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" style={styles.submitButton}>Add Customer</button>
            </form>
          </div>
        );
      case "/customers/edit":
        if (!editCustomer) return <p>No customer selected for editing.</p>;
        return (
          <div style={styles.section}>
            <h2>Edit Customer</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleUpdateCustomer} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  value={editCustomer.name}
                  onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  value={editCustomer.email}
                  onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Plan:</label>
                <select
                  value={editCustomer.plan}
                  onChange={(e) => setEditCustomer({ ...editCustomer, plan: e.target.value })}
                  style={styles.input}
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label>Status:</label>
                <select
                  value={editCustomer.status}
                  onChange={(e) => setEditCustomer({ ...editCustomer, status: e.target.value })}
                  style={styles.input}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" style={styles.submitButton}>Update Customer</button>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={() => {
                  setEditCustomer(null);
                  navigate("/customers/all");
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        );
      case "/customers/segments":
        return (
          <div style={styles.section}>
            <h2>Customer Segments</h2>
            {error && <p style={styles.error}>{error}</p>}
            <ul style={styles.segmentList}>
              <li style={styles.segmentItem}>
                <strong>Active Basic Users:</strong>{" "}
                {customers.filter((c) => c.plan === "Basic" && c.status === "Active").length}
              </li>
              <li style={styles.segmentItem}>
                <strong>Active Premium Users:</strong>{" "}
                {customers.filter((c) => c.plan === "Premium" && c.status === "Active").length}
              </li>
              <li style={styles.segmentItem}>
                <strong>Inactive Users:</strong>{" "}
                {customers.filter((c) => c.status === "Inactive").length}
              </li>
            </ul>
          </div>
        );
      default:
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
    marginTop: "10px",
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
    fontFamily: "Montserrat, sans-serif",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontFamily: "Montserrat, sans-serif",
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
  segmentList: {
    listStyle: "none",
    padding: 0,
    marginTop: "10px",
  },
  segmentItem: {
    padding: "10px",
    borderBottom: "1px solid #E9ECEF",
  },
};

export default Customers;