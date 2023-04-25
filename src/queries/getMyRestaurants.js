import axios from "axios";

const getMyRestaurants = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}/restaurant/my`,
    { withCredentials: true }
  );

  return data;
};

export default getMyRestaurants;
