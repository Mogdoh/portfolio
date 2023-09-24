import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./components/home/home"
import StartPage from "./components/start/startpage";



function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
