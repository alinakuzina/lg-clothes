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
import image from "../../assets/auth-img.jpg";

const Authentification = () => {
  const logGoogleUser = async () => {
    const userDocRef = await sightInWithGooglePopup();
  };

  const logFacebookUser = async () => {
    const userDocRef = await signInWIthFacebook();
  };

  return (
    <div className="signin-container">
      <div>
        <h1>SingIn</h1>
        {/* <SignUpForm /> */}
        <SignIn />
      </div>
      <img src={image} className="auth-img" />
    </div>
  );
};

export default Authentification;
