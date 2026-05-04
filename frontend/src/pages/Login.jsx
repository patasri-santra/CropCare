import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";
import { Link } from "react-router-dom";

function Login() {

const [formData, setFormData] = useState({
email: "",
password: ""
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {

e.preventDefault();

try {

const res = await axios.post(
"https://cropcare-backend-7njo.onrender.com/api/auth/login",
formData
);

localStorage.setItem("token", res.data.token);

alert("Login successful");

window.location.href = "/dashboard";

} catch (error) {

alert("Login failed");

}

};

return (

<div className="login-page">
  <div className="login-card">
    <h2>CropCare Login 🌾</h2>

<form onSubmit={handleSubmit}>

<input
type="email"
name="email"
placeholder="Email"
onChange={handleChange}
className="login-input"
/>

<br /><br />

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
className="login-input"
/>

<br /><br />

<button type="submit" className="login-btn">
Login
</button>

<div className="login-link">
  Don’t have an account? 
  <Link to="/register"> Register</Link>
</div>

</form>

  </div>
</div>

);

}

export default Login;