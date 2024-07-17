import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const contextValue = {
    token,
    setToken: (newToken) => {
      setToken(newToken);
      if (newToken) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
      }
    }
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
