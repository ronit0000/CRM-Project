import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Support = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024);
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ customerName: "", issue: "", status: "Open" });
  const [editTicket, setEditTicket] = useState(null); // For editing
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTickets = async () => {
      let url;
      switch (location.pathname) {
        case "/support/open":
          url = "http://localhost:8080/api/support/open";
          break;
        case "/support/closed":
          url = "http://localhost:8080/api/support/closed";
          break;
        case "/support/escalations":
          url = "http://localhost:8080/api/support/escalations";
          break;
        default:
          url = null;
      }
      if (url) {
        try {
          const response = await fetch(url, { method: "GET" });
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();
          console.log(`Fetched tickets for ${location.pathname}:`, data);
          setTickets(data);
          setError(null);
        } catch (error) {
          console.error("Fetch error:", error.message);
          setError("Failed to load tickets. Please try again.");
        }
      }
    };
    fetchTickets();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/support") {
      navigate("/support/open");
    }
  }, [location.pathname, navigate]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/support/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });
      if (!response.ok) throw new Error(`HTTP error! Elise {response.status}`);
      const createdTicket = await response.json();
      console.log("Created ticket:", createdTicket);
      setTickets([...tickets, createdTicket]);
      setNewTicket({ customerName: "", issue: "", status: "Open" });
      setError(null);
      navigate("/support/open");
    } catch (error) {
      console.error("Error creating ticket:", error.message);
      setError("Failed to create ticket. Please try again.");
    }
  };

  const handleEditTicket = (ticket) => {
    setEditTicket({ ...ticket }); // Pre-fill form
    navigate("/support/edit");
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/support/update/${editTicket.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTicket),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const updatedTicket = await response.json();
      setTickets(tickets.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)));
      setEditTicket(null);
      setError(null);
      navigate("/support/open");
    } catch (error) {
      console.error("Error updating ticket:", error.message);
      setError("Failed to update ticket. Please try again.");
    }
  };

  const handleDeleteTicket = async (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/support/delete/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        setTickets(tickets.filter((t) => t.id !== id));
        setError(null);
      } catch (error) {
        console.error("Error deleting ticket:", error.message);
        setError("Failed to delete ticket. Please try again.");
      }
    }
  };

  const renderContent = () => {
    switch (location.pathname) {
      case "/support/create":
        return (
          <div style={styles.section}>
            <h2>Create New Ticket</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleCreateTicket} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Customer Name:</label>
                <input
                  type="text"
                  value={newTicket.customerName}
                  onChange={(e) => setNewTicket({ ...newTicket, customerName: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Issue:</label>
                <input
                  type="text"
                  value={newTicket.issue}
                  onChange={(e) => setNewTicket({ ...newTicket, issue: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Status:</label>
                <select
                  value={newTicket.status}
                  onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
                  style={styles.input}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Escalated">Escalated</option>
                </select>
              </div>
              <button type="submit" style={styles.submitButton}>Create Ticket</button>
            </form>
          </div>
        );
      case "/support/edit":
        if (!editTicket) return <p>No ticket selected for editing.</p>;
        return (
          <div style={styles.section}>
            <h2>Edit Ticket</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleUpdateTicket} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Customer Name:</label>
                <input
                  type="text"
                  value={editTicket.customerName}
                  onChange={(e) => setEditTicket({ ...editTicket, customerName: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Issue:</label>
                <input
                  type="text"
                  value={editTicket.issue}
                  onChange={(e) => setEditTicket({ ...editTicket, issue: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Status:</label>
                <select
                  value={editTicket.status}
                  onChange={(e) => setEditTicket({ ...editTicket, status: e.target.value })}
                  style={styles.input}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Escalated">Escalated</option>
                </select>
              </div>
              <button type="submit" style={styles.submitButton}>Update Ticket</button>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={() => {
                  setEditTicket(null);
                  navigate("/support/open");
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        );
      default:
        const title =
          location.pathname === "/support/open" ? "Open Tickets" :
          location.pathname === "/support/closed" ? "Closed Tickets" :
          "Escalated Tickets";

        return (
          <div style={styles.section}>
            <h2>{title}</h2>
            {error && <p style={styles.error}>{error}</p>}
            {tickets.length === 0 ? (
              <p>No tickets found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Customer Name</th>
                    <th style={styles.th}>Issue</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td style={styles.td}>{ticket.id}</td>
                      <td style={styles.td}>{ticket.customerName}</td>
                      <td style={styles.td}>{ticket.issue}</td>
                      <td style={styles.td}>{ticket.status}</td>
                      <td style={styles.td}>
                        <button
                          style={styles.actionButton}
                          onClick={() => handleEditTicket(ticket)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ ...styles.actionButton, backgroundColor: "#DC3545" }}
                          onClick={() => handleDeleteTicket(ticket.id)}
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

export default Support;