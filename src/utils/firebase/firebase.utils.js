import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYGkyxwCibPm2-CtlzyfAKyDnC4dI53JY",
  authDomain: "crwn-clothing-db-d1256.firebaseapp.com",
  projectId: "crwn-clothing-db-d1256",
  storageBucket: "crwn-clothing-db-d1256.appspot.com",
  messagingSenderId: "414365655988",
  appId: "1:414365655988:web:c5d0ed7907f92fb5cb88e1",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;

  //if user data doesnot exist
  // create / set the document with the data from userAuth in my collection

  // if user data exists
  // return userDocRef
};
