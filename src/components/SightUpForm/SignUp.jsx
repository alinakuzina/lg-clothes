import { useState } from "react";
import {
  createUserWithEmail,
  createUserDocumentFromAuth,
} from "../../utilits/farebase";
import Button from "../Button/Button";
import "./SignUp.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = (props) => {
  const [formFields, setFormFiels] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFiels({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFiels(defaultFormFields);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(
        "Password and Confirm Password should be the same . Please check your data."
      );
      return;
    }

    try {
      const response = await createUserWithEmail(email, password);
      await createUserDocumentFromAuth(response.user, { displayName });
      resetFormFields();
    } catch (error) {
      console.log(error);
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
          {" "}
          <input
            className="form-input "
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
            className="form-input "
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
