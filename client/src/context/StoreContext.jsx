import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Stored Token:", storedToken, "hi"); // Debugging log
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); 
  }, []);

  const contextValue = {
    token,
    loading,
    setToken: (newToken) => {
      setToken(newToken);
      if (newToken) {
        localStorage.setItem("token", newToken);
        console.log("Token set in localStorage:", newToken); // Debugging log
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
