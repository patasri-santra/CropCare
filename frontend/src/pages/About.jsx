import React from "react";
import "../styles/about.css";

function About() {
  return (

    <div className="about">

      <h1>🌾 About CropCare</h1>

      <p>
        CropCare is a smart farmer support platform designed to help farmers
        manage crop health, monitor weather conditions, and stay updated with
        market prices.
      </p>

      <p>
        The platform aims to simplify agricultural decision-making by providing
        digital solutions that are easy to use and accessible from anywhere.
      </p>

      <p>
        With CropCare, farmers can quickly identify crop problems, get suggested
        solutions, and improve productivity using data-driven insights.
      </p>

      <div className="about-box">

        <h3>🌱 Key Features</h3>

        <ul>
          <li>Crop issue detection and solutions</li>
          <li>Real-time weather information</li>
          <li>Crop market price tracking</li>
          <li>User-friendly dashboard</li>
        </ul>

      </div>

    </div>

  );
}

export default About;