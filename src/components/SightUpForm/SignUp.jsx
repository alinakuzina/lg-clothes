import { useState, useContext } from "react";
import {
  createUserWithEmail,
  createUserDocumentFromAuth,
} from "../../utilits/farebase";
import Button from "../Button/Button";
import "./SignUp.scss";
import { Context } from "../../context/context";

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
  const context = useContext(Context);

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
    <div className="sign-up-container">
      <h1 className="main-header">Create an account</h1>
      <h2 className="aditional-header">Please enter your details</h2>
      <form onSubmit={submitHandler} className="form-sign-up">
        <div className="group">
          <input
            className="form-input "
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            autoComplete="name"
            value={displayName}
          ></input>
          <label
            className={`form-input-label ${
              displayName.length > 0 ? "shrink" : ""
            }`}
          >
            Name
          </label>
        </div>

        <div className="group">
          <input
            className="form-input "
            type="email"
            required
            onChange={handleChange}
            name="email"
            autoComplete="email"
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
            className={`form-input ${confirmPasswordError ? "error-line" : ""}`}
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

        <div className="group">
          <input
            className={`form-input ${confirmPasswordError ? "error-line" : ""}`}
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
          ></input>
          <label
            className={`form-input-label ${
              confirmPassword.length > 0 ? "shrink" : ""
            }`}
          >
            Confirm Password
          </label>
        </div>
        {confirmPasswordError && (
          <div className="error-message">
            Password and confirm password should be same.{" "}
          </div>
        )}
        {emailInvalidError && (
          <div className="error-message">Email is invalid.</div>
        )}
        {passwordLengthError && (
          <div className="error-message">
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
          <div className="error-message">
            That email address is already in use.
          </div>
        )}
        <div className="buttons-container">
          <Button type="submit" classes="submit">
            Create account
          </Button>
        </div>
      </form>
      <div className="redirect-container">
        <p>Already have an account?</p>
        <button className="redirect-buttom" onClick={props.redirectSingIn}>
          Sign in here &rarr;
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
