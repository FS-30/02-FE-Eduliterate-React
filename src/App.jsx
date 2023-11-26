import React from "react";
import Router from "./components/Router";
import Navbar from "./components/Navbar";
import "../src/assets/styles/style.css";

export default function App() {
  return (
    <>
      <Navbar />
      {/* <main className="min-h-screen pt-8"> */}
      <main>
        <Router />
      </main>
    </>
  );
}
