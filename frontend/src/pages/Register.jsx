import React, { useState } from "react";
import axios from "axios";
import "../styles/register.css";
import { Link } from "react-router-dom";

function Register() {

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
location: ""
});

const [error, setError] = useState("");

const handleChange = (e) => {
setError(""); // clear error when user types

setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {

e.preventDefault();

try {

await axios.post(
"https://cropcare-backend-7njo.onrender.com/api/auth/register",
formData
);

// clear form after success
setFormData({
name: "",
email: "",
password: "",
location: ""
});

// redirect to login page
window.location.href = "/login";

} catch(error){

console.log(error.response);

setError(
error.response?.data?.message || "Registration failed"
);

}

};

return (

    <div className="register-page">
  <div className="register-card">
    <h2>CropCare Register 🌾</h2>

{/* ERROR MESSAGE */}
{error && (
<div style={{
backgroundColor: "#ffe6e6",
color: "#cc0000",
padding: "10px",
borderRadius: "5px",
marginBottom: "15px"
}}>
{error}
</div>
)}

<form onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Name"
value={formData.name}
onChange={handleChange}
className="register-input"
required
/>

<br /><br />

<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
className="register-input"
required
/>

<br /><br />

<input
type="password"
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
className="register-input"
required
/>

<br /><br />

<input
type="text"
name="location"
placeholder="Location"
value={formData.location}
onChange={handleChange}
className="register-input"
required
/>

<br /><br />

<button type="submit" className="register-btn">
Register
</button>

<div className="register-link">
  Already have an account? 
  <Link to="/login"> Login</Link>
</div>

</form>
  </div>
  </div>


);

}

export default Register;