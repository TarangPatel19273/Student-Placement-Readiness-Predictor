import React from "react";

export default function PlacementPrediction({
  studentData,
  predictionHistory,
  skillsData,
  softSkills,
  documents,
  onPredictClick,
  isCalculating,
  predictionResult,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "high":
        return "#34A853";
      case "medium":
        return "#f9d342";
      case "low":
        return "#EA4335";
      default:
        return "#667eea";
    }
  };

  const getStatusLabel = (probability) => {
    if (probability >= 75) return "High";
    if (probability >= 50) return "Medium";
    return "Low";
  };

  const getMissingSkills = () => {
    return skillsData
      .filter((s) => s.proficiency < 70)
      .map((s) => s.name);
  };

  return (
    <div className="info-card prediction-card">
      <div className="card-header">
        <h2>Placement Prediction</h2>
        <span className={`status-badge status-${studentData.placementStatus}`}>
          {getStatusLabel(studentData.predictedPlacement)}
        </span>
      </div>

      {/* Main Prediction Display */}
      <div className="prediction-display">
        <div className="circular-progress">
          <svg className="progress-ring" viewBox="0 0 200 200">
            <circle
              className="progress-ring-bg"
              cx="100"
              cy="100"
              r="90"
            />
            <circle
              className="progress-ring-fill"
              cx="100"
              cy="100"
              r="90"
              style={{
                stroke: getStatusColor(studentData.placementStatus),
                strokeDashoffset: 565 - (565 * studentData.predictedPlacement) / 100,
              }}
            />
          </svg>
          <div className="progress-label">
            <span className="probability">{studentData.predictedPlacement}%</span>
            <span className="prob-text">Placement Probability</span>
          </div>
        </div>
      </div>

      {/* Prediction Insights */}
      <div className="prediction-insights">
        <div className="insight-item">
          <span className="insight-icon">📅</span>
          <div>
            <span className="insight-label">Last Prediction</span>
            <span className="insight-value">{studentData.lastPredictionDate}</span>
          </div>
        </div>
        <div className="insight-item">
          <span className="insight-icon">📊</span>
          <div>
            <span className="insight-label">Avg. Probability</span>
            <span className="insight-value">
              {(
                predictionHistory.reduce((sum, p) => sum + p.probability, 0) /
                predictionHistory.length
              ).toFixed(1)}
              %
            </span>
          </div>
        </div>
      </div>

      {/* Predict Button */}
      <button
        className="btn btn-predict"
        onClick={onPredictClick}
        disabled={isCalculating}
      >
        {isCalculating ? (
          <>
            <span className="calculating-spinner">⌛</span>
            Calculating Prediction...
          </>
        ) : (
          <>
            <span className="predict-icon">🎯</span>
            Generate Placement Prediction
          </>
        )}
      </button>

      {/* Prediction Result */}
      {predictionResult && (
        <div className="prediction-result-modal">
          <div className="result-header">
            <h3>🎯 Prediction Analysis</h3>
            <span className="result-date">{predictionResult.date}</span>
          </div>

          <div className="result-score">
            <div className="large-probability">
              <span className="score-number">{predictionResult.probability}%</span>
              <span className={`score-label status-${predictionResult.status}`}>
                {predictionResult.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="factors-breakdown">
            <h4>Factors Analysis</h4>
            <div className="factor-item">
              <span className="factor-name">Technical Skills Proficiency</span>
              <div className="factor-bar">
                <div className="factor-fill" style={{ width: `${predictionResult.factors.avgSkillProficiency}%` }}></div>
              </div>
              <span className="factor-value">{predictionResult.factors.avgSkillProficiency}%</span>
            </div>

            <div className="factor-item">
              <span className="factor-name">Soft Skills Rating</span>
              <div className="factor-bar">
                <div className="factor-fill" style={{ width: `${predictionResult.factors.avgSoftSkillRating * 10}%` }}></div>
              </div>
              <span className="factor-value">{predictionResult.factors.avgSoftSkillRating}/5.0</span>
            </div>

            <div className="factor-item">
              <span className="factor-name">Certificate Verification</span>
              <div className="factor-bar">
                <div className="factor-fill" style={{ width: `${predictionResult.factors.certificationScore}%` }}></div>
              </div>
              <span className="factor-value">{predictionResult.factors.certificationScore}%</span>
            </div>

            <div className="factor-item">
              <span className="factor-name">CGPA Score</span>
              <div className="factor-bar">
                <div className="factor-fill" style={{ width: `${predictionResult.factors.cgpaScore}%` }}></div>
              </div>
              <span className="factor-value">{predictionResult.factors.cgpaScore}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Suggested Actions */}
      <div className="suggested-actions">
        <h3 className="section-title">Suggested Actions for Improvement</h3>
        {getMissingSkills().length > 0 ? (
          <div className="actions-list">
            <div className="action-item">
              <span className="action-icon">📚</span>
              <div>
                <span className="action-text">
                  Improve skills: {getMissingSkills().join(", ")}
                </span>
                <span className="action-subtext">Aim for 80%+ proficiency</span>
              </div>
            </div>
            <div className="action-item">
              <span className="action-icon">📜</span>
              <div>
                <span className="action-text">Upload missing certificates</span>
                <span className="action-subtext">Complete certifications for better credibility</span>
              </div>
            </div>
            <div className="action-item">
              <span className="action-icon">🔗</span>
              <div>
                <span className="action-text">Complete GitHub profile</span>
                <span className="action-subtext">Showcase your projects and contributions</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="success-message">
            ✨ Great! Your profile is well-optimized for placements.
          </div>
        )}
      </div>

      {/* Recent Predictions */}
      <div className="recent-predictions">
        <h3 className="section-title">Recent Predictions</h3>
        <div className="predictions-mini-list">
          {predictionHistory.slice(0, 3).map((record, idx) => (
            <div key={idx} className="mini-prediction">
              <span className="date">{record.date}</span>
              <div className="mini-bar">
                <div
                  className="mini-fill"
                  style={{
                    width: `${record.probability}%`,
                    background: getStatusColor(record.status),
                  }}
                ></div>
              </div>
              <span className="percentage">{record.probability}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
