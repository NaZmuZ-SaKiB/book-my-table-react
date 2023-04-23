import { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";

import { GlobalState } from "../../../context/GlobalContext";

const ChangePassword = () => {
  const [inputs, setInputs] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(null);

  const { data, setGlobalState } = useContext(GlobalState);

  useEffect(() => {
    if (inputs !== null) {
      if (!inputs.currentPass || !inputs.newPass || !inputs.confirmNewPass) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [inputs]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_API_URL}/auth/password`,
        { ...inputs },
        { withCredentials: true }
      );
      if (res.data?.status === "success") {
        setGlobalState({
          data,
          loading: false,
          error: null,
          success: res.data?.message,
        });
      } else {
        setGlobalState({
          data,
          loading: false,
          error: {
            message: res.data?.message,
            error: res.data?.error,
          },
          success: null,
        });
      }
    } catch (error) {
      setGlobalState({
        data,
        loading: false,
        success: null,
        error: {
          message:
            `${error?.response?.data?.message}` ||
            "Ops there was a problem changing your password. Please try again.",
          error: `${error?.response?.data?.error}` || "Client Error",
        },
      });
    }

    setLoading(false);
  };
  return (
    <div>
      <h2 className="text-center text-3xl font-bold text-blue-500 mb-5 lg:mb-10">
        Change Your Password
      </h2>
      <div className="my-3 flex justify-between text-sm">
        <input
          onChange={handleChange}
          className="border rounded px-2 py-3 w-full"
          type="password"
          placeholder="Current Password"
          name="currentPass"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          onChange={handleChange}
          className="border rounded px-2 py-3 w-full"
          type="password"
          placeholder="Password"
          name="newPass"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          onChange={handleChange}
          className="border rounded px-2 py-3 w-full"
          type="password"
          placeholder="Confirm Password"
          name="confirmNewPass"
        />
      </div>
      <button
        onClick={handleClick}
        disabled={disabled || loading}
        className="bg-blue-500 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-200"
      >
        {loading ? (
          <CircularProgress size={30} color="primary" />
        ) : (
          "Change Password"
        )}
      </button>
    </div>
  );
};

export default ChangePassword;
