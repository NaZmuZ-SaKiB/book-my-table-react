import axios from "axios";

const getRestaurantBySlug = async (slug) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}/restaurant/${slug}`
  );
  return data;
};

export default getRestaurantBySlug;
