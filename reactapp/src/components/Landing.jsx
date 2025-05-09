import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./LogoBg.png";
import contact from "./contact image.avif";
import mysql from "./mysql.jpg";
import nodejs from "./springboot.jpg";
import react from "./react-logo-png-9.png";
import aws from "./aws.png";
import handshake from "./handshake.mp4";

const Landing = () => {
  const location = useLocation(); // To determine the current page
  const navigate = useNavigate(); // To navigate programmatically

  // Handle Contact link click
  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="landing">
      {/* Navbar */}
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

      {/* Hero Section with Video Background */}
      <section className="hero">
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source src={handshake} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="hero-content">
          <h1>Flexible Space to Manage Client</h1>
          <p>Now!,Managing Your Valuable Customer Become Easy.</p>
          <button className="cta-btn">Book a Appointment</button>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="features">
        <h2>Our Solutions</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Client Tracking</h3>
            <p>Easy to track your valuable clients in just one click.</p>
          </div>
          <div className="card">
            <h3>Daily Analysis</h3>
            <p>Daily log of Clients and Analysis Through Visualization</p>
          </div>
          <div className="card">
            <h3>Easy to Track Employees Work</h3>
            <p>Work on-the-go with flexible daily access.</p>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="journey">
        <h2>Our Journey</h2>
        <p>
          Started in 2024, we aimed to revolutionize Management. Today, we’re
          proud to serve thousands of professionals across the globe with
          innovative solutions.
        </p>
      </section>

      {/* Technology Stack Section */}
      <section className="tech-stack">
        <h2>Technology Stack</h2>
        <div className="tech-cards">
          <div className="tech-card">
            <img src={react} alt="React" />
            <p>
              <b>
                <i>React</i>
              </b>
            </p>
          </div>
          <div className="tech-card">
            <img src={nodejs} alt="Node.js" />
            <p>
              <b>
                <i>SpringBoot</i>
              </b>
            </p>
          </div>
          <div className="tech-card">
            <img src={mysql} alt="MongoDB" />
            <p>
              <b>
                <i>MySQL</i>
              </b>
            </p>
          </div>
          <div className="tech-card">
            <img src={aws} alt="AWS" />
            <p>
              <b>
                <i>AWS</i>
              </b>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-us" id="contact">
        <h1>
          <i>
            <b>Contact Us <br /></b>
          </i>
        </h1>
        <div className="contact-container">
          <div className="contact-image">
            <img src={contact} alt="Workspace" />
          </div>
          <div className="contact-form">
            <h2>Got questions? We've got answers.</h2>
            <p>
              Get in touch with us for more information on any of the products
              or services we offer
            </p>
            <form>
              <input type="text" placeholder="Full name*" required />
              <input type="text" placeholder="Company name*" required />
              <input type="email" placeholder="Work e-mail address*" required />
              <input type="tel" placeholder="Phone number*" required />
              <select placeholder="City*" required>
                <option value="">Select City</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
              </select>
              <input type="text" placeholder="Area" />
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
            <p className="disclaimer">
              By clicking the below button, you agree to our Terms of Service
              and confirm that you have read and understood our Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Your Logo" className="logo-img" />
            <p>© 2025 EaseConnect. All rights reserved.</p>
          </div>
          <div className="footer-section">
            <h3>Address</h3>
            <p>KL University, Vijayawada, India</p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: 2300030588cse@gmail.com</p>
            <p>Phone: +91 9861517551</p>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <p>24/7 Helpdesk</p>
            <p>Live Chat</p>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap');

        /* General Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: rgb(255, 255, 255);
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
          height: 80px;
          max-width: 100%;
        }

        .navbar-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .nav-link {
          font-size: 1rem;
          font-weight: 500;
          font-family: "Montserrat", sans-serif;
          color: #333;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .nav-link:hover {
          background-color: #f0f0f0;
        }

        .nav-link.active {
          font-weight: 700;
          background-color: #e0e0e0;
        }

        .navbar .navbar-links .signup-btn,
        .navbar .navbar-links .login-btn {
          padding: 8px 15px;
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          font-family: "Montserrat", sans-serif;
          text-decoration: none;
          display: inline-block;
          line-height: 1.2;
          box-sizing: border-box;
          width: 120px;
          height: 40px;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
        }

        .navbar .navbar-links .signup-btn:hover,
        .navbar .navbar-links .login-btn:hover {
          background-color: #333;
        }

        /* Hero Section with Video Background */
        .hero {
          height: 100vh;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #fff;
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

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero h1 {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .hero p {
          font-size: 20px;
          margin-bottom: 30px;
        }

        .cta-btn {
          padding: 15px 30px;
          background-color: #ff5a5f;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 18px;
          cursor: pointer;
        }

        .cta-btn:hover {
          background-color: #e04e52;
        }

        /* Features Section (Our Solutions) */
        .features {
          padding: 50px;
          text-align: center;
          background-color: #f9f9f9;
        }

        .features h2 {
          font-size: 36px;
          margin-bottom: 40px;
        }

        .feature-cards {
          display: flex;
          justify-content: center;
          gap: 30px;
        }

        .card {
          background-color: #fff;
          padding: 20px;
          width: 300px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .card h3 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .card p {
          font-size: 16px;
          color: #666;
        }

        /* Our Journey Section */
        .journey {
          padding: 50px;
          text-align: center;
          background-color: #fff;
        }

        .journey h2 {
          font-size: 36px;
          margin-bottom: 20px;
        }

        .journey p {
          font-size: 18px;
          max-width: 800px;
          margin: 0 auto;
          color: #666;
        }

        /* Technology Stack Section */
        .tech-stack {
          padding: 50px;
          text-align: center;
          background-color: #f9f9f9;
        }

        .tech-stack h2 {
          font-size: 36px;
          margin-bottom: 40px;
        }

        .tech-cards {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .tech-card {
          width: 150px;
          text-align: center;
        }

        .tech-card img {
          width: 100px;
          height: 100px;
          margin-bottom: 10px;
        }

        .tech-card p {
          font-size: 16px;
          color: #333;
        }

        /* Contact Us Section */
        .contact-us {
          padding: 50px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .contact-us h1 {
          font-size: 36px;
          margin-bottom: 30px;
        }

        .contact-container {
          display: flex;
          max-width: 1200px;
          width: 100%;
        }

        .contact-image img {
          width: 100%;
          height: auto;
          max-height: 600px;
          object-fit: cover;
        }

        .contact-form {
          width: 40%;
          padding: 20px;
          text-align: left;
        }

        .contact-form h2 {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .contact-form p {
          font-size: 16px;
          margin-bottom: 20px;
          color: #666;
        }

        .contact-form form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .contact-form input,
        .contact-form select {
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
        }

        .contact-form input[type="number"] {
          width: 100px;
        }

        .submit-btn {
          padding: 10px 20px;
          background-color: #666;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          width: 100px;
        }

        .submit-btn:hover {
          background-color: #555;
        }

        .disclaimer {
          font-size: 12px;
          color: #666;
          margin-top: 10px;
        }

        /* Footer Section */
        .footer {
          padding: 50px;
          background-color: #ADD8E6;
          color: black;
          text-align: center;
        }

        .footer-content {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-logo img {
          height: 60px;
          max-width: 100%;
          margin-bottom: 10px;
        }

        .footer-logo p {
          font-size: 14px;
        }

        .footer-section h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .footer-section p {
          font-size: 14px;
          margin-bottom: 5px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .navbar-links {
            flex-direction: column;
            position: absolute;
            top: 60px;
            right: 0;
            background-color: #fff;
            width: 200px;
            padding: 1rem;
            display: none;
          }

          .navbar-links.active {
            display: flex;
          }

          .navbar .navbar-links .signup-btn,
          .navbar .navbar-links .login-btn {
            width: 100%;
            height: 40px;
            padding: 8px 15px;
            text-align: center;
          }

          .contact-container {
            flex-direction: column;
            align-items: center;
          }

          .contact-form {
            width: 100%;
          }
        }

        @media (min-width: 769px) {
          .navbar-toggle {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;