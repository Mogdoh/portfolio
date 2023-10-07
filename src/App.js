import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./components/home/Home.js"
import StartPage from "./components/start/StartPage.js";
import SearchingBar from "./components/start/SearchingBar.js";



function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ex" element={<SearchingBar />} />
      </Routes>
    </div>
  );
}

export default App;
