import { createContext, useState } from "react";
import React from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ childern }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {childern}
    </AuthContext.Provider>
  );
};

export default AuthContext;
