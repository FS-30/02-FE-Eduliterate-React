import React from "react";
import { useLocation } from "react-router-dom";
import Router from "./components/Router";
import Navbar from "./components/Navbar";
import MobileWarning from "./components/MobileWarning";
import "../src/assets/styles/style.css";

export default function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === '/auth/login' ||
    location.pathname === '/auth/register' ||
    location.pathname.includes('/book-details') ||
    location.pathname.includes('/payment');

  return (
    <MobileWarning>
      {!hideNavbar && <Navbar />}
      <Router />
    </MobileWarning>
  );
}
