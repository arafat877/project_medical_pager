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
import hospitalIcon from "../../assets/hospital.png";

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
        <div className="auth__form-container_fields-logo">
          <img src={hospitalIcon} alt="hospital_logo" />
          {/* <h2>Medical Pager</h2> */}
        </div>
        <div className="auth__form-container_fields-content">
          <p>Sign Up</p>
          <form>
            <div className="auth__form-container_fields-content_input">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" />
            </div>
            <div className="auth__form-container_fields-content_input">
              <label>Username</label>
              <input type="text" placeholder="Enter your username" />
            </div>
            <div className="auth__form-container_fields-content_input">
              <label>Phone Number</label>
              <input type="number" placeholder="Enter your phone number" />
            </div>
            <div className="auth__form-container_fields-content_input">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>
            <div className="auth__form-container_fields-content_input">
              <label>Confirm Password</label>
              <input type="password" placeholder="Enter confirm password" />
            </div>

            <div className="auth__form-container_fields-content_button">
              <button>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="sign-in-up gif" />
      </div>
    </div>
  );
};

export default NewAuth;
