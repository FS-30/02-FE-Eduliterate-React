import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isMenuOpen]);

  // Close mobile menu when clicking outside the navbar
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    ['token', 'is_subscribed', 'paymentSuccess', 'isloggedin', 'id'].forEach(k => localStorage.removeItem(k));
    setIsLoggedIn(false);
    setIsSubscribed(false);
    closeMenu();
    navigate('/auth/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header id="sticky-navbar" role="banner">
      <nav
        ref={navRef}
        className="navbar navbar-expand-lg navbar-light bg-navbar px-4"
        aria-label="Main navigation"
      >
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2" aria-label="Eduliterate home">
          <img src={logoImg} className="logo" alt="" aria-hidden="true" />
          <span className="logo-text">EDULITERATE</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(v => !v)}
          aria-expanded={isMenuOpen}
          aria-controls="navbarNav"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ms-4${isMenuOpen ? ' show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link navigation ${isActive('/')}`}
                onClick={closeMenu}
              >
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/digital-collection"
                className={`nav-link navigation ${isActive('/digital-collection')}`}
                onClick={closeMenu}
              >
                DIGITAL COLLECTION
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button className="nav-link navigation btn-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/auth/register"
                    className={`nav-link navigation ${isActive('/auth/register')}`}
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/auth/login"
                    className={`nav-link navigation ${isActive('/auth/login')}`}
                    onClick={closeMenu}
                  >
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
