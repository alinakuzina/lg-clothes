import { useState } from "react";
import style from "./SignIn.module.scss";
import Button from "../Button/Button";
import btnStyle from "../Button/Button.module.scss";
import facebookLogo from "../../assets/facebook-logo.svg";
import googleLogo from "../../assets/google-logo.svg";

import {
  sightInWithGooglePopup,
  signInWIthFacebook,
  createUserDocumentFromAuth,
  signInWithEmail,
} from "../../utilits/Farebase";

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
    <div className={style.sign_in_container}>
      <h1 className={style.main_header}>Welcome back</h1>
      <h2 className={style.aditional_header}>Please enter your details</h2>
      <form onSubmit={submitHandler} className={style.form_sign_in}>
        <div className={style.group}>
          <input
            className={`${style.form_input} ${
              emailError ? style.error_line : ""
            }`}
            type="email"
            required
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={email}
          ></input>
          <label
            className={`${style.form_input_label} ${
              email.length > 0 ? style.shrink : ""
            }`}
          >
            Email
          </label>
        </div>

        <div className={style.group}>
          <input
            className={`${style.form_input} ${
              passwordError ? style.error_line : ""
            }`}
            type="password"
            required
            onChange={handleChange}
            name="password"
            autoComplete="new-password"
            value={password}
          ></input>
          <label
            className={`${style.form_input_label} ${
              password.length > 0 ? style.shrink : ""
            }`}
          >
            Password
          </label>
        </div>
        {emailError && (
          <div className={style.error_message}>Please enter correct email</div>
        )}
        {passwordError && (
          <div className={style.error_message}>Password is incorrect</div>
        )}
        {accessError && (
          <div className={style.error_message}>
            Access to this account has been temporarily disabled due to many
            failed login attempts.You can try again later.
          </div>
        )}
        <div className={style.buttons_container}>
          <Button type="submit" classes={btnStyle.submit}>
            Sign In
          </Button>
          <Button type="button" onClick={signInWithGoogle}>
            <div className={style.logo_name_container}>
              <img className={style.logo} src={googleLogo} /> Google sign in
            </div>
          </Button>
          <Button type="button" onClick={signInWithFacebook}>
            <div className={style.logo_name_container}>
              <img className={style.logo} src={facebookLogo} /> Facebook sign in
            </div>
          </Button>
        </div>
      </form>
      <div className={style.redirect_container}>
        <p>Don't have an account?</p>{" "}
        <button
          className={style.redirect_buttom}
          onClick={props.redirectSingUp}
        >
          Sign up for free &rarr;
        </button>
      </div>
    </div>
  );
};

export default SignIn;
