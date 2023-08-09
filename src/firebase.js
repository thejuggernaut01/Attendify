import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import firebase from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvhSbEGYmR1AuTQCIMPDiiOXRZnEM09V4",
  authDomain: "attendify-web-app.firebaseapp.com",
  projectId: "attendify-web-app",
  storageBucket: "attendify-web-app.appspot.com",
  messagingSenderId: "160515846006",
  appId: "1:160515846006:web:d4f8fd55bc15439cfc1457"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
