import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  const toggleDropdown = (index, e) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ ...styles.sidebar, ...(collapsed ? styles.collapsed : {}) }}>
      <div style={styles.header}>
        <button
          style={styles.toggler}
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          ☰
        </button>
      </div>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link
              to="/dashboard"
              style={{
                ...styles.navLink,
                ...(isActive("/dashboard") ? styles.activeLink : {}),
              }}
            >
              🏠 {!collapsed && "Dashboard"}
            </Link>
          </li>
          <li style={styles.navItem}>
            <a
              href="#"
              style={styles.navLink}
              onClick={(e) => toggleDropdown(1, e)}
              aria-expanded={openDropdown === 1}
              aria-label="Toggle Customers dropdown"
            >
              👥 {!collapsed && "Customers"} {openDropdown === 1 ? "▼" : "▶"}
            </a>
            {openDropdown === 1 && (
              <ul style={styles.dropdown}>
                <li>
                  <Link
                    to="/customers/all"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/customers/all") ? styles.activeLink : {}),
                    }}
                  >
                    📋 View All Customers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customers/add"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/customers/add") ? styles.activeLink : {}),
                    }}
                  >
                    ➕ Add New Customer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customers/segments"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/customers/segments") ? styles.activeLink : {}),
                    }}
                  >
                    📊 Customer Segments
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li style={styles.navItem}>
            <a
              href="#"
              style={styles.navLink}
              onClick={(e) => toggleDropdown(2, e)}
              aria-expanded={openDropdown === 2}
              aria-label="Toggle Support dropdown"
            >
              🛠️ {!collapsed && "Support"} {openDropdown === 2 ? "▼" : "▶"}
            </a>
            {openDropdown === 2 && (
              <ul style={styles.dropdown}>
                <li>
                  <Link
                    to="/support/open"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/support/open") ? styles.activeLink : {}),
                    }}
                  >
                    📬 Open Tickets
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support/create"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/support/create") ? styles.activeLink : {}),
                    }}
                  >
                    ➕ Create Ticket
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support/closed"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/support/closed") ? styles.activeLink : {}),
                    }}
                  >
                    ✅ Closed Tickets
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support/escalations"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/support/escalations") ? styles.activeLink : {}),
                    }}
                  >
                    🚨 Escalations
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li style={styles.navItem}>
            <a
              href="#"
              style={styles.navLink}
              onClick={(e) => toggleDropdown(3, e)}
              aria-expanded={openDropdown === 3}
              aria-label="Toggle Billing & Plans dropdown"
            >
              💰 {!collapsed && "Billing & Plans"} {openDropdown === 3 ? "▼" : "▶"}
            </a>
            {openDropdown === 3 && (
              <ul style={styles.dropdown}>
                <li>
                  <Link
                    to="/billing/invoices"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/billing/invoices") ? styles.activeLink : {}),
                    }}
                  >
                    📜 View Invoices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/billing/invoices/pending"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/billing/invoices/pending") ? styles.activeLink : {}),
                    }}
                  >
                    ⏳ Pending Invoices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/billing/invoices/paid"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/billing/invoices/paid") ? styles.activeLink : {}),
                    }}
                  >
                    ✅ Paid Invoices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/billing/create"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/billing/create") ? styles.activeLink : {}),
                    }}
                  >
                    ➕ Create Invoice
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li style={styles.navItem}>
            <a
              href="#"
              style={styles.navLink}
              onClick={(e) => toggleDropdown(4, e)}
              aria-expanded={openDropdown === 4}
              aria-label="Toggle Network Management dropdown"
            >
              🌐 {!collapsed && "Network Management"} {openDropdown === 4 ? "▼" : "▶"}
            </a>
            {openDropdown === 4 && (
              <ul style={styles.dropdown}>
                <li>
                  <Link
                    to="/network/devices"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/network/devices") ? styles.activeLink : {}),
                    }}
                  >
                    📡 All Devices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/network/devices/online"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/network/devices/online") ? styles.activeLink : {}),
                    }}
                  >
                    ✅ Online Devices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/network/devices/offline"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/network/devices/offline") ? styles.activeLink : {}),
                    }}
                  >
                    ❌ Offline Devices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/network/create"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/network/create") ? styles.activeLink : {}),
                    }}
                  >
                    ➕ Add Device
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li style={styles.navItem}>
            <a
              href="#"
              style={styles.navLink}
              onClick={(e) => toggleDropdown(5, e)}
              aria-expanded={openDropdown === 5}
              aria-label="Toggle Reports & Analytics dropdown"
            >
              📊 {!collapsed && "Reports & Analytics"} {openDropdown === 5 ? "▼" : "▶"}
            </a>
            {openDropdown === 5 && (
              <ul style={styles.dropdown}>
                <li>
                  <Link
                    to="/reports/customers"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/reports/customers") ? styles.activeLink : {}),
                    }}
                  >
                    👥 Customer Reports
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reports/revenue"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/reports/revenue") ? styles.activeLink : {}),
                    }}
                  >
                    💰 Revenue Reports
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reports/network"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/reports/network") ? styles.activeLink : {}),
                    }}
                  >
                    🌐 Network Reports
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li style={styles.navItem}>
            <a
              href="#"
              style={styles.navLink}
              onClick={(e) => toggleDropdown(6, e)}
              aria-expanded={openDropdown === 6}
              aria-label="Toggle Settings dropdown"
            >
              ⚙️ {!collapsed && "Settings"} {openDropdown === 6 ? "▼" : "▶"}
            </a>
            {openDropdown === 6 && (
              <ul style={styles.dropdown}>
                <li>
                  <Link
                    to="/settings/users"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/settings/users") ? styles.activeLink : {}),
                    }}
                  >
                    👤 User Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings/config"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/settings/config") ? styles.activeLink : {}),
                    }}
                  >
                    🛠️ System Configuration
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings/notifications"
                    style={{
                      ...styles.dropdownLink,
                      ...(isActive("/settings/notifications") ? styles.activeLink : {}),
                    }}
                  >
                    🔔 Notifications
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "white",
    color: "black",
    transition: "width 0.3s ease",
    padding: "10px",
    overflowX: "hidden",
    position: "fixed",
    top: 0,
    left: 0,
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  },
  collapsed: {
    width: "60px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
  },
  toggler: {
    background: "none",
    border: "none",
    color: "black",
    fontSize: "24px",
    cursor: "pointer",
    transition: "color 0.3s",
  },
  nav: {
    marginTop: "20px",
  },
  navList: {
    listStyle: "none",
    padding: 0,
  },
  navItem: {
    marginBottom: "5px",
  },
  navLink: {
    textDecoration: "none",
    color: "black",
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderRadius: "5px",
    transition: "background 0.3s, color 0.3s",
    fontSize: "16px",
  },
  activeLink: {
    backgroundColor: "#E9ECEF",
    color: "#007BFF",
    fontWeight: "bold",
  },
  dropdown: {
    listStyle: "none",
    padding: 0,
    marginLeft: "20px",
  },
  dropdownLink: {
    textDecoration: "none",
    color: "black",
    display: "block",
    padding: "10px",
    fontSize: "14px",
    transition: "background 0.3s, color 0.3s",
  },
};

export default Sidebar;