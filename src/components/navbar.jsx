import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/img/logo.png";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_subscribed');
    localStorage.removeItem('paymentSuccess');
    localStorage.removeItem('isloggedin');
    localStorage.removeItem('id');
    setIsLoggedIn(false);
    window.location.href = '/auth/login';
  };

  return (
    <div id="sticky-navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-navbar px-4">
        <img src={logoImg} className="logo me-2" alt="Logo" />
        <Link to="/" className="logo-text navbar-brand">
          EDULITERATE
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ms-4" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className={`nav-link navigation ${location.pathname === '/' ? 'active' : ''}`}>
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/digital-collection" className={`nav-link navigation ${location.pathname === '/digital-collection' ? 'active' : ''}`}>
                DIGITAL COLLECTION
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="nav-link navigation" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/auth/register"
                    className={`nav-link navigation ${location.pathname === '/auth/register' ? 'active' : ''}`}
                    id="registerButton"
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/auth/login"
                    className={`nav-link navigation ${location.pathname === '/auth/login' ? 'active' : ''}`}
                    id="loginButton"
                  >
                    Login
                  </Link>
                </li>
                <li
                  className="nav-item"
                  id="loggedInSection"
                  style={{ display: "none" }}
                >
                  <span
                    className="nav-link navigation-section"
                    id="loggedInUsername" 
                  ></span>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;