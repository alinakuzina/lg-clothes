import { useState, useContext } from "react";
import {
  createUserWithEmail,
  createUserDocumentFromAuth,
} from "../../utilits/Farebase";
import Button from "../Button/Button";
import btnStyle from "../Button/Button.module.scss";
import style from "./SignUp.module.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = (props) => {
  const [formFields, setFormFiels] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [emailInvalidError, setEmailInvalidError] = useState(false);
  const [emailAlreadyInUseError, setEmailAlreadyInUseError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFiels({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFiels(defaultFormFields);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setConfirmPasswordError(false);
    setEmailInvalidError(false);
    setPasswordLengthError(false);
    setEmailAlreadyInUseError(false);

    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      return;
    }

    if (
      !password.match(/[a-z]/g) ||
      !password.match(/[A-Z]/g || password.length < 6)
    ) {
      setPasswordLengthError(true);
      return;
    }

    try {
      const response = await createUserWithEmail(email, password);
      if (response === "Firebase: Error (auth/email-already-in-use).") {
        setEmailAlreadyInUseError(true);
        return;
      }

      await createUserDocumentFromAuth(response.user, { displayName });
      resetFormFields();
      setConfirmPasswordError(false);
      setEmailInvalidError(false);
      setPasswordLengthError(false);
      setEmailAlreadyInUseError(false);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setEmailAlreadyInUseError(true);
      }
      if ((error.message = "auth/invalid-email")) {
        setEmailInvalidError(true);
      }
    }
  };

  return (
    <div className={style.sign_up_container}>
      <h1 className={style.main_header}>Create an account</h1>
      <h2 className={style.aditional_header}>Please enter your details</h2>
      <form onSubmit={submitHandler} className={style.form_sign_up}>
        <div className={style.group}>
          <input
            className={style.form_input}
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            autoComplete="name"
            value={displayName}
          ></input>
          <label
            className={`${style.form_input_label} ${
              displayName.length > 0 ? style.shrink : ""
            }`}
          >
            Name
          </label>
        </div>

        <div className={style.group}>
          <input
            className={style.form_input}
            type="email"
            required
            onChange={handleChange}
            name="email"
            autoComplete="email"
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
              confirmPasswordError ? style.error_line : ""
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

        <div className={style.group}>
          <input
            className={`${style.form_input} ${
              confirmPasswordError ? style.error_line : ""
            }`}
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
          ></input>
          <label
            className={`${style.form_input_label} ${
              confirmPassword.length > 0 ? style.shrink : ""
            }`}
          >
            Confirm Password
          </label>
        </div>
        {confirmPasswordError && (
          <div className={style.error_message}>
            Password and confirm password should be same.{" "}
          </div>
        )}
        {emailInvalidError && (
          <div className={style.error_message}>Email is invalid.</div>
        )}
        {passwordLengthError && (
          <div className={style.error_message}>
            Password should contain:
            <ul>
              <li>A lowercase letter</li>
              <li>A capital (uppercase) letter</li>
              <li>A number</li>
              <li>Minimum 6 characters</li>
            </ul>
          </div>
        )}
        {emailAlreadyInUseError && (
          <div className={style.error_message}>
            That email address is already in use.
          </div>
        )}
        <div className={style.buttons_container}>
          <Button type="submit" classes={btnStyle.submit}>
            Create account
          </Button>
        </div>
      </form>
      <div className={style.redirect_container}>
        <p>Already have an account?</p>
        <button
          className={style.redirect_buttom}
          onClick={props.redirectSingIn}
        >
          Sign in here &rarr;
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
