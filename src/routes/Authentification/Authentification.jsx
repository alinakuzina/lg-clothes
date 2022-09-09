import "./Authentification.scss";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
  sightInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../../src/utilits/farebase";
import SignUpForm from "../../components/SightUpForm/SignUp";
import SignIn from "../../components/SignIn/SignIn";

const Authentification = () => {
  const logGoogleUser = async () => {
    const response = await sightInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div className="signin-container">
      <h1>SingIn</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>
      <SignUpForm />
      <SignIn />
    </div>
  );
};

export default Authentification;
