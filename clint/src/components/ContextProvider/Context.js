import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const ContextProvider = ({ children }) => {
  const [logindata, setloginData] = useState(false);

  return (
    <LoginContext.Provider value={{ logindata, setloginData }}>
      {children}
    </LoginContext.Provider>
  );
};
