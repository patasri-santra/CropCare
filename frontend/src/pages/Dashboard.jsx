import React, { useState, useEffect } from "react";
import api from "../api"; // Import your updated custom axios instance
import "../styles/dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [cropName, setCropName] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [issues, setIssues] = useState([]);
  const [prices, setPrices] = useState([]);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("Punjab");
  const [darkMode, setDarkMode] = useState(false);

  // ---------------- LOAD DATA ---------------- //
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Token headers are now automatically injected by your api.js interceptor!
        const [issuesRes, pricesRes, weatherRes] = await Promise.all([
          api.get("/crop/myissues"),
          api.get("/prices"),
          api.get(`/weather?location=${location}`)
        ]);

        setIssues(issuesRes.data);
        setPrices(pricesRes.data);
        setWeather(weatherRes.data);
        
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
          setDarkMode(true);
        }
      } catch (err) {
        console.error("Error loading dashboard metrics:", err);
      }
    };

    fetchAllData();
  }, [location]);

  // ---------------- SUBMIT ISSUE ---------------- //
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/crop/report", { cropName, problem });

      setSolution(res.data.solution);
      setCropName("");
      setProblem("");

      // Refresh data history natively with your custom instance config
      const updated = await api.get("/crop/myissues");
      setIssues(updated.data);
    } catch (err) {
      console.error(err);
      alert("Error submitting issue");
    }
  };

  // ---------------- LOGOUT ---------------- //
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem("theme", nextMode ? "dark" : "light");
  };

  // ---------------- UI ---------------- //
  return (
    <div className="dashboard">
      <div className={darkMode ? "dashboard dark" : "dashboard"}>
        {/* 🌿 NAVBAR */}
        <div className="topbar">
          <h2 className="logo">CropCare</h2>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>

            <button className="theme-btn" onClick={toggleTheme}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* 🌾 TITLE */}
        <h1 className="page-title">Farmer Dashboard</h1>

        {/* 🌦 WEATHER */}
        <div className="card">
          <h3>🌦 Weather</h3>

          <div className="row">
            <input
              className="input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
          </div>

          {weather && (
            <div className="info">
              <p><b>{weather.location}</b></p>
              <p>{weather.temperature}°C</p>
              <p>{weather.condition}</p>
            </div>
          )}
        </div>

        {/* 📈 PRICES */}
        <div className="card">
          <h3>📈 Market Prices</h3>

          {prices.length === 0 ? (
            <p>No data available</p>
          ) : (
            prices.map((p, i) => (
              <p key={i}>
                <b>{p.crop}</b> : {p.price}
              </p>
            ))
          )}
        </div>

        {/* 🌾 ISSUE FORM */}
        <div className="card">
          <h3>Report Crop Issue</h3>

          <form onSubmit={handleSubmit}>
            <input
              className="input"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              placeholder="Crop Name"
              required
            />

            <select
              className="input"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              required
            >
              <option value="">Select Problem</option>
              <option>Yellow Leaves</option>
              <option>Dry Leaves</option>
              <option>Spots on Leaves</option>
            </select>

            <button className="btn">Get Solution</button>
          </form>

          {solution && (
            <div className="success">
              Solution: {solution}
            </div>
          )}
        </div>

        {/* 📊 ANALYTICS */}
        <div className="card">
          <h3>📊 Farm Analytics</h3>

          <div className="stats-grid">
            <div className="stat-box">
              <h2>{issues.length}</h2>
              <p>Total Issues Reported</p>
            </div>

            <div className="stat-box">
              <h2>{prices.length}</h2>
              <p>Crop Prices Listed</p>
            </div>

            <div className="stat-box">
              <h2>{weather ? weather.temperature : "--"}°C</h2>
              <p>Current Temperature</p>
            </div>

            <div className="stat-box">
              <h2>{location}</h2>
              <p>Current Region</p>
            </div>
          </div>
        </div>

        {/* 📋 HISTORY */}
        <div className="card">
          <h3>Previous Issues</h3>

          {issues.length === 0 ? (
            <p>No issues found</p>
          ) : (
            issues.map((issue, i) => (
              <div key={i} className="issue">
                <p><b>{issue.cropName}</b></p>
                <p>{issue.problem}</p>
                <p>{issue.solution}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
