import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <Link to="/">🎓 Student Readiness</Link>
    </div>
    <ul className="navbar-links">
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register" className="register-btn">Register</Link></li>
    </ul>
  </nav>
);

export default NavBar;
