import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordModal = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        email, // Send email as a raw string
        {
          headers: {
            "Content-Type": "text/plain", // Set content type to text/plain
          },
        }
      );
      setStatus("Default password has been sent to your email.");
    } catch (error) {
      console.error(error);
      setStatus("Failed to send password. Please try again.");
    }
  };

  if (!show) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={modalStyles.input}
          />
          <button type="submit" style={modalStyles.button}>Send Password</button>
        </form>
        <p>{status}</p>
        <button onClick={onClose} style={modalStyles.close}>Close</button>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    background: "#5F41E4",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  close: {
    background: "none",
    border: "none",
    color: "#333",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default ForgotPasswordModal;