import axios from "axios";

const getMyBookings = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}/booking/my`,
    { withCredentials: true }
  );
  return data;
};

export default getMyBookings;
