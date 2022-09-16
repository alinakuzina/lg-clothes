import "./Authentification.scss";
import { useState } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  sightInWithGooglePopup,
  signInWIthFacebook,
} from "../../../src/utilits/farebase";
import SignUpForm from "../../components/SightUpForm/SignUp";
import SignIn from "../../components/SignIn/SignIn";
import image from "../../assets/auth-img.jpg";

const Authentification = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  const showSignInHandler = () => {
    setShowSignIn((prev) => !prev);
  };
  return (
    <div className="signin-container">
      <div>
        {showSignIn && <SignIn redirectSingUp={showSignInHandler} />}
        {!showSignIn && <SignUpForm redirectSingIn={showSignInHandler} />}
      </div>

      <img src={image} className="auth-img" />
    </div>
  );
};

export default Authentification;
