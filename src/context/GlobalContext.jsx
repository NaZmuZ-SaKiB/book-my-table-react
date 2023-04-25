import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalState = createContext();

const GlobalContext = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    loading: true,
    data: null,
    error: null,
    success: null,
  });

  // Fetch User Function
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/auth/me`,
        { withCredentials: true }
      );

      if (res.data.status === "success") {
        setGlobalState({
          data: res.data.data,
          error: null,
          loading: false,
          success: null,
        });
      } else {
        setGlobalState({
          data: null,
          error: null,
          loading: false,
          success: null,
        });
      }
    } catch (error) {
      console.log(error);
      setGlobalState({
        data: null,
        error: null,
        loading: false,
        success: null,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <GlobalState.Provider value={{ ...globalState, setGlobalState }}>
      {children}
    </GlobalState.Provider>
  );
};

export default GlobalContext;
