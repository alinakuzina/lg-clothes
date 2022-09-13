import { useState } from "react";
import "./SignIn.scss";
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

const SignIn = () => {
  const [signInFields, setsignInFiels] = useState(defaultSignInFields);
  const { email, password } = signInFields;

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
      console.log(response);
      setsignInFiels(defaultSignInFields);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("Wrong password");
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
            className="form-input"
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

        <button type="submit"> Sign In</button>
        <button onClick={signInWithGoogle}>Google sign in</button>
        <button onClick={signInWithFacebook}>Facebook sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
