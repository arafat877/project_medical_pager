import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
import {
  CssBaseline,
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
// import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import useStyles from "./styles";
import Input from "./Input";
import Cookies from "universal-cookie";
import signinImage from "../../assets/signin.gif";
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
  const classes = useStyles();

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
    // <Container component="main" maxWidth="xs">
    // <CssBaseline />
    //   <Paper className={classes.paper} elevation={6}>
    //     <Avatar className={classes.avatar}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
    //     <form className={classes.form} onSubmit={handleSubmit}>
    //       <Grid container spacing={2}>
    //         { isSignup && <Input name="fullName" label="Full Name" handleChange={handleChange} autoFocus /> }
    //         <Input name="username" label="Username" handleChange={handleChange} />
    //         { isSignup && <Input name="phoneNumber" label="Phone Number" handleChange={handleChange} type="text" /> }
    //         <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
    //         { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
    //       </Grid>
    //       <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
    //         { isSignup ? 'Sign Up' : 'Sign In' }
    //       </Button>
    //       <Grid container justifyContent="flex-end">
    //         <Grid item>
    //           <Button onClick={switchMode}>
    //             { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </Paper>
    // </Container>

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
                  placeholder="John Doe"
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
                placeholder="@john"
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
                placeholder="***"
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
                  placeholder="***"
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
