import React, { createContext, useState } from "react";
export const LoginContext = createContext("");
function Context({ children }) {
  const [logindata, setLoginData] = useState("");
  return (
    <div>
      <LoginContext.Provider value={{ logindata, setLoginData }}>
        {children}
      </LoginContext.Provider>
    </div>
  );
}

export default Context;
