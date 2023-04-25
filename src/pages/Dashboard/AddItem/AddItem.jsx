import { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { GlobalState } from "../../../context/GlobalContext";

const AddItem = () => {
  const params = useParams();
  const { data: userData, setGlobalState } = useContext(GlobalState);

  const [inputs, setInputs] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (inputs?.name && inputs?.price && inputs.description) {
      setDisabled(false);
    } else {
      setDisabled(true);
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
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/item/${params.slug}`,
        {
          name: inputs.name,
          price: inputs.price,
          description: inputs.description,
        },
        { withCredentials: true }
      );
      if (res.data?.status === "success") {
        setGlobalState({
          data: userData,
          loading: false,
          error: null,
          success: res.data?.message,
        });

        navigate(`/dashboard/my-restaurant/${params.slug}/`);
      } else {
        setGlobalState({
          data: userData,
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
        data: userData,
        loading: false,
        success: null,
        error: {
          message:
            `${error?.response?.data?.message}` ||
            "Ops! there was a problem submitting your item. Please try again later.",
          error: `${error?.response?.data?.error}` || "Client Error",
        },
      });
    }
    setLoading(false);
  };
  return (
    <div className="w-full max-w-screen-md mx-auto p-2">
      <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
        Add Item
      </h2>
      <div className="my-3 flex justify-between text-sm">
        <input
          onChange={handleChange}
          className="border rounded px-2 py-3 w-full"
          type="text"
          placeholder="Name"
          name="name"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          onChange={handleChange}
          className="border rounded px-2 py-3 w-full"
          type="text"
          placeholder="Price (Ex: 5.55)"
          name="price"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <textarea
          onChange={handleChange}
          className="border rounded px-2 py-3 w-full resize-none"
          placeholder="Description"
          name="description"
          rows={4}
        />
      </div>
      <button
        onClick={handleClick}
        disabled={disabled || loading}
        className="bg-gray-700 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-200"
      >
        {loading ? <CircularProgress size={30} color="inherit" /> : "Add Item"}
      </button>
    </div>
  );
};

export default AddItem;
