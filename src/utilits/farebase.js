import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  refEqual,
} from "firebase/firestore";

//Authentication

const firebaseConfig = {
  apiKey: "AIzaSyC8MBAffEdTIHzfAVbtr-3q00jwJHqBI_o",
  authDomain: "lg-clothe.firebaseapp.com",
  projectId: "lg-clothe",
  storageBucket: "lg-clothe.appspot.com",
  messagingSenderId: "325856835408",
  appId: "1:325856835408:web:c2fa927019fb51f927de55",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const sightInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//Store user data
export const database = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  //recieve response form google with dates
  const userDocRef = doc(database, "users", userAuth.uid);
  //recieve from firebase if this user already exist in base and all info
  const userSnapshot = await getDoc(userDocRef);

  //check if exist
  //if does not exiist - create new userData
  //return userDocRef
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log(error, "create user");
    }
  }

  return userDocRef;
};

export const createUserWithEmail = async (email, password) => {
  if (!email || !password) return;
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Cannot create a user, email already in use");
      return;
    } else {
      console.log(error);
    }
  }
};
