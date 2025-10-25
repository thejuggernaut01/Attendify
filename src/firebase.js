import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import firebase from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsOzzMY6jGoZ0Bh2_XBOpZx9XTigMU7U4",
  authDomain: "hifoodsapp.firebaseapp.com",
  databaseURL: "https://hifoodsapp-default-rtdb.firebaseio.com",
  projectId: "hifoodsapp",
  storageBucket: "hifoodsapp.firebasestorage.app",
  messagingSenderId: "950825648489",
  appId: "1:950825648489:web:660353e9b71a3626aafdf8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
