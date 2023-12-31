import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Exercise from "./pages/Exercise";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";
import React from "react";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="lesson/:title" element={<Lesson />} />
          <Route path="exercise/:title/:question" element={<Exercise />} />
          <Route path="login" element={<Login/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
