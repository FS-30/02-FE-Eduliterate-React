import React from "react";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Home from "../pages/Home";
import Payment from "../pages/Payment";
import DigitalCollection from "../pages/DigitalCollection";
import BookDetails from "../pages/BookDetails";
import Register from "../components/auth/register"; 
import Login from "../components/auth/login"; 

export default function Router() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/digital-collection" element={<DigitalCollection />} />
        <Route path="/book-details/:id" element={<BookDetails />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} /> 
      </Routes>
    </HelmetProvider>
  );
}