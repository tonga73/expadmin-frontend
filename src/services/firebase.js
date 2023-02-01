import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  projectId: "expadmin-4de9a",
  appId: "1:944700620635:web:9266d6c5a070aa1fa2247e",
  storageBucket: "expadmin-4de9a.appspot.com",
  apiKey: "AIzaSyDDp9QuHsE93hSBK0IWVqJq7dDItkbzVd0",
  authDomain: "expadmin-4de9a.firebaseapp.com",
  messagingSenderId: "944700620635",
  measurementId: "G-86Q6PPXBP3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  auth.signInWithPopup(provider).then((e) => {
    const { profile } = e.additionalUserInfo;

    return profile;
  });

export default firebase;
