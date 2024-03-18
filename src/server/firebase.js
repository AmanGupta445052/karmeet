import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyB-FYUcKGUZzD70gwKRA2G6Fp_Ee2WeF7c",
  authDomain: "karmeet-7cfcc.firebaseapp.com",
  projectId: "karmeet-7cfcc",
  storageBucket: "karmeet-7cfcc.appspot.com",
  messagingSenderId: "232748520595",
  appId: "1:232748520595:web:54eb8548b4a05d0efee966",
  measurementId: "G-2BTQVV1KW5"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
