import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import the Navbar component
import SocialLogin from "./SocialLogin"; // Import the SocialLogin component
import handshake from "./handshake.mp4"; // Import the video

const SignUp = () => {
  const [tempEmail, setTempEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [tempPassword2, setTempPassword2] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("handleSignUp called");
    console.log("Current users:", users);
    console.log("Email:", tempEmail, "Password:", tempPassword, "Confirm:", tempPassword2);

    const userExists = users.some((user) => user.email === tempEmail);
    if (!userExists) {
      if (tempPassword === tempPassword2) {
        setUsers([...users, { email: tempEmail, password: tempPassword }]);
        console.log("Sign Up Successful. New users:", [...users, { email: tempEmail, password: tempPassword }]);
        setTempEmail("");
        setTempPassword("");
        setTempPassword2("");
        navigate("/dashboard");
        console.log("Navigating to /dashboard");
      } else {
        console.log("Passwords do not match.");
      }
    } else {
      console.log("Email already exists.");
    }
  };

  return (
    <>
      <style>{`
        /* Import Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Montserrat", sans-serif;
        }

        /* Ensure Bootstrap doesn't interfere with navbar buttons */
        .navbar .navbar-links .signup-btn,
        .navbar .navbar-links .login-btn {
          padding: 8px 15px !important; /* Match Navbar.jsx */
          width: 120px !important; /* Match Navbar.jsx */
          height: 40px !important; /* Match Navbar.jsx */
          font-size: 1rem !important;
          line-height: 1.2 !important; /* Match Navbar.jsx */
          white-space: nowrap !important; /* Prevent wrapping */
        }

        body {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          position: relative; /* Ensure video positioning works */
          padding-top: 80px; /* Avoid overlap with fixed navbar */
        }

        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0; /* Behind all content */
        }

        .video-background video {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Ensure video covers the entire area */
        }

        .container {
          max-width: 450px;
          background: white; /* Solid background to exclude video */
          padding: 2.5rem;
          border-radius: 10px;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 1; /* Above the video */
        }

        .navbar {
          background: #fff; /* Solid background to exclude video */
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100; /* Above the video and form */
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
          gap: 1rem; /* Add gap between buttons */
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
      `}</style>

      <Navbar /> {/* Add Navbar here */}
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
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={tempEmail}
              onChange={(event) => setTempEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={tempPassword}
              onChange={(event) => setTempPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              value={tempPassword2}
              onChange={(event) => setTempPassword2(event.target.value)}
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