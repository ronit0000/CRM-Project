import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SocialLogin from "./SocialLogin";
import handshake from "./handshake.mp4";

const SignUp = () => {
  const [name, setName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [tempPassword2, setTempPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (tempPassword !== tempPassword2) {
      setError("Passwords do not match.");
      return;
    }

    const userData = {
      name,
      email: tempEmail,
      password: tempPassword,
      role: "USER",
      status: "ACTIVE",
    };

    console.log("Sending sign-up request:", userData);

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (response.ok) {
        console.log("Sign Up Successful:", data);
        setName("");
        setTempEmail("");
        setTempPassword("");
        setTempPassword2("");
        navigate("/dashboard");
      } else {
        setError(data.message || data || "Failed to register user.");
      }
    } catch (err) {
      console.error("Error during sign-up:", err);
      setError("Unable to connect to the server. Please check if the backend is running.");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Montserrat", sans-serif;
        }

        .navbar .navbar-links .signup-btn,
        .navbar .navbar-links .login-btn {
          padding: 8px 15px !important;
          width: 120px !important;
          height: 40px !important;
          font-size: 1rem !important;
          line-height: 1.2 !important;
          white-space: nowrap !important;
        }

        body {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          position: relative;
          padding-top: 80px;
        }

        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .video-background video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .container {
          max-width: 450px;
          background: white;
          padding: 2.5rem;
          border-radius: 10px;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 1;
        }

        .navbar {
          background: #fff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100;
        }

        h2 {
          text-align: center;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-control {
          height: 45px;
          font-size: 1rem;
          font-weight: 500;
        }

        .btn {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 5px;
          transition: 0.3s;
        }

        .btn-primary {
          background: #5F41E4;
          border: none;
        }

        .btn-primary:hover {
          background: #4320df;
        }

        .login-btn {
          display: block;
          text-align: center;
          margin-top: 15px;
          color: #5F41E4;
          font-weight: 600;
          text-decoration: none;
        }

        .login-btn:hover {
          text-decoration: underline;
        }

        .separator {
          position: relative;
          margin: 1.5rem 0;
          text-align: center;
        }

        .separator span {
          font-weight: 500;
          color: #6652BE;
          background: #fff;
          font-size: 1.06rem;
          padding: 0 0.9rem;
        }

        .social-login {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .social-button {
          display: flex;
          gap: 0.81rem;
          width: 100%;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0.75rem 0;
          border-radius: 0.31rem;
          align-items: center;
          justify-content: center;
          background: #F9F8FF;
          border: 1px solid #D5CBFF;
          transition: 0.3s ease;
        }

        .social-button:hover {
          border-color: #5F41E4;
          background: #f1eff9;
        }

        .error-message {
          color: red;
          text-align: center;
          margin-bottom: 15px;
        }
      `}</style>

      <Navbar />
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={handshake} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="container">
        <h2>Sign Up</h2>
        <SocialLogin />
        <p className="separator"><span>or</span></p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={tempEmail}
              onChange={(event) => setTempEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={tempPassword}
              onChange={(event) => setTempPassword(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              value={tempPassword2}
              onChange={(event) => setTempPassword2(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>

        <a href="/login" className="login-btn">
          Already have an account? Login
        </a>
      </div>
    </>
  );
};

export default SignUp;