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

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: 'All fields are required'
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: 'Passwords do not match'
      });
      return;
    }

    try {
      const response = await fetch('https://eduliterate.cyclic.app/auth/register', {
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
          title: data.message
        });

        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 3000);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Toast.fire({
        icon: 'error',
        title: 'Registration failed'
      });
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

              <button type="submit" className="submit-button">Register</button>
            </form>

            <a href="/auth/login" className="have-account-link">
              Already Have an Account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;