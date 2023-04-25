import axios from "axios";

const getFilteredRestaurants = async (searchParams) => {
  const where = {};
  const city = searchParams.get("city");
  if (city) {
    const location = {
      name: { equals: city.toLowerCase() },
    };
    where.location = location;
  }

  const cuisine = searchParams.get("cuisine");
  if (cuisine) {
    where.cuisine = {
      name: { equals: cuisine.toLowerCase() },
    };
  }

  const price = searchParams.get("price");
  if (price) {
    where.price = price;
  }

  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}/restaurant`,
    { params: { where } }
  );

  return data;
};

export default getFilteredRestaurants;
