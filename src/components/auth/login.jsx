import React from 'react';
import educationImage from '../assets/education.png';
import './style.css';

const Login = () => {
  return (
    <div className="card-container">
      <img className="element-removebg" src={educationImage} alt="Education" />
      <div className="low-fi-block-header">
        <div className="div">
          <div className="div">
            <div className="text-wrapper">Welcome Back!</div>
            <p className="p-login">Please Log In to continue your learning journey with Eduliterate.</p>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="box">
                <div className="search">
                  <input id="username" name="username" className="text-container" placeholder="Enter Your Username Here" type="text" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="box">
                <div className="search">
                  <input id="password" name="password" className="text-container" placeholder="Enter Your Password" type="password" />
                </div>
              </div>
            </div>

            <button className="submit-button login-button">Login</button>

            <a href="register.html" className="dont-have-account-link">
              Don't Have Account? Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
