import axios from "axios";

const getAllRestaurants = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}/restaurant`
  );
  return data;
};

export default getAllRestaurants;
