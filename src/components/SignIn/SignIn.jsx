import { useState } from "react";
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
    <div>
      <h1>Already have an account? </h1>
      <h2>Sign in with your email and password</h2>
      <form onSubmit={submitHandler}>
        <label>Email</label>
        <input
          type="email"
          required
          name="email"
          autoComplete="email"
          onChange={handleChange}
          value={email}
        ></input>

        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
          autoComplete="new-password"
          value={password}
        ></input>
        <button type="submit"> Sign In</button>
        <button onClick={signInWithGoogle}>Google sign in</button>
        <button onClick={signInWithFacebook}>Facebook sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
