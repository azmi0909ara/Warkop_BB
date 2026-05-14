// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

import {
  getAuth,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZrvmKnYAT5QbjpokedigEqwVgh5aPLz8",
  authDomain: "warkopbb-b87a5.firebaseapp.com",
  projectId: "warkopbb-b87a5",
  storageBucket: "warkopbb-b87a5.firebasestorage.app",
  messagingSenderId: "7310638170",
  appId: "1:7310638170:web:ab2808ec578408cbcc2c63",
  measurementId: "G-Z79SK05WT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth =
  getAuth(app);