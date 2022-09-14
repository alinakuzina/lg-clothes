import "./Authentification.scss";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  sightInWithGooglePopup,
  signInWIthFacebook,
} from "../../../src/utilits/farebase";
import SignUpForm from "../../components/SightUpForm/SignUp";
import SignIn from "../../components/SignIn/SignIn";
import image from "../../assets/auth-img.jpg";

const Authentification = () => {
  return (
    <div className="signin-container">
      <div>
        {/* <SignUpForm /> */}
        <SignIn />
      </div>
      <img src={image} className="auth-img" />
    </div>
  );
};

export default Authentification;
