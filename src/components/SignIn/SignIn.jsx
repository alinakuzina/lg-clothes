import { useState, useContext } from "react";
import "./SignIn.scss";
import Button from "../Button/Button";
import facebookLogo from "../../assets/facebook-logo.svg";
import googleLogo from "../../assets/google-logo.svg";
import { Context } from "../../context/context";

import {
  sightInWithGooglePopup,
  signInWIthFacebook,
  createUserDocumentFromAuth,
  signInWithEmail,
} from "../../utilits/farebase";

const defaultSignInFields = {
  email: "",
  password: "",
};

const SignIn = (props) => {
  const [signInFields, setsignInFiels] = useState(defaultSignInFields);
  const { email, password } = signInFields;
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [accessError, setAccessError] = useState(false);
  const context = useContext(Context);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setsignInFiels({ ...signInFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    const userDocRef = await sightInWithGooglePopup();
  };

  const signInWithFacebook = async () => {
    const userDocRef = await signInWIthFacebook();
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await signInWithEmail(email, password);

      setsignInFiels(defaultSignInFields);
      setEmailError(false);
      setPasswordError(false);
      setAccessError(false);
    } catch (error) {
      setEmailError(false);
      setPasswordError(false);
      setAccessError(false);
      if (error.code === "auth/user-not-found") {
        setEmailError(true);
      }
      if (error.code === "auth/wrong-password") {
        setPasswordError(true);
      }
      if (error.code === "auth/too-many-requests") {
        setAccessError(true);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h1 className="main-header">Welcome back</h1>
      <h2 className="aditional-header">Please enter your details</h2>
      <form onSubmit={submitHandler} className="form-sign-in">
        <div className="group">
          <input
            className={`form-input ${emailError ? "errorLine" : ""}`}
            type="email"
            required
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={email}
          ></input>
          <label
            className={`form-input-label ${email.length > 0 ? "shrink" : ""}`}
          >
            Email
          </label>
        </div>

        <div className="group">
          <input
            className={`form-input ${passwordError ? "errorLine" : ""}`}
            type="password"
            required
            onChange={handleChange}
            name="password"
            autoComplete="new-password"
            value={password}
          ></input>
          <label
            className={`form-input-label ${
              password.length > 0 ? "shrink" : ""
            }`}
          >
            Password
          </label>
        </div>
        {emailError && (
          <div className="error-message">Please enter correct email</div>
        )}
        {passwordError && (
          <div className="error-message">Password is incorrect</div>
        )}
        {accessError && (
          <div className="error-message">
            Access to this account has been temporarily disabled due to many
            failed login attempts.You can try again later.
          </div>
        )}
        <div className="buttons-container">
          <Button type="submit" classes="submit">
            Sign In
          </Button>
          <Button type="button" onClick={signInWithGoogle}>
            <div className="logo-name-container">
              <img className="logo" src={googleLogo} /> Google sign in
            </div>
          </Button>
          <Button type="button" onClick={signInWithFacebook}>
            <div className="logo-name-container">
              <img className="logo" src={facebookLogo} /> Facebook sign in
            </div>
          </Button>
        </div>
      </form>
      <div className="redirect-container">
        <p>Don't have an account?</p>{" "}
        <button className="redirect-buttom" onClick={props.redirectSingUp}>
          Sign up for free &rarr;
        </button>
      </div>
    </div>
  );
};

export default SignIn;
