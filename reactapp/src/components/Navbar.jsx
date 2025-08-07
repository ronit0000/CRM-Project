import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./LogoBg.png"; // Import your logo

const Navbar = () => {
  const location = useLocation(); // To determine the current page
  const navigate = useNavigate(); // To navigate programmatically

  // Handle Contact link click
  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // If already on the landing page, scroll to the contact section
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page, navigate to the landing page and scroll to the contact section
      navigate("/");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Small delay to ensure the page loads before scrolling
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap');

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: rgb(255, 255, 255); /* White background */
          color: rgb(0, 0, 0);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
        }

        .navbar-brand img {
          height: 80px; /* Adjust size to match Landing.jsx */
          max-width: 100%;
        }

        .navbar-links {
          display: flex;
          gap: 1.5rem;
          align-items: center; /* Ensure vertical alignment of all items */
        }

        .nav-link {
          font-size: 1rem;
          font-weight: 500;
          font-family: "Montserrat", sans-serif;
          color: #333; /* Match the color from Landing.jsx */
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .nav-link:hover {
          background-color: #f0f0f0; /* Light gray on hover */
        }

        .nav-link.active {
          font-weight: 700;
          background-color: #e0e0e0; /* Slightly darker gray for active */
        }

        /* More specific selector for buttons to avoid interference */
        .navbar .navbar-links .signup-btn,
        .navbar .navbar-links .login-btn {
          padding: 8px 15px; /* Adjusted padding for better vertical fit */
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem; /* Fixed font size */
          font-weight: 500;
          font-family: "Montserrat", sans-serif;
          text-decoration: none;
          display: inline-block;
          line-height: 1.2; /* Adjusted line height for better text centering */
          box-sizing: border-box; /* Ensure padding doesn't affect size */
          width: 120px; /* Increased width to prevent wrapping */
          height: 40px; /* Fixed height for consistency */
          text-align: center; /* Center text */
          white-space: nowrap; /* Prevent text wrapping */
          vertical-align: middle; /* Ensure proper vertical alignment */
        }

        .navbar .navbar-links .signup-btn:hover,
        .navbar .navbar-links .login-btn:hover {
          background-color: #333; /* Darker shade on hover */
        }

        @media (max-width: 768px) {
          .navbar-links {
            flex-direction: column;
            position: absolute;
            top: 60px;
            right: 0;
            background-color: #fff; /* Match the navbar background */
            width: 200px;
            padding: 1rem;
            display: none; /* Hidden by default on mobile */
          }

          .navbar-links.active {
            display: flex; /* Show when toggled */
          }

          .navbar-toggle {
            display: block;
            background: none;
            border: none;
            color: #333;
            font-size: 1.5rem;
            cursor: pointer;
          }

          .navbar .navbar-links .signup-btn,
          .navbar .navbar-links .login-btn {
            width: 100%; /* Full width in mobile view */
            height: 40px; /* Keep height consistent */
            padding: 8px 15px; /* Consistent padding */
            text-align: center;
          }
        }

        @media (min-width: 769px) {
          .navbar-toggle {
            display: none; /* Hide toggle on desktop */
          }
        }
      `}</style>

      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Your Logo" />
        </Link>
        <div className="navbar-links">
          <a href="#workspaces" className="nav-link">
            Pricing
          </a>
          <a href="#solutions" className="nav-link">
            Solutions
          </a>
          <a href="#contact" className="nav-link" onClick={handleContactClick}>
            Contact
          </a>
          <Link
            to="/signup"
            className={`signup-btn ${location.pathname === "/signup" ? "active" : ""}`}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className={`login-btn ${location.pathname === "/login" ? "active" : ""}`}
          >
            Login
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;