import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [startSession, setStartSession] = useState(false);
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const value = {
    startSession,
    setStartSession,
    showSessionDetails,
    setShowSessionDetails,
    showCode,
    setShowCode,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
