import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  const [loading, setLoading] = useState(false);
  const [startSession, setStartSession] = useState(false);
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setCurrentUser(user);
    });

    return subscribe;
  });

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    startSession,
    setStartSession,
    showSessionDetails,
    setShowSessionDetails,
    showCode,
    setShowCode,

    signUp,
    login,
    logout,
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
