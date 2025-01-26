import { createContext, useEffect, useState } from "react";

export const AuthTokenContext = createContext();

export default function AuthTokenContextProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthTokenContext.Provider value={{ token, setToken }}>
      {children}
    </AuthTokenContext.Provider>
  );
}
