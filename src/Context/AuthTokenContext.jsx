import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthTokenContext = createContext();

export default function AuthTokenContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      decodeToken(storedToken);
    }
  }, []);

  function decodeToken(token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    setUserData(decodedToken);
  }

  return (
    <AuthTokenContext.Provider
      value={{ token, setToken, decodeToken, userData }}
    >
      {children}
    </AuthTokenContext.Provider>
  );
}
