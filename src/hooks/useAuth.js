import { useContext } from "react";
import axios from "axios";

import { GlobalState } from "../context/GlobalContext";

const useAuth = () => {
  const { data, setGlobalState } = useContext(GlobalState);

  // Sign In Function
  const signin = async (email, password, closeModal) => {
    setGlobalState({ data: null, error: null, loading: true, success: null });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.status === "success") {
        setGlobalState({
          data: res.data.data,
          error: null,
          loading: false,
          success: res.data.message,
        });
        closeModal();
      } else {
        setGlobalState({
          data: null,
          error: { error: res?.data?.error, message: res?.data?.message },
          loading: false,
          success: null,
        });
      }
    } catch (error) {
      console.log(error?.response);
      setGlobalState({
        data: null,
        error: {
          message:
            `${error?.response?.data?.message}` ||
            "Ops there was a problem. Please try again.",
          error: `${error?.response?.data?.error}` || "Authentication Error",
        },
        loading: false,
        success: null,
      });
    }
  };
  // Sign In Function End

  // Sign UP Function
  const signup = async (
    first_name,
    last_name,
    email,
    password,
    phone,
    city,
    closeModal
  ) => {
    try {
      setGlobalState({ data: null, error: null, loading: true });

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/auth/signup`,
        {
          first_name,
          last_name,
          email,
          password,
          phone,
          city,
        },
        { withCredentials: true }
      );

      if (res.data.status === "success") {
        setGlobalState({
          data: res.data?.data,
          error: null,
          loading: false,
          success: res.data.message,
        });
        closeModal();
      } else {
        setGlobalState({
          data: null,
          error: { error: res?.data?.error, message: res?.data?.message },
          loading: false,
          success: null,
        });
      }
    } catch (error) {
      console.log(error);
      setGlobalState({
        data: null,
        error: {
          message:
            `${error?.response?.data?.message}` ||
            "Ops there was a problem. Please try again.",
          error: `${error?.response?.data?.error}` || "Authentication Error",
        },
        loading: false,
        success: null,
      });
    }
  };
  // Sign UP Function End

  // Signout Function
  const signout = async () => {
    console.log("signout");
    try {
      setGlobalState({ data, error: null, success: null, loading: true });
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/auth/signout`,
        {
          withCredentials: true,
        }
      );
      if (res.data.status === "success") {
        setGlobalState({
          data: null,
          error: null,
          loading: false,
          success: res.data?.message,
        });
      } else {
        setGlobalState({
          data: data,
          error: { error: res?.data?.error, message: res?.data?.message },
          loading: false,
          success: null,
        });
      }
    } catch (error) {
      console.log(error);
      setGlobalState({
        data: null,
        error: {
          message:
            `${error?.response?.data?.message}` ||
            "Ops there was a problem. Please try again.",
          error: `${error?.response?.data?.error}` || "Authentication Error",
        },
        loading: false,
        success: null,
      });
    }
  };

  return { signin, signup, signout };
};

export default useAuth;
