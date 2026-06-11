import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import educationImage from '../../assets/img/education.png';
import { Helmet } from 'react-helmet-async';
import './authstyle.css';

const API_BASE = import.meta.env.VITE_API_URL || 'https://03-be-eduliterate-express.vercel.app';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
    icon: 'colored-toast',
    title: 'colored-toast',
    htmlContainer: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
});

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('is_subscribed', data.is_subscribed);
        localStorage.setItem('id', data.id);
        localStorage.setItem('isloggedin', 'true');

        Toast.fire({ icon: 'success', title: 'Login successful' });
        setTimeout(() => navigate('/'), 1500);
      } else {
        Toast.fire({ icon: 'error', title: data.message || 'Login failed' });
      }
    } catch {
      Toast.fire({ icon: 'error', title: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <Helmet>
          <title>Login</title>
          <link rel="icon" href="https://imgur.com/CdWfCDS.png" />
      </Helmet>
      <div className="card-container">
        <img className="element-removebg" src={educationImage} alt="Education" />
        <div className="low-fi-block-header">
          <div className="div login-lol">
            <div className="text-wrapper">Welcome Back!</div>
            <p className="p-login">Please Log In to continue your learning journey with Eduliterate.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="box">
                  <div className="search">
                    <input
                      id="email"
                      name="email"
                      className="text-container"
                      placeholder="Enter Your Email Here"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="box">
                  <div className="search">
                    <input
                      id="password"
                      name="password"
                      className="text-container"
                      placeholder="Enter Your Password"
                      type="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-button login-button" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <Link to="/auth/register" className="dont-have-account-link">
              Don&apos;t have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;