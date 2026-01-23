import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import StudentInfo from "./components/StudentInfo";
import SkillsRatings from "./components/SkillsRatings";
import PlacementPrediction from "./components/PlacementPrediction";
import DocumentUpload from "./components/DocumentUpload";
import Comparison from "./components/Comparison";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showComparison, setShowComparison] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: "", proficiency: 70, certified: false });
  const [editFormData, setEditFormData] = useState({});
  const [professionalLinks, setProfessionalLinks] = useState([
    { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe", icon: "💼" },
    { platform: "Portfolio", url: "https://johndoe.com", icon: "🌐" },
  ]);

  // Get student data from localStorage or use defaults
  const getStoredStudentData = () => {
    const storedData = localStorage.getItem("studentData");
    const userEmail = localStorage.getItem("userEmail");
    const username = localStorage.getItem("username");
    
    if (storedData) {
      const parsed = JSON.parse(storedData);
      return {
        id: "STU" + Math.random().toString().slice(2, 6).padStart(4, '0'),
        name: parsed.name || username || "Student",
        email: parsed.email || userEmail || "student@university.edu",
        phone: "+1 234-567-8900",
        department: "Computer Science",
        year: 4,
        cgpa: 8.5,
        avatar: "👨‍🎓",
        resumeUploaded: true,
        predictedPlacement: 85,
        placementStatus: "high",
        lastPredictionDate: parsed.joinDate || new Date().toISOString().split('T')[0],
      };
    }
    
    return {
      id: "STU001",
      name: username || "John Doe",
      email: userEmail || "john.doe@university.edu",
      phone: "+1 234-567-8900",
      department: "Computer Science",
      year: 4,
      cgpa: 8.5,
      avatar: "👨‍🎓",
      resumeUploaded: true,
      predictedPlacement: 85,
      placementStatus: "high",
      lastPredictionDate: "2026-01-20",
    };
  };

  // Sample student data
  const [studentData, setStudentData] = useState(getStoredStudentData());

  // Load student profile from backend on mount
  useEffect(() => {
    const loadStudentProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:8080/api/student/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setStudentData(data.data);
            localStorage.setItem("studentData", JSON.stringify(data.data));
            
            // Load professional links from backend if available
            if (data.data.professionalLinks) {
              try {
                const links = JSON.parse(data.data.professionalLinks);
                setProfessionalLinks(links);
              } catch (e) {
                console.log("Could not parse professional links");
              }
            }
          }
        }
      } catch (err) {
        console.log("Using local student data");
      }
    };

    loadStudentProfile();
  }, []);

  const [skillsData, setSkillsData] = useState([
    { name: "Python", proficiency: 80, certified: true },
    { name: "Java", proficiency: 70, certified: true },
    { name: "React", proficiency: 75, certified: false },
    { name: "SQL", proficiency: 85, certified: true },
    { name: "JavaScript", proficiency: 90, certified: true },
    { name: "AWS", proficiency: 65, certified: false },
  ]);

  const [softSkills, setSoftSkills] = useState({
    communication: 4.5,
    teamwork: 4.2,
    problemSolving: 4.8,
    leadership: 4.0,
    adaptability: 4.3,
  });

  const [documents, setDocuments] = useState([
    { name: "Resume.pdf", type: "resume", status: "verified", date: "2026-01-15" },
    { name: "Python-Certification.pdf", type: "certificate", status: "verified", date: "2025-12-10" },
    { name: "AWS-Certificate.pdf", type: "certificate", status: "pending", date: "2026-01-18" },
    { name: "Internship-Letter.pdf", type: "internship", status: "verified", date: "2025-11-20" },
  ]);

  const [codingProfiles, setCodingProfiles] = useState({
    github: "https://github.com/johndoe",
    codeforces: "https://codeforces.com/profile/johndoe",
    leetcode: "https://leetcode.com/johndoe",
  });

  const [predictionHistory, setPredictionHistory] = useState([
    { date: "2026-01-20", probability: 85, status: "high" },
    { date: "2026-01-13", probability: 82, status: "high" },
    { date: "2026-01-06", probability: 78, status: "medium" },
    { date: "2025-12-30", probability: 75, status: "medium" },
  ]);

  // Handler functions
  const handleEditStudent = () => {
    setEditFormData({ ...studentData });
    setShowEditModal(true);
  };

  const handleSaveStudent = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Authentication error. Please login again.");
        return;
      }

      // Prepare data without fields that shouldn't be sent
      const dataToSend = {
        name: editFormData.name,
        email: editFormData.email,
        phone: editFormData.phone,
        department: editFormData.department,
        year: editFormData.year,
        cgpa: editFormData.cgpa,
        dsaRating: editFormData.dsaRating,
        projects: editFormData.projects,
        internship: editFormData.internship,
        attendance: editFormData.attendance,
        aptitude: editFormData.aptitude,
        professionalLinks: JSON.stringify(professionalLinks)
      };

      const response = await fetch("http://localhost:8080/api/student/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();
      
      if (response.ok) {
        if (data.success) {
          setStudentData(data.data);
          localStorage.setItem("studentData", JSON.stringify(data.data));
          setShowEditModal(false);
          alert("✓ Profile updated successfully!");
        } else {
          alert("Error: " + data.message);
        }
      } else {
        console.error("Backend error:", data);
        alert("Failed to update profile: " + (data.message || "Please try again."));
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Error updating profile: " + err.message);
    }
  };

  const handleAddSkill = (skillData) => {
    setSkillsData([...skillsData, skillData]);
    setShowAddSkillModal(false);
    setNewSkill({ name: "", proficiency: 70, certified: false });
  };

  const handleRemoveSkill = (index) => {
    setSkillsData(skillsData.filter((_, i) => i !== index));
  };

  const handleUpdateSoftSkill = (skill, value) => {
    setSoftSkills({ ...softSkills, [skill]: value });
  };

  const handleRemoveDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleAddDocument = (doc) => {
    setDocuments([...documents, doc]);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }
  };

  const handleNotificationClick = () => {
    alert("📬 You have " + notifications + " notifications:\n\n1. Resume verification pending\n2. AWS certificate uploaded\n3. Low proficiency in JavaScript");
    setNotifications(0);
  };

  // Calculate prediction based on all factors
  const calculatePrediction = () => {
    setIsCalculating(true);

    // Simulate prediction calculation
    setTimeout(() => {
      // Calculate based on multiple factors
      const avgSkillProficiency = skillsData.reduce((sum, s) => sum + s.proficiency, 0) / skillsData.length;
      const avgSoftSkillRating = Object.values(softSkills).reduce((a, b) => a + b, 0) / Object.values(softSkills).length;
      const certificationScore = (documents.filter(d => d.status === "verified").length / documents.length) * 100;
      const resumeBonus = studentData.resumeUploaded ? 10 : 0;
      const cgpaScore = (studentData.cgpa / 10) * 100;
      
      // Weighted calculation
      const prediction = Math.round(
        (avgSkillProficiency * 0.35) +
        (avgSoftSkillRating * 10 * 0.25) +
        (certificationScore * 0.15) +
        (cgpaScore * 0.15) +
        resumeBonus
      );

      const placementStatus = prediction >= 75 ? "high" : prediction >= 50 ? "medium" : "low";

      const newPrediction = {
        date: new Date().toLocaleDateString("en-US"),
        probability: Math.min(prediction, 100),
        status: placementStatus,
        factors: {
          avgSkillProficiency: avgSkillProficiency.toFixed(1),
          avgSoftSkillRating: avgSoftSkillRating.toFixed(1),
          certificationScore: certificationScore.toFixed(1),
          cgpaScore: cgpaScore.toFixed(1),
        },
      };

      setPredictionResult(newPrediction);
      
      // Update main prediction
      setStudentData(prev => ({
        ...prev,
        predictedPlacement: newPrediction.probability,
        placementStatus: newPrediction.status,
        lastPredictionDate: newPrediction.date,
      }));

      // Add to history
      setPredictionHistory(prev => [newPrediction, ...prev]);

      setIsCalculating(false);
    }, 2000);
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowComparison={setShowComparison}
        onLogout={handleLogout}
      />
      <div className="dashboard-main">
        <TopNav
          notifications={notifications}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCompare={() => setShowComparison(!showComparison)}
          onNotificationClick={handleNotificationClick}
        />

        <div className="dashboard-content">
          {showComparison ? (
            <Comparison studentData={studentData} />
          ) : activeTab === "overview" ? (
            <>
              <div className="dashboard-grid">
                {/* Left Column */}
                <div className="left-column">
                  <StudentInfo
                    studentData={studentData}
                    onEdit={handleEditStudent}
                    onPredictClick={calculatePrediction}
                    isCalculating={isCalculating}
                    professionalLinks={professionalLinks}
                    setProfessionalLinks={setProfessionalLinks}
                  />

                  <SkillsRatings
                    skillsData={skillsData}
                    softSkills={softSkills}
                    codingProfiles={codingProfiles}
                    onAddSkill={() => setShowAddSkillModal(true)}
                    onRemoveSkill={handleRemoveSkill}
                    onUpdateSoftSkill={handleUpdateSoftSkill}
                  />
                </div>

                {/* Right Column */}
                <div className="right-column">
                  <PlacementPrediction
                    studentData={studentData}
                    predictionHistory={predictionHistory}
                    skillsData={skillsData}
                    softSkills={softSkills}
                    documents={documents}
                    onPredictClick={calculatePrediction}
                    isCalculating={isCalculating}
                    predictionResult={predictionResult}
                  />

                  <DocumentUpload
                    documents={documents}
                    onRemoveDocument={handleRemoveDocument}
                    onAddDocument={handleAddDocument}
                  />
                </div>
              </div>
            </>
          ) : activeTab === "analytics" ? (
            <div className="analytics-section">
              <h2>📊 Analytics & Insights</h2>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>Skill Growth Trend</h3>
                  <div className="analytics-content">
                    <p>Average Proficiency: <strong>77.5%</strong></p>
                    <div className="trend-badge positive">↑ +5% from last month</div>
                    <div className="analytics-stats">
                      <div className="stat">
                        <span className="stat-label">Total Skills</span>
                        <span className="stat-value">{skillsData.length}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Certified</span>
                        <span className="stat-value">{skillsData.filter(s => s.certified).length}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="analytics-card">
                  <h3>Placement Confidence</h3>
                  <div className="analytics-content">
                    <p>Current Score: <strong>{studentData.predictedPlacement}%</strong></p>
                    <div className="confidence-meter">
                      <div className="confidence-fill" style={{ width: `${studentData.predictedPlacement}%` }}></div>
                    </div>
                    <p className="confidence-text">Above average for your year</p>
                  </div>
                </div>
                <div className="analytics-card">
                  <h3>Document Status</h3>
                  <div className="analytics-content">
                    <p>Upload Completion: <strong>{Math.round((documents.length / 5) * 100)}%</strong></p>
                    <div className="document-stats">
                      <div className="doc-stat">
                        <span className="stat-label">Verified</span>
                        <span className="stat-value">{documents.filter(d => d.status === "verified").length}</span>
                      </div>
                      <div className="doc-stat">
                        <span className="stat-label">Pending</span>
                        <span className="stat-value">{documents.filter(d => d.status === "pending").length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "history" ? (
            <div className="history-section">
              <h2>📅 Prediction History</h2>
              <div className="history-controls">
                <button className="btn btn-primary">Generate Report</button>
                <button className="btn btn-secondary">Export CSV</button>
              </div>
              <div className="history-list">
                {predictionHistory.map((record, idx) => (
                  <div key={idx} className="history-item">
                    <div className="history-date">{record.date}</div>
                    <div className="history-probability">
                      <div className="prob-bar">
                        <div
                          className="prob-fill"
                          style={{
                            width: `${record.probability}%`,
                            background: record.status === "high" ? "#34A853" : record.status === "medium" ? "#f9d342" : "#EA4335",
                          }}
                        ></div>
                      </div>
                      <span>{record.probability}%</span>
                    </div>
                    <div className={`status-badge status-${record.status}`}>{record.status}</div>
                    <button className="btn btn-small btn-secondary">View Details</button>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === "settings" ? (
            <div className="settings-section">
              <h2>⚙️ Settings & Preferences</h2>
              <div className="settings-grid">
                <div className="settings-card">
                  <h3>Account Settings</h3>
                  <div className="setting-item">
                    <label>Email Notifications</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <label>Monthly Report Digest</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <label>Profile Visibility</label>
                    <select defaultValue="public">
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>
                  <button className="btn btn-primary">Save Settings</button>
                </div>

                <div className="settings-card">
                  <h3>Account Management</h3>
                  <button className="btn btn-secondary">Edit Profile</button>
                  <button className="btn btn-secondary">Change Password</button>
                  <button className="btn btn-secondary">Download Data</button>
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Edit Student Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Student Information</h2>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={editFormData.name || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editFormData.email || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="form-input"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={editFormData.phone || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={editFormData.department || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  value={editFormData.year || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, year: parseInt(e.target.value) })}
                  className="form-input"
                  min="1"
                  max="4"
                />
              </div>
              <div className="form-group">
                <label>CGPA</label>
                <input
                  type="number"
                  value={editFormData.cgpa || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, cgpa: parseFloat(e.target.value) })}
                  step="0.1"
                  max="10"
                  className="form-input"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveStudent}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div className="modal-overlay" onClick={() => setShowAddSkillModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Skill</h2>
              <button className="close-btn" onClick={() => setShowAddSkillModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g., Python, React, Docker"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Proficiency Level: {newSkill.proficiency}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill.proficiency}
                  onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
                  className="form-range"
                />
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="certified"
                  checked={newSkill.certified}
                  onChange={(e) => setNewSkill({ ...newSkill, certified: e.target.checked })}
                />
                <label htmlFor="certified">Mark as Certified</label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddSkillModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                if (newSkill.name) {
                  handleAddSkill(newSkill);
                  alert("✓ Skill added successfully!");
                } else {
                  alert("❌ Please enter a skill name");
                }
              }}>Add Skill</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
