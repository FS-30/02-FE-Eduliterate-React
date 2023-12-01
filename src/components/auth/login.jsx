import React, { useState } from 'react';
import Swal from 'sweetalert2';
import educationImage from '../../assets/img/education.png';
import { Helmet } from 'react-helmet-async'; 
import './authstyle.css';

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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Toast.fire({
        icon: 'error',
        title: 'All fields are required'
      });
      return;
    }

    try {
      const response = await fetch('https://eduliterate.cyclic.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        Toast.fire({
          icon: 'success',
          title: 'Login successful'
        });

        localStorage.setItem('token', data.token);
        localStorage.setItem('is_subscribed', data.is_subscribed);
        localStorage.setItem('id', data.id);
        localStorage.setItem('isloggedin', true);

        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Toast.fire({
        icon: 'error',
        title: 'Login failed'
      });
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
                      type="text"
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

              <button type="submit" className="submit-button login-button">Login</button>
            </form>

            <a href="/auth/register" className="dont-have-account-link">
              Don't Have Account? Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;