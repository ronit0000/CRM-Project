import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Billing = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024);
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({ customerName: "", amount: "", status: "Pending" });
  const [editInvoice, setEditInvoice] = useState(null); // For editing
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchInvoices = async () => {
      let url;
      switch (location.pathname) {
        case "/billing/invoices":
          url = "http://localhost:8080/api/billing/invoices";
          break;
        case "/billing/invoices/pending":
          url = "http://localhost:8080/api/billing/invoices/pending";
          break;
        case "/billing/invoices/paid":
          url = "http://localhost:8080/api/billing/invoices/paid";
          break;
        default:
          url = null;
      }
      if (url) {
        try {
          const response = await fetch(url, { method: "GET" });
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();
          console.log(`Fetched invoices for ${location.pathname}:`, data);
          setInvoices(data);
          setError(null);
        } catch (error) {
          console.error("Fetch error:", error.message);
          setError("Failed to load invoices. Please try again.");
        }
      }
    };
    fetchInvoices();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/billing") {
      navigate("/billing/invoices");
    }
  }, [location.pathname, navigate]);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    const invoiceToCreate = {
      ...newInvoice,
      amount: parseFloat(newInvoice.amount),
    };
    try {
      const response = await fetch("http://localhost:8080/api/billing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceToCreate),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const createdInvoice = await response.json();
      setInvoices([...invoices, createdInvoice]);
      setNewInvoice({ customerName: "", amount: "", status: "Pending" });
      setError(null);
      navigate("/billing/invoices");
    } catch (error) {
      console.error("Error creating invoice:", error.message);
      setError("Failed to create invoice. Please check your input and try again.");
    }
  };

  const handleEditInvoice = (invoice) => {
    setEditInvoice({ ...invoice, amount: invoice.amount.toString() }); // Pre-fill form
    navigate("/billing/edit");
  };

  const handleUpdateInvoice = async (e) => {
    e.preventDefault();
    const invoiceToUpdate = {
      ...editInvoice,
      amount: parseFloat(editInvoice.amount),
    };
    try {
      const response = await fetch(`http://localhost:8080/api/billing/update/${editInvoice.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceToUpdate),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const updatedInvoice = await response.json();
      setInvoices(invoices.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)));
      setEditInvoice(null);
      setError(null);
      navigate("/billing/invoices");
    } catch (error) {
      console.error("Error updating invoice:", error.message);
      setError("Failed to update invoice. Please try again.");
    }
  };

  const handleDeleteInvoice = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/billing/delete/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        setInvoices(invoices.filter((inv) => inv.id !== id));
        setError(null);
      } catch (error) {
        console.error("Error deleting invoice:", error.message);
        setError("Failed to delete invoice. Please try again.");
      }
    }
  };

  const renderContent = () => {
    switch (location.pathname) {
      case "/billing/create":
        return (
          <div style={styles.section}>
            <h2>Create New Invoice</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleCreateInvoice} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Customer Name:</label>
                <input
                  type="text"
                  value={newInvoice.customerName}
                  onChange={(e) => setNewInvoice({ ...newInvoice, customerName: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Amount (₹):</label>
                <input
                  type="number"
                  step="0.01"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Status:</label>
                <select
                  value={newInvoice.status}
                  onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value })}
                  style={styles.input}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <button type="submit" style={styles.submitButton}>Create Invoice</button>
            </form>
          </div>
        );
      case "/billing/edit":
        if (!editInvoice) return <p>No invoice selected for editing.</p>;
        return (
          <div style={styles.section}>
            <h2>Edit Invoice</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleUpdateInvoice} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Customer Name:</label>
                <input
                  type="text"
                  value={editInvoice.customerName}
                  onChange={(e) => setEditInvoice({ ...editInvoice, customerName: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Amount (₹):</label>
                <input
                  type="number"
                  step="0.01"
                  value={editInvoice.amount}
                  onChange={(e) => setEditInvoice({ ...editInvoice, amount: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Status:</label>
                <select
                  value={editInvoice.status}
                  onChange={(e) => setEditInvoice({ ...editInvoice, status: e.target.value })}
                  style={styles.input}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <button type="submit" style={styles.submitButton}>Update Invoice</button>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={() => {
                  setEditInvoice(null);
                  navigate("/billing/invoices");
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        );
      default:
        const title =
          location.pathname === "/billing/invoices" ? "All Invoices" :
          location.pathname === "/billing/invoices/pending" ? "Pending Invoices" :
          "Paid Invoices";

        return (
          <div style={styles.section}>
            <h2>{title}</h2>
            {error && <p style={styles.error}>{error}</p>}
            {invoices.length === 0 ? (
              <p>No invoices found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Customer Name</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td style={styles.td}>{invoice.id}</td>
                      <td style={styles.td}>{invoice.customerName}</td>
                      <td style={styles.td}>₹{invoice.amount.toFixed(2)}</td>
                      <td style={styles.td}>{invoice.status}</td>
                      <td style={styles.td}>
                        <button
                          style={styles.actionButton}
                          onClick={() => handleEditInvoice(invoice)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ ...styles.actionButton, backgroundColor: "#DC3545" }}
                          onClick={() => handleDeleteInvoice(invoice.id)}
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

export default Billing;