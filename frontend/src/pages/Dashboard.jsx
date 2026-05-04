import React, { useState, useEffect } from "react";
import axios from "axios";
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

const token = localStorage.getItem("token");

// ---------------- FETCH ---------------- //

const fetchIssues = async () => {
try {
const res = await axios.get(
"https://cropcare-backend-7njo.onrender.com/api/crop/myissues",
{ headers: { Authorization: token } }
);
setIssues(res.data);
} catch (err) {
console.log(err);
}
};

const fetchPrices = async () => {
try {
const res = await axios.get("https://cropcare-backend-7njo.onrender.com/api/prices");
setPrices(res.data);
} catch (err) {
console.log(err);
}
};

const fetchWeather = async () => {
try {
const res = await axios.get(
`https://cropcare-backend-7njo.onrender.com/api/weather?location=${location}`
);
setWeather(res.data);
} catch (err) {
console.log(err);
}
};

// ---------------- LOAD ---------------- //

// eslint-disable-next-line
useEffect(() => {
  fetchIssues();
  fetchWeather();
}, []);
// ---------------- SUBMIT ---------------- //

const handleSubmit = async (e) => {
e.preventDefault();

try {
const res = await axios.post(
"https://cropcare-backend-7njo.onrender.com/api/crop/report",
{ cropName, problem },
{ headers: { Authorization: token } }
);

setSolution(res.data.solution);
setCropName("");
setProblem("");
fetchIssues();

} catch {
alert("Error submitting issue");
}
};

// ---------------- LOGOUT ---------------- //

const handleLogout = () => {
localStorage.removeItem("token");
window.location.href = "/login";
};

// ---------------- UI ---------------- //

return (

<div className="dashboard">

{/* 🌿 NAVBAR */}
<div className="topbar">
<h2 className="logo">CropCare</h2>

<div className="nav-links">
<Link to="/">Home</Link>
<Link to="/about">About</Link>
<Link to="/contact">Contact</Link>
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
onChange={(e)=>setLocation(e.target.value)}
placeholder="Enter location"
/>

<button className="btn small" onClick={fetchWeather}>
Check
</button>
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
onChange={(e)=>setCropName(e.target.value)}
placeholder="Crop Name"
required
/>

<select
className="input"
value={problem}
onChange={(e)=>setProblem(e.target.value)}
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

);

}

export default Dashboard;