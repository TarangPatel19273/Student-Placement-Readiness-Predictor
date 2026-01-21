import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Student Readiness Platform</h1>
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
    </div>
  );
}
