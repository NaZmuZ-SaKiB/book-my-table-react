import axios from "axios";
import { useState } from "react";

export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setdata] = useState(null);

  const fetchAvailabilities = async ({ slug, partySize, day, time }) => {
    setLoading(true);
    setdata(null);
    setError(null);
    console.log({ partySize, day, time });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/restaurant/${slug}/availability`,
        {
          params: { day, time, partySize },
        }
      );

      if (res?.data?.status === "success") {
        setdata(res?.data?.data);
        setError(null);
      } else {
        setdata(null);
        setError({ message: res?.data?.message, error: res?.data?.error });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setdata(null);
      setError({
        error: error?.response?.data?.message || "Data Fetching Error",
        message:
          error?.response?.data?.error ||
          "Ops there was a problem. Please try loading the page again.",
      });
    }
  };

  return { loading, data, error, fetchAvailabilities, setdata };
}
