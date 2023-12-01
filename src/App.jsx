import React from "react";
import { useLocation } from "react-router-dom";
import Router from "./components/Router";
import Navbar from "./components/Navbar";
import "../src/assets/styles/style.css";

export default function App() {
  const location = useLocation();
  
  return (
    <>
      {
        location.pathname === '/auth/login' || 
        location.pathname === '/auth/register' ||
        location.pathname.includes('/book-details') ||
        location.pathname.includes('/payment') 
        ? '' : <Navbar />
      }
      <Router />
    </>
  );
}
