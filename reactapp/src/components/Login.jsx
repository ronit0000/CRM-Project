import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import InputField from "./InputField";
import Navbar from "./Navbar"; // Import the Navbar component
import ForgotPasswordModal from "./ForgotPasswordModal"; // Import the ForgotPasswordModal component
import logo from "./LogoBg.png"; // Import your logo
import handshake from "./handshake.mp4"; // Import the video

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  // Function to open the forgot password modal
  const openForgotPasswordModal = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setShowForgotPasswordModal(true);
  };

  // Function to close the forgot password modal
  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
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

        .login-container {
          margin: 0 auto;
          max-width: 410px;
          padding: 2rem 1.5rem;
          border-radius: 0.5rem;
          background: #fff; /* Solid background to exclude video */
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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

        .logo-container {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .logo-container img {
          height: 60px; /* Adjust size as needed */
          max-width: 100%;
        }

        .form-title {
          text-align: center;
          font-size: 1.37rem;
          font-weight: 600;
          margin-bottom: 1.87rem;
        }

        .social-login {
          display: flex;
          gap: 1.31rem;
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

        .input-wrapper {
          height: 54px;
          width: 100%;
          position: relative;
          margin-bottom: 1.5rem;
        }

        .input-field {
          width: 100%;
          height: 100%;
          font-size: 1.06rem;
          border-radius: 0.31rem;
          border: 1px solid #bfb3f2;
          padding: 0px 1.25rem 0 3.12rem;
          transition: 0.2s ease;
        }

        .input-field:focus {
          border-color: #5F41E4;
        }

        .forgot-password-link {
          display: block;
          margin-top: -0.44rem;
          color: #5F41E4;
          text-decoration: none;
        }

        .forgot-password-link:hover {
          text-decoration: underline;
        }

        .login-button {
          border: none;
          width: 100%;
          height: 54px;
          color: #fff;
          font-size: 1.125rem;
          font-weight: 500;
          cursor: pointer;
          margin-top: 2.19rem;
          border-radius: 0.31rem;
          background: #5F41E4;
          transition: 0.3s ease;
        }

        .login-button:hover {
          background: #4320df;
        }

        .signup-prompt {
          text-align: center;
          font-size: 1.06rem;
          font-weight: 500;
          margin-top: 1.75rem;
        }

        .signup-link {
          color: #5F41E4;
          font-weight: 500;
          text-decoration: none;
        }

        .signup-link:hover {
          text-decoration: underline;
        }

        .icon {
          position: absolute;
          top: 50%;
          left: 1rem;
          transform: translateY(-50%);
        }

        .eye-icon {
          position: absolute;
          top: 50%;
          right: 1rem;
          cursor: pointer;
          transform: translateY(-50%);
        }
      `}</style>

      <Navbar /> {/* Navbar already included */}
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={handshake} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="login-container">
        {/* Add Logo Above the Form */}
        <div className="logo-container">
          <img src={logo} alt="Your Logo" />
        </div>
        <h2 className="form-title">Log in with</h2>
        <SocialLogin />

        <p className="separator"><span>or</span></p>

        <form onSubmit={handleLogin} className="login-form">
          {/* Email Field */}
          <div className="input-wrapper">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="Email address"
              className="input-field"
            />
          </div>

          {/* Password Field */}
          <div className="input-wrapper">
            <span className="icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? "👁" : "👁‍🗨"}
            </span>
          </div>

          <a href="#" className="forgot-password-link" onClick={openForgotPasswordModal}>Forgot password?</a>
          <button type="submit" className="login-button">Log In</button>
        </form>

        <p className="signup-prompt">
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign up
          </a>
        </p>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal show={showForgotPasswordModal} onClose={closeForgotPasswordModal} />
    </>
  );
};

export default Login;