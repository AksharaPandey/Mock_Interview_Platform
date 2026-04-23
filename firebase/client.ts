import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy1iWk5f90v1yKEEAblgvMV5__NZXU0jQ",
  authDomain: "algopanel.firebaseapp.com",
  projectId: "algopanel",
  storageBucket: "algopanel.firebasestorage.app",
  messagingSenderId: "438747470542",
  appId: "1:438747470542:web:e3247d7a76427fda9b8e9f",
  measurementId: "G-6DN84RXC5R"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);