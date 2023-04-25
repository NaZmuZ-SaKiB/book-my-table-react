import axios from "axios";

const getAllLocationAndCuisine = async () => {
  const locationRes = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}/location`
  );
  const cuisineRes = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}/cuisine`
  );

  return { locationData: locationRes.data, cuisineData: cuisineRes.data };
};

export default getAllLocationAndCuisine;
