import React from "react";

export default function Sidebar({ activeTab, setActiveTab, setShowComparison, onLogout }) {
  const navItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "history", label: "History", icon: "📅" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <h2>🎓 Placement Hub</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => {
              setActiveTab(item.id);
              setShowComparison(false);
            }}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="btn btn-logout" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
