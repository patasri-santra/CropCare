import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {

return (

<BrowserRouter>

<Routes>

<Route path="/" element={<Home />} />

<Route path="/register" element={<Register />} />

<Route path="/login" element={<Login />} />

<Route path="/dashboard" element={<Dashboard />} />

<Route path="/about" element={<About />} />


<Route path="/contact" element={<Contact />} />

</Routes>

</BrowserRouter>

);

}

export default App;