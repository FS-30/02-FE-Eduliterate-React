import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Payment from "../pages/Payment";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}
