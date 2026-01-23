import React, { useState } from "react";

export default function SkillsRatings({
  skillsData,
  softSkills,
  codingProfiles,
  onAddSkill,
  onRemoveSkill,
  onUpdateSoftSkill,
}) {
  const [editingSoftSkill, setEditingSoftSkill] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);

  const StarRating = ({ rating, skill, onEdit }) => (
    <div className="star-rating" onClick={() => {
      setEditingSoftSkill(skill);
      setRatingValue(rating);
    }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "star filled" : "star"}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setRatingValue(star);
            onUpdateSoftSkill(skill, star);
            setEditingSoftSkill(null);
          }}
        >
          ★
        </span>
      ))}
      <span className="rating-text">({rating.toFixed(1)})</span>
    </div>
  );

  const getProficiencyColor = (proficiency) => {
    if (proficiency >= 80) return "#667eea";
    if (proficiency >= 60) return "#764ba2";
    return "#f9d342";
  };

  return (
    <div className="info-card skills-card">
      <div className="card-header">
        <h2>Skills & Ratings</h2>
        <button className="btn btn-small btn-primary" onClick={onAddSkill}>
          + Add Skill
        </button>
      </div>

      {/* Technical Skills */}
      <div className="skills-section">
        <h3 className="section-title">Technical Skills</h3>
        <div className="skills-list">
          {skillsData.map((skill, idx) => (
            <div key={idx} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">
                  {skill.name}
                  {skill.certified && <span className="certified-badge">✓</span>}
                </span>
                <div className="skill-actions">
                  <span className="skill-percent">{skill.proficiency}%</span>
                  <button
                    className="icon-btn"
                    onClick={() => {
                      if (window.confirm(`Remove ${skill.name}?`)) {
                        onRemoveSkill(idx);
                      }
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-fill"
                  style={{
                    width: `${skill.proficiency}%`,
                    background: getProficiencyColor(skill.proficiency),
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="skills-section">
        <h3 className="section-title">Soft Skills (Click to Edit)</h3>
        <div className="soft-skills-list">
          {Object.entries(softSkills).map(([skill, rating]) => (
            <div key={skill} className="soft-skill-item">
              <span className="soft-skill-name">
                {skill.charAt(0).toUpperCase() + skill.slice(1).replace(/([A-Z])/g, " $1")}
              </span>
              <StarRating
                rating={rating}
                skill={skill}
                onEdit={() => {
                  setEditingSoftSkill(skill);
                  setRatingValue(rating);
                }}
              />
            </div>
          ))}
        </div>
        <small className="edit-hint">💡 Click on stars to update ratings</small>
      </div>

      {/* Coding Profiles */}
      <div className="skills-section">
        <h3 className="section-title">Coding Profiles</h3>
        <div className="coding-profiles">
          {codingProfiles.github && (
            <a href={codingProfiles.github} target="_blank" rel="noopener noreferrer" className="profile-link">
              <span className="profile-icon">🐙</span> GitHub
            </a>
          )}
          {codingProfiles.codeforces && (
            <a href={codingProfiles.codeforces} target="_blank" rel="noopener noreferrer" className="profile-link">
              <span className="profile-icon">⚔️</span> Codeforces
            </a>
          )}
          {codingProfiles.leetcode && (
            <a href={codingProfiles.leetcode} target="_blank" rel="noopener noreferrer" className="profile-link">
              <span className="profile-icon">💻</span> LeetCode
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
