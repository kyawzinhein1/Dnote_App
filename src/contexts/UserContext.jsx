import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storeToken = localStorage.getItem("token");
    return storeToken ? JSON.parse(storeToken) : null;
  });

  const updateToken = (JWTtoken) => {
    const token = JSON.stringify(JWTtoken);
    localStorage.setItem("token", token);
    setToken(JWTtoken);
  };

  useEffect((_) => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  },[]);

  return (
    <UserContext.Provider value={{ token, updateToken }}>
      {children}
    </UserContext.Provider>
  );
};
