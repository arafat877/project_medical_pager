import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signinImage from "../assets/signup.jpg";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const cookies = new Cookies();

const NewAuth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, username, password,  phoneNumber, avatarURL } = form;    

    const URL = "https://medical-pagerdemo.herokuapp.com/auth";
    // const URL = "https://medical-pager.netlify.app/auth";

    axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, { username, password, fullName, phoneNumber, avatarURL })
      .then(({ data: { token, userId, fullName, username, hashedPassword }}) => {
          cookies.set("token", token);
          cookies.set("username", username);
          cookies.set("fullName", fullName);
          cookies.set("userId", userId);

          if(isSignup) {
            cookies.set("phoneNumber", phoneNumber);
            cookies.set("avatarURL", avatarURL);
            cookies.set("hashedPassword", hashedPassword);
          }

          window.location.reload();
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Sign up" : "Sign in"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullname">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Dr. Smith"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="Username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="drsmith"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  placeholder="123456789"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="https://avatarurls/avatar.png"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="******"
                onChange={handleChange}
                required
              />
              <div className="auth__form-container_fields-content_input-password">
                {showPassword ? (
                  <VisibilityOffIcon
                    onClick={handleShowPassword}
                    style={{ color: "#05245a" }}
                  />
                ) : (
                  <VisibilityIcon
                    onClick={handleShowPassword}
                    style={{ color: "#05245a" }}
                  />
                )}
              </div>
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_button">
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? " Sign in" : " Sign up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="sign-in-up gif" />
      </div>
    </div>
  );
};

export default NewAuth;
