import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import signinImage from "../../assets/signup.jpg";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
};

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

    if (isSignup) {
      axios
        .post("http://localhost:5000/auth/signup", {
          fullName: form.fullName,
          username: form.username,
          password: form.password,
          phoneNumber: form.phoneNumber,
        })
        .then(
          ({
            data: {
              token,
              fullName,
              username,
              userId,
              hashedPassword,
              phoneNumber,
            },
          }) => {
            const cookies = new Cookies();
            cookies.set("token", token, { path: "/" });
            cookies.set("username", username, { path: "/" });
            cookies.set("fullName", fullName, { path: "/" });
            cookies.set("userId", userId, { path: "/" });
            cookies.set("isAuth", true, { path: "/" });
            cookies.set("phoneNumber", phoneNumber, { path: "/" });
            cookies.set("hashedPassword", hashedPassword, { path: "/" });
            // cookies.set('image', 'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png', { path: '/' });

            window.location.reload();
          }
        )
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:5000/auth/login", {
          username: form.username,
          password: form.password,
        })
        .then(({ data: { token, fullName, username, userId } }) => {
          const cookies = new Cookies();
          cookies.set("token", token, { path: "/" });
          cookies.set("username", username, { path: "/" });
          cookies.set("fullName", fullName, { path: "/" });
          cookies.set("userId", userId, { path: "/" });
          cookies.set("isAuth", true, { path: "/" });
          // cookies.set('hashedPassword', hashedPassword, { path: '/' });
          // cookies.set('image', 'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png', { path: '/' });

          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
                  type="number"
                  placeholder="123456789"
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
