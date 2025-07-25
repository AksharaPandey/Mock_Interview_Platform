// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy1iWk5f90v1yKEEAblgvMV5__NZXU0jQ",
  authDomain: "algopanel.firebaseapp.com",
  projectId: "algopanel",
  storageBucket: "algopanel.firebasestorage.app",
  messagingSenderId: "438747470542",
  appId: "1:438747470542:web:e3247d7a76427fda9b8e9f",
  measurementId: "G-6DN84RXC5R"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);