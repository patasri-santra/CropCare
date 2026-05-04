const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const priceRoutes = require("./routes/priceRoutes");
require("dotenv").config();

const app = express();



// middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/crop", cropRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/prices", priceRoutes);

// test route
app.get("/", (req, res) => {
    res.send("CropCare API is running 🌱");
});

app.get("/api/health-checkup", (req,res) => {
    res.send("server is up and running")
});

// connect database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

