import React, { useState } from "react";

export default function TopNav({
  notifications,
  searchQuery,
  setSearchQuery,
  onCompare,
  onNotificationClick,
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="dashboard-topnav">
      <div className="topnav-left">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search students, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="topnav-right">
        <button className="topnav-btn compare-btn" onClick={onCompare}>
          <span className="btn-icon">⚖️</span>
          Compare
        </button>

        <button
          className="topnav-btn notification-btn"
          onClick={onNotificationClick}
        >
          <span className="btn-icon">🔔</span>
          {notifications > 0 && <span className="notification-badge">{notifications}</span>}
        </button>

        <div className="user-profile-dropdown">
          <button
            className="profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <span>👤</span>
            <span className="dropdown-arrow">▼</span>
          </button>
          {showProfileMenu && (
            <div className="profile-menu">
              <a href="#profile" onClick={() => {
                alert("👤 Profile: John Doe\nStudent ID: STU001\nDepartment: Computer Science");
                setShowProfileMenu(false);
              }}>My Profile</a>
              <a href="#settings" onClick={() => {
                alert("⚙️ Settings page loaded");
                setShowProfileMenu(false);
              }}>Settings</a>
              <a href="#logout" onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  window.location.href = "/";
                }
              }}>Logout</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
