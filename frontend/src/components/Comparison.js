import React, { useState } from "react";

export default function Comparison({ studentData }) {
  const [selectedStudents, setSelectedStudents] = useState([studentData]);

  const sampleStudents = [
    {
      id: "STU002",
      name: "Jane Smith",
      cgpa: 8.8,
      predictedPlacement: 92,
      skillCount: 8,
      certificatesCount: 6,
      status: "high",
    },
    {
      id: "STU003",
      name: "Mike Johnson",
      cgpa: 7.5,
      predictedPlacement: 68,
      skillCount: 5,
      certificatesCount: 3,
      status: "medium",
    },
  ];

  const allStudents = [studentData, ...sampleStudents];

  const toggleStudent = (student) => {
    if (
      selectedStudents.find((s) => s.id === student.id)
    ) {
      setSelectedStudents(
        selectedStudents.filter((s) => s.id !== student.id)
      );
    } else if (selectedStudents.length < 3) {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  return (
    <div className="comparison-container">
      <div className="comparison-header">
        <h1>Compare Students</h1>
        <p>Select up to 3 students to compare side by side</p>
      </div>

      {/* Student Selection */}
      <div className="student-selector">
        <h3>Select Students</h3>
        <div className="student-options">
          {allStudents.map((student) => (
            <button
              key={student.id}
              className={`student-option ${
                selectedStudents.find((s) => s.id === student.id)
                  ? "selected"
                  : ""
              }`}
              onClick={() => toggleStudent(student)}
            >
              <span className="option-checkbox">
                {selectedStudents.find((s) => s.id === student.id) ? "✓" : ""}
              </span>
              <span className="option-name">{student.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              {selectedStudents.map((student) => (
                <th key={student.id}>{student.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="metric-label">Student ID</td>
              {selectedStudents.map((student) => (
                <td key={student.id}>{student.id}</td>
              ))}
            </tr>
            <tr>
              <td className="metric-label">CGPA</td>
              {selectedStudents.map((student) => (
                <td key={student.id} className="value-cgpa">
                  {student.cgpa}/10
                </td>
              ))}
            </tr>
            <tr>
              <td className="metric-label">Placement Probability</td>
              {selectedStudents.map((student) => (
                <td key={student.id}>
                  <div className="comparison-bar">
                    <div
                      className="comparison-fill"
                      style={{
                        width: `${(student.predictedPlacement / 100) * 100}%`,
                        background:
                          student.predictedPlacement >= 75
                            ? "#34A853"
                            : student.predictedPlacement >= 50
                            ? "#f9d342"
                            : "#EA4335",
                      }}
                    ></div>
                  </div>
                  <span>{student.predictedPlacement}%</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="metric-label">Skills Count</td>
              {selectedStudents.map((student) => (
                <td key={student.id}>{student.skillCount || 6}</td>
              ))}
            </tr>
            <tr>
              <td className="metric-label">Certificates</td>
              {selectedStudents.map((student) => (
                <td key={student.id}>{student.certificatesCount || 4}</td>
              ))}
            </tr>
            <tr>
              <td className="metric-label">Status</td>
              {selectedStudents.map((student) => (
                <td key={student.id}>
                  <span className={`status-badge status-${student.placementStatus || student.status}`}>
                    {student.placementStatus || student.status}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Insights */}
      <div className="comparison-insights">
        <h3>Insights</h3>
        <div className="insights-list">
          <div className="insight-card">
            <span className="insight-emoji">🎯</span>
            <p>Compare skills, CGPA, and placement probability across students</p>
          </div>
          <div className="insight-card">
            <span className="insight-emoji">📊</span>
            <p>Identify strengths and areas for improvement</p>
          </div>
          <div className="insight-card">
            <span className="insight-emoji">💡</span>
            <p>Make informed decisions based on comprehensive data</p>
          </div>
        </div>
      </div>
    </div>
  );
}
