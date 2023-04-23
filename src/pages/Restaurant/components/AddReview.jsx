import { useContext, useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import { CircularProgress } from "@mui/material";

import { GlobalState } from "../../../context/GlobalContext";

import axios from "axios";

export default function AddReview({ slug, refetch }) {
  const [rating, setRating] = useState(3);
  const [text, setText] = useState("");
  const inputRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const { data, setGlobalState } = useContext(GlobalState);

  useEffect(() => {
    if (text) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [text]);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/review/${slug}`,
        {
          rating,
          text,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data?.status === "success") {
        setGlobalState({
          data,
          loading: false,
          success: res.data?.message,
          error: null,
        });
        inputRef.current.value = "";
        setDisabled(true);
        refetch();
      } else {
        setGlobalState({
          data,
          loading: false,
          success: null,
          error: {
            message: res.data?.message,
            error: res.data?.error,
          },
        });
      }
    } catch (error) {
      setGlobalState({
        data,
        loading: false,
        success: null,
        error: {
          message:
            error.response.data?.message ||
            "Ops there was a problem submitting your review.",
          error: error.response.data?.error || "Client Error",
        },
      });
    }
    setLoading(false);
  };
  if (!data) {
    return null;
  } else
    return (
      <div>
        <p className="font-bold mb-3">Leave a Rating</p>
        <div className="flex items-center">
          <Rating
            name="half-rating"
            onChange={(e, value) => setRating(value)}
            defaultValue={3}
            precision={0.5}
          />
          <span className="ml-2">({rating || 0})</span>
        </div>
        <div className="my-3 flex justify-between text-sm">
          <input
            className="border rounded px-2 py-3 w-full"
            type="text"
            placeholder="Comment"
            onChange={(e) => setText(e.target.value)}
            ref={inputRef}
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
            "Submit Review"
          )}
        </button>
      </div>
    );
}
