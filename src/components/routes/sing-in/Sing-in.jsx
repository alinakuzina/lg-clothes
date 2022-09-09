import "./Sing-in.scss";
import {
  createUserDocumentFromAuth,
  sightInWithGooglePopup,
} from "../../../utilits/farebase";

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
    </div>
  );
};

export default SignIn;
