import React, { useState } from "react";

export default function DocumentUpload({ documents, onRemoveDocument, onAddDocument }) {
  const [dragActive, setDragActive] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [showResumeForm, setShowResumeForm] = useState(false);
  const [newCert, setNewCert] = useState({ name: "", file: null });
  const [newResume, setNewResume] = useState({ name: "", file: null });
  const fileInputRef = React.useRef(null);

  const getDocIcon = (type) => {
    switch (type) {
      case "resume":
        return "📄";
      case "certificate":
        return "🎓";
      case "internship":
        return "💼";
      default:
        return "📎";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "#34A853";
      case "pending":
        return "#f9d342";
      case "missing":
        return "#EA4335";
      default:
        return "#667eea";
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const newDoc = {
        name: file.name,
        type: "certificate",
        status: "pending",
        date: new Date().toISOString().split('T')[0],
      };
      onAddDocument(newDoc);
    }
  };

  const handleAddCertificate = () => {
    if (newCert.name.trim()) {
      const cert = {
        name: newCert.name + ".pdf",
        type: "certificate",
        status: "pending",
        date: new Date().toISOString().split('T')[0],
      };
      onAddDocument(cert);
      setNewCert({ name: "", file: null });
      setShowCertForm(false);
    }
  };

  const handleAddResume = () => {
    if (newResume.name.trim()) {
      const resume = {
        name: newResume.name + ".pdf",
        type: "resume",
        status: "pending",
        date: new Date().toISOString().split('T')[0],
      };
      onAddDocument(resume);
      setNewResume({ name: "", file: null });
      setShowResumeForm(false);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const newDoc = {
        name: file.name,
        type: "certificate",
        status: "pending",
        date: new Date().toISOString().split('T')[0],
      };
      onAddDocument(newDoc);
    }
  };

  return (
    <div className="info-card documents-card">
      <div className="card-header">
        <h2>Documents & Certificates</h2>
        <div className="header-buttons">
          {!showCertForm && (
            <button
              className="btn btn-small btn-secondary"
              onClick={() => setShowCertForm(true)}
            >
              + Certificate
            </button>
          )}
          {!showResumeForm && (
            <button
              className="btn btn-small btn-secondary"
              onClick={() => setShowResumeForm(true)}
            >
              + Resume
            </button>
          )}
        </div>
      </div>

      {/* Add Certificate Form */}
      {showCertForm && (
        <div className="upload-form-container">
          <div className="upload-form">
            <h3>Add Certificate</h3>
            <input
              type="text"
              placeholder="Certificate name (e.g., AWS Solutions Architect)"
              value={newCert.name}
              onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
              className="form-input"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            <div className="form-actions">
              <button
                className="btn btn-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </button>
              <button className="btn btn-primary" onClick={handleAddCertificate}>
                Add Certificate
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowCertForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Resume Form */}
      {showResumeForm && (
        <div className="upload-form-container">
          <div className="upload-form">
            <h3>Add Resume</h3>
            <input
              type="text"
              placeholder="Resume name"
              value={newResume.name}
              onChange={(e) => setNewResume({ ...newResume, name: e.target.value })}
              className="form-input"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            <div className="form-actions">
              <button
                className="btn btn-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </button>
              <button className="btn btn-primary" onClick={handleAddResume}>
                Add Resume
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowResumeForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`upload-area ${dragActive ? "active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <span className="upload-icon">📤</span>
          <p className="upload-text">Drag & drop files here</p>
          <span className="upload-subtext">or click to browse</span>
        </div>
      </div>

      {/* Documents List */}
      <div className="documents-list">
        <h3 className="section-title">Uploaded Documents</h3>
        {documents.length > 0 ? (
          documents.map((doc, idx) => (
            <div key={idx} className="document-item">
              <div className="doc-info">
                <span className="doc-icon">{getDocIcon(doc.type)}</span>
                <div className="doc-details">
                  <span className="doc-name">{doc.name}</span>
                  <span className="doc-date">{doc.date}</span>
                </div>
              </div>
              <div className="doc-status">
                <span
                  className="status-indicator"
                  style={{ background: getStatusColor(doc.status) }}
                ></span>
                <span className="status-text">{doc.status}</span>
              </div>
              <div className="doc-actions">
                <button className="icon-btn">👁️</button>
                <button className="icon-btn" onClick={() => onRemoveDocument(idx)}>
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>No documents uploaded yet</p>
          </div>
        )}
      </div>

      {/* Document Requirements */}
      <div className="document-requirements">
        <h3 className="section-title">Requirements</h3>
        <div className="requirements-list">
          <div className="requirement-item">
            <span className="req-status">✓</span>
            <span className="req-text">Resume (Required)</span>
          </div>
          <div className="requirement-item">
            <span className="req-status">✓</span>
            <span className="req-text">Technical Certificates (Recommended)</span>
          </div>
          <div className="requirement-item">
            <span className="req-status">-</span>
            <span className="req-text">Internship Letters (Optional)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
