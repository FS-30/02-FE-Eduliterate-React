import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const handleLogout = () => {
    ['token', 'is_subscribed', 'paymentSuccess', 'isloggedin', 'id'].forEach(k => localStorage.removeItem(k));
    setIsLoggedIn(false);
    navigate('/auth/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header id="sticky-navbar" role="banner">
      <nav className="navbar navbar-expand-lg navbar-light bg-navbar px-4" aria-label="Main navigation">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2" aria-label="Eduliterate home">
          <img src={logoImg} className="logo" alt="" aria-hidden="true" />
          <span className="logo-text">EDULITERATE</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ms-4" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className={`nav-link navigation ${isActive('/')}`}>HOME</Link>
            </li>
            <li className="nav-item">
              <Link to="/digital-collection" className={`nav-link navigation ${isActive('/digital-collection')}`}>
                DIGITAL COLLECTION
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="nav-link navigation btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/auth/register" className={`nav-link navigation ${isActive('/auth/register')}`}>
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/auth/login" className={`nav-link navigation ${isActive('/auth/login')}`}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
