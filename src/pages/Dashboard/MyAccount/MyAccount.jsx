import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";

import { GlobalState } from "../../../context/GlobalContext";

const MyAccount = () => {
  const { data, setGlobalState } = useContext(GlobalState);
  const [inputs, setInputs] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInputs({
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      city: data?.city || "",
    });
  }, [data]);

  useEffect(() => {
    if (inputs && data) {
      if (
        inputs.first_name === data.first_name &&
        inputs.last_name === data.last_name &&
        inputs.email === data.email &&
        inputs.city === data.city
      ) {
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
        `${import.meta.env.VITE_BASE_API_URL}/auth/me`,
        { ...inputs },
        {
          withCredentials: true,
        }
      );
      if (res.data?.status === "success") {
        setGlobalState({
          error: null,
          loading: null,
          data: res.data?.data,
          success: res.data?.message,
        });
      } else {
        setGlobalState({
          error: { message: res.data?.message, error: res.data?.error },
          loading: null,
          data,
          success: null,
        });
      }
    } catch (error) {
      setGlobalState({
        data,
        success: null,
        loading: null,
        error: {
          message:
            `${error?.response?.data?.message}` ||
            "Ops there was a problem updating your info. Please try again.",
          error: `${error?.response?.data?.error}` || "Client Error",
        },
      });
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-screen-md mx-auto px-2">
      <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
        Your Account
      </h2>
      <div className="my-3 flex justify-between text-sm">
        <input
          onChange={handleChange}
          defaultValue={data?.first_name}
          className="border rounded px-2 py-3 w-[49%]"
          type="text"
          placeholder="First Name"
          name="first_name"
        />
        <input
          onChange={handleChange}
          defaultValue={data?.last_name}
          className="border rounded px-2 py-3 w-[49%]"
          type="text"
          placeholder="Last Name"
          name="last_name"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          onChange={handleChange}
          defaultValue={data?.email}
          className="border rounded px-2 py-3 w-full"
          type="email"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          onChange={handleChange}
          defaultValue={data?.phone}
          className="border rounded px-2 py-3 w-[49%]"
          type="text"
          placeholder="Phone"
          name="phone"
        />
        <input
          onChange={handleChange}
          defaultValue={data?.city}
          className="border rounded px-2 py-3 w-[49%]"
          type="text"
          placeholder="City"
          name="city"
        />
      </div>
      <button
        disabled={disabled || loading}
        onClick={handleClick}
        className="bg-gray-700 hover:bg-gray-700 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-200"
      >
        {loading ? (
          <CircularProgress size={30} color="primary" />
        ) : (
          "Update Info"
        )}
      </button>
      <Link
        to="/dashboard/change-password"
        className="text-sm underline text-blue-400 hover:text-blue-500 cursor-pointer"
      >
        Change Password
      </Link>
    </div>
  );
};

export default MyAccount;
