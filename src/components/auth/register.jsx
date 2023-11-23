import React from 'react';
import educationImage from '../assets/education.png';
import './style.css';

const Register = () => {
  return (
    <div className="card-container">
      <img className="element-removebg" src={educationImage} alt="Education" />
      <div className="low-fi-block-header">
        <div className="div">
          <div className="div">
            <div className="text-wrapper">Create A New Account</div>
            <p className="p-register">Let's set up your account</p>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="box">
                <div className="search">
                  <input id="username" name="username" className="text-container" placeholder="Enter Your Username Here" type="text" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="box">
                <div className="search">
                  <input id="email" name="email" className="text-container" placeholder="Enter Your Email" type="email" />
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="box">
                <div className="search">
                  <input id="confirmPassword" name="confirmPassword" className="text-container" placeholder="Confirm Your Password" type="password" />
                </div>
              </div>
            </div>

            <button className="submit-button">Register</button>

            <a href="login.html" className="have-account-link">
              Already Have an Account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
