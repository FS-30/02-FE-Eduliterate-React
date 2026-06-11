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

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', username: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Toast.fire({ icon: 'error', title: 'Passwords do not match' });
      return;
    }
    if (formData.password.length < 8) {
      Toast.fire({ icon: 'error', title: 'Password must be at least 8 characters' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Toast.fire({ icon: 'success', title: data.message });
        setTimeout(() => navigate('/auth/login'), 1500);
      } else {
        Toast.fire({ icon: 'error', title: data.message || 'Registration failed' });
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
    <div className="register-page">
      <Helmet>
          <title>Register</title>
          <link rel="icon" href="https://imgur.com/CdWfCDS.png" />
      </Helmet>
      <div className="card-container">
        <img className="element-removebg" src={educationImage} alt="Education" />
        <div className="low-fi-block-header">
          <div className="div login-lol">
            <div className="text-wrapper">Create A New Account</div>
            <p className="p-register">Let's set up your account</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="box">
                  <div className="search">
                    <input
                      id="username"
                      name="username"
                      className="text-container"
                      placeholder="Enter Your Username Here"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="box">
                  <div className="search">
                    <input
                      id="email"
                      name="email"
                      className="text-container"
                      placeholder="Enter Your Email"
                      type="email"
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
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="box">
                  <div className="search">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      className="text-container"
                      placeholder="Confirm Your Password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Register'}
              </button>
            </form>

            <Link to="/auth/login" className="have-account-link">
              Already have an account? Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;