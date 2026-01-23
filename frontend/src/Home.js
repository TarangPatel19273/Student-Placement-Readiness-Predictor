
import React, { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Could not connect to backend."));
  }, []);

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Student Readiness Portal</h1>
        <p>
          Empowering students to achieve their academic and career goals with personalized insights and resources.
        </p>
        <a href="/register" className="cta-btn">Get Started</a>
      </section>
      <section className="features">
        <div className="feature">
          <h2>Personalized Dashboard</h2>
          <p>Track your progress and get tailored recommendations.</p>
        </div>
        <div className="feature">
          <h2>Predictive Analytics</h2>
          <p>Leverage AI to forecast your readiness and areas to improve.</p>
        </div>
        <div className="feature">
          <h2>Secure & Easy Access</h2>
          <p>Sign up and manage your profile with ease and security.</p>
        </div>
      </section>
      <div style={{textAlign: "center", marginTop: "2rem", color: "#007bff", fontWeight: 500}}>{message}</div>
    </div>
  );
}