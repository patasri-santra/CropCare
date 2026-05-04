import React from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div className="home">

            {/* NAVBAR */}
            <nav className="navbar">
                <h2 className="logo">CropCare</h2>

                <ul className="nav-links">
                    <li><a href="/dashboard">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>

                <div>
                    <a href="/login" className="nav-btn">Login</a>
                    <a href="/register" className="nav-btn register">Register</a>
                </div>
            </nav>

            {/* HERO SECTION */}
            <div className="hero">

                <div className="hero-left">
                    <h1>
                        SMART <br /> FARMING
                    </h1>

                    <p>
                        CropCare helps farmers detect crop issues, check weather,
                        and track market prices for better decisions.
                    </p>

                    <button
                        className="primary-btn"
                        onClick={() => navigate("/register")}
                    >
                        Get Started →
                    </button>
                </div>

                <div className="hero-right">
                    <img
                        src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
                        alt="crop"
                    />
                </div>

            </div>

            {/* FEATURES */}
            <div className="features">

                <div className="feature">
                    🌾 <h4>Crop Advisory</h4>
                    <p>Get instant solutions for crop issues</p>
                </div>

                <div className="feature">
                    🌦️ <h4>Weather Info</h4>
                    <p>Check real-time weather updates</p>
                </div>

                <div className="feature">
                    📈 <h4>Market Prices</h4>
                    <p>Stay updated with crop prices</p>
                </div>

            </div>

        </div>
    );
}

export default Home;