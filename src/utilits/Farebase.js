import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
  updateCurrentUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  refEqual,
  collection,
  getDocs,
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

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  display: "popup",
});

export const auth = getAuth();

export const sightInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider).then((result) => {
    createUserDocumentFromAuth(result.user);
  });

export const signInWIthFacebook = () => {
  signInWithPopup(auth, facebookProvider).then((result) => {
    createUserDocumentFromAuth(result.user);
  });
};
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
        id: userSnapshot.id,
        displayName,
        email,
        createAt,
        orders: [],
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
    console.log(error.message);
    return error.message;
  }
};

export const signInWithEmail = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);

//// Recieve products

export const recieveProducts = async (url) => {
  const docRef = doc(database, "products", url);
  const docSnap = await getDoc(docRef);
  let newProducts = [];
  if (docSnap.exists()) {
    for (let key in docSnap.data()) {
      newProducts.push(docSnap.data()[key]);
    }
  }
  return newProducts;
};

///Recieve categories array
export const recieveCategories = async () => {
  const docRef = await getDocs(collection(database, "categories"));
  let newCategories = [];
  docRef.forEach((doc) => {
    let arr = doc.data();
    newCategories.push(arr);
  });
  return newCategories;
};

export const addNewOrderToBase = async (userId, order) => {
  const userDocRef = doc(database, "users", userId);
  //recieve from firebase if this user already exist in base and all info
  const userSnapshot = await getDoc(userDocRef);
  const orders = [...userSnapshot.data().orders, order];

  try {
    await updateDoc(userDocRef, {
      ...userSnapshot.data(),
      orders: orders,
    });
  } catch (error) {
    console.log(error, "add order to database");
  }
};


//const Recieve user orders

export const recieveUserOrders = async(userId)=>{
  const userDocRef = doc(database, "users", userId);
  //recieve from firebase if this user already exist in base and all info
  const userSnapshot = await getDoc(userDocRef);
  const orders = userSnapshot.data().orders;
  return orders;
}