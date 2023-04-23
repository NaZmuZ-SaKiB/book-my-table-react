import axios from "axios";
import { useContext, useState } from "react";

import { GlobalState } from "../context/GlobalContext";

const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [resData, setresData] = useState(null);

  const { data, error, success, setGlobalState } = useContext(GlobalState);

  const createReservation = async ({
    slug,
    partySize,
    day,
    time,
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccasion,
    bookerRequest,
  }) => {
    setLoading(true);
    setresData(null);
    setGlobalState({ data, success, error, loading: false });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/booking/${slug}`,
        {
          bookerEmail,
          bookerPhone,
          bookerFirstName,
          bookerLastName,
          bookerOccasion,
          bookerRequest,
          booker_id: data?.id || null,
        },
        {
          params: { day, time, partySize },
          withCredentials: true,
        }
      );

      if (res.data?.status === "success") {
        setresData(res.data?.data);
        setGlobalState({
          data,
          success: res.data?.message,
          error: null,
          loading: false,
        });
      } else {
        setresData(null);
        setGlobalState({
          data,
          success: null,
          error: { message: res.data?.message, error: res.data?.error },
          loading: false,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setresData(null);
      setresData(null);
      setGlobalState({
        data,
        success: null,
        error: {
          error: `${error?.response?.data?.error}` || "Data Fetching Error",
          message:
            `${error?.response?.data?.message}` ||
            "Ops there was a problem. Please try loading the page again.",
        },
        loading: false,
      });
    }
  };
  return { loading, resData, createReservation };
};

export default useReservation;
