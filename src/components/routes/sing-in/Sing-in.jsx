import "./Sing-in.scss";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
  sightInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../../utilits/farebase";
import SignUpForm from "../../SightUpForm/SignUp";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await sightInWithGooglePopup();
    console.log(response);
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div className="signin-container">
      <h1>SingIn</h1>
      <button onClick={logGoogleUser}>Sign in with googl</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
