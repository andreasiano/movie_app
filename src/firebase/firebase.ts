import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrZ4LfIGayVs9lNLEV4uubbO_8AK9Pbhw",
  authDomain: "movieapp-36b1a.firebaseapp.com",
  projectId: "movieapp-36b1a",
  storageBucket: "movieapp-36b1a.appspot.com",
  messagingSenderId: "299213095332",
  appId: "1:299213095332:web:557ee3f06117a7e4620131",
  measurementId: "G-H8LTTWQCVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
