import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

const Home = lazy(() => import("../pages/Home"));
const Payment = lazy(() => import("../pages/Payment"));
const DigitalCollection = lazy(() => import("../pages/DigitalCollection"));
const BookDetails = lazy(() => import("../pages/BookDetails"));
const Register = lazy(() => import("../components/auth/register"));
const Login = lazy(() => import("../components/auth/login"));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div style={{
      width: 40, height: 40,
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #FFA458',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  </div>
);

export default function Router() {
  return (
    <HelmetProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/digital-collection" element={<DigitalCollection />} />
          <Route path="/book-details/:id" element={<BookDetails />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
}