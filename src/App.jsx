import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import MenuList from "./components/MenuList";
import SurveyResults from "./components/SurveyResults";
import LandingPage from "./components/LandingPage";
import "./styles/App.css"; // Add proper styles
 
function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error loading user data:", e);
        setError("Error loading user data.");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLoginSuccess = (loggedUser) => {
    setError("");
    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="app-container">
      {/* 🌟 Navigation Bar */}
      <nav className="nav-bar">
        <h1>Hodnocení školních obědů</h1>
        <div className="nav-links">
          <Link to="/">Domů</Link>
          {user ? (
            <>
              <Link to="/menu">Menu</Link>
              <Link to="/results">Výsledky</Link>
              <button className="logout-btn" onClick={handleLogout}>
                Odhlásit
              </button>
            </>
          ) : (
            <Link to="/login">Přihlásit</Link>
          )}
        </div>
      </nav>

      {/* 🌟 Routes (Navigation between pages) */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/menu" /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/menu" element={user ? <MenuList userEmail={user.email} token={user.token} /> : <Navigate to="/login" />} />
        <Route path="/results" element={user ? <SurveyResults /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
