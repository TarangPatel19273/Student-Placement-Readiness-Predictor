import React, { useState, useEffect } from "react";

export default function StudentInfo({ studentData, onEdit, onPredictClick, isCalculating, professionalLinks, setProfessionalLinks }) {
  const [showAddLink, setShowAddLink] = useState(false);
  const [newLink, setNewLink] = useState({ platform: "LinkedIn", url: "" });
  const [links, setLinks] = useState([]);

  // Initialize links from props
  useEffect(() => {
    if (professionalLinks && Array.isArray(professionalLinks)) {
      setLinks(professionalLinks);
    }
  }, [professionalLinks]);

  // Update parent component when links change
  useEffect(() => {
    if (setProfessionalLinks && links.length > 0) {
      setProfessionalLinks(links);
    }
  }, [links, setProfessionalLinks]);

  const handleAddLink = () => {
    if (newLink.url.trim()) {
      const updatedLinks = [...links, { ...newLink, icon: "🔗" }];
      setLinks(updatedLinks);
      if (setProfessionalLinks) {
        setProfessionalLinks(updatedLinks);
      }
      setNewLink({ platform: "LinkedIn", url: "" });
      setShowAddLink(false);
    }
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    if (setProfessionalLinks) {
      setProfessionalLinks(updatedLinks);
    }
  };

  return (
    <div className="info-card student-info-card">
      <div className="card-header">
        <h2>Student Information</h2>
        <button className="btn btn-small btn-primary" onClick={onEdit}>
          ✏️ Edit
        </button>
      </div>

      <div className="student-details-section">
        <div className="detail-row">
          <span className="label">Name:</span>
          <span className="value">{studentData.name}</span>
        </div>
        <div className="detail-row">
          <span className="label">Student ID:</span>
          <span className="value">{studentData.id}</span>
        </div>
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="value">{studentData.email}</span>
        </div>
        <div className="detail-row">
          <span className="label">Phone:</span>
          <span className="value">{studentData.phone}</span>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Department</span>
          <span className="info-value">{studentData.department}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Year</span>
          <span className="info-value">Year {studentData.year}</span>
        </div>
        <div className="info-item">
          <span className="info-label">CGPA</span>
          <span className="info-value">{studentData.cgpa}/10</span>
        </div>
        <div className="info-item">
          <span className="info-label">Last Updated</span>
          <span className="info-value">2026-01-20</span>
        </div>
      </div>

      {/* Professional Links Section */}
      <div className="links-section">
        <h3>Professional Links</h3>
        
        <div className="links-list">
          {links.map((link, idx) => (
            <div key={idx} className="link-item">
              <div className="link-item-content">
                <span className="link-icon">{link.icon}</span>
                <div className="link-info">
                  <span className="link-platform">{link.platform}</span>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-url">
                    {link.url}
                  </a>
                </div>
              </div>
              <button
                className="link-remove-btn"
                onClick={() => handleRemoveLink(idx)}
                title="Remove link"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add Link Form */}
        {showAddLink ? (
          <div className="add-link-form">
            <input
              type="text"
              placeholder="Platform name (e.g., LinkedIn, Twitter)"
              value={newLink.platform}
              onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
            />
            <input
              type="url"
              placeholder="Enter full URL (e.g., https://..."
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            />
            <div className="add-link-form-actions">
              <button className="btn-save" onClick={handleAddLink}>
                Save
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowAddLink(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            className="toggle-add-link"
            onClick={() => setShowAddLink(true)}
          >
            + Add Link
          </button>
        )}
      </div>

      {/* Prediction Button */}
      <button
        className="btn btn-predict-main"
        onClick={onPredictClick}
        disabled={isCalculating}
      >
        {isCalculating ? (
          <>
            <span className="calculating-spinner">⌛</span>
            Calculating...
          </>
        ) : (
          <>
            <span className="predict-icon">🎯</span>
            Generate Prediction
          </>
        )}
      </button>
    </div>
  );
}
