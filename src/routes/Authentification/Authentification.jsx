import "./Authentification.scss";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
  sightInWithGooglePopup,
  signInWIthFacebook,
} from "../../../src/utilits/farebase";
import SignUpForm from "../../components/SightUpForm/SignUp";
import SignIn from "../../components/SignIn/SignIn";

const Authentification = () => {
  const logGoogleUser = async () => {
    const userDocRef = await sightInWithGooglePopup();
  };

  const logFacebookUser = async () => {
    const userDocRef = await signInWIthFacebook();
  };

  return (
    <div className="signin-container">
      <h1>SingIn</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>
      <button onClick={logFacebookUser}>Sign in with facebook</button>
      <SignUpForm />
      <SignIn />
    </div>
  );
};

export default Authentification;
