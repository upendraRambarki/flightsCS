import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./Login.css";
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function showPassword() {
    var x = document.getElementsByName("password");
    if (x[0].type === "password") {
      x[0].type = "text";
    } else {
      x[0].type = "password";
    }
  }
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    
      <div className="login-container ">
        <div className="login-title">
        <h1 className="login-welcometext">Welcome Back</h1>
        <p className="login-welcomesubtext">
          Join the world's Largest community
        </p>
      </div>
        {/* <div className="card card-container ">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        </div> */}
    <div className="login-login-block">
        <Form onSubmit={handleLogin} ref={form}>
          <div className="login-block-inputs">
            {/* <label htmlFor="username" className="font-weight-bold"><strong>Username</strong></label> */}
            <Input
              type="text"
              //className="form-control"
              name="username"
              placeholder="Username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          {/* </div> */}
            {/* <label htmlFor="password"className="font-weight-bold"><strong>Password</strong></label> */}
            <Input
              type="password"
             // className="form-control"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
            <i
            className="fa-solid fa-eye login-eye-icon"
            onClick={showPassword}
          ></i>
          </div>
          <div className="login-forgot-password">
          <p className="login-forgot-password-text">Forgot Password?</p>
        </div>
          <div className="login-buttons">
            <button className="login-button-login" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
            <button a href="Signup" className="login-button-signup">Create New Account</button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <div className="login-terms">
        By clicking the buttons above, You agree to our terms of use and privacy
        policies.
      </div>   
        </div>
     
    </div>
  );
};

export default Login;
