// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpWK7SbxV5_6vvtEz1mRY1P7b2sivigqY",
  authDomain: "movie-app-61b18.firebaseapp.com",
  projectId: "movie-app-61b18",
  storageBucket: "movie-app-61b18.appspot.com",
  messagingSenderId: "413040610947",
  appId: "1:413040610947:web:dcf83b55a9b621276ed5b6",
  measurementId: "G-MZDJS09C6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Now the auth is tied to the initialized app

export { auth }; // Export the auth object for use in your components
