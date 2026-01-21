import React, { useEffect, useState } from "react";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Could not connect to backend."));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Student Readiness Portal</h1>
      <p>This is the Home Page.</p>
      <h2 style={{ marginTop: "40px", color: "#007bff" }}>{message}</h2>
    </div>
  );
}

export default Home;