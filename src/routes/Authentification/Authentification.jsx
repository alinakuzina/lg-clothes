import style from "./Authentification.module.scss";
import { useState } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  sightInWithGooglePopup,
  signInWIthFacebook,
} from "../../utilits/Farebase";
import SignUpForm from "../../components/SightUpForm/SignUp";
import SignIn from "../../components/SignIn/SignIn";
import image from "../../assets/auth-img.jpg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/User/UserSelector";
import { useEffect } from "react";

const Authentification = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const user = useSelector(selectCurrentUser);
  const showSignInHandler = () => {
    setShowSignIn((prev) => !prev);
  };

  return (
    <div className={style.signin_container}>
      <div>
        {user && (
          <div className={style.greating_container}>
            <div className={style.main_header}>
              Wellcome back {user.displayName} !
            </div>
            <div>We have many new items for you !</div>
          </div>
        )}

        {showSignIn && !user && <SignIn redirectSingUp={showSignInHandler} />}
        {!showSignIn && !user && (
          <SignUpForm redirectSingIn={showSignInHandler} />
        )}
      </div>

      <img src={image} className={style.auth_img} />
    </div>
  );
};

export default Authentification;
