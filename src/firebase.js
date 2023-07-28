import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI4JEgZgwRlSXId2JCFzrZ2Cp6sQgW7-s",
  authDomain: "attendify-system.firebaseapp.com",
  projectId: "attendify-system",
  storageBucket: "attendify-system.appspot.com",
  messagingSenderId: "162295424529",
  appId: "1:162295424529:web:305b97478ae9a008baf3b0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
