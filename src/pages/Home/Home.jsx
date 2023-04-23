import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Header from "../../components/Header";
import RestaurantCard from "../..//components/RestaurantCard";
import RestaurantLoading from "./components/RestaurantLoading";

const Home = () => {
  const getAllRestaurants = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/restaurant`
    );
    return data;
  };

  const { data: restaurants, isInitialLoading } = useQuery({
    queryKey: ["getAllRestaurants"],
    queryFn: async () => await getAllRestaurants(),
  });

  if (isInitialLoading) {
    return (
      <>
        <Header />
        <RestaurantLoading />
      </>
    );
  } else {
    return (
      <div>
        <Header />
        <div className="py-3 px-2 mt-5 lg:w-[900px] lg:mx-auto flex flex-wrap justify-center">
          {restaurants?.data ? (
            restaurants.data.map((restaurant) => (
              <RestaurantCard key={restaurant.name} restaurant={restaurant} />
            ))
          ) : (
            <h2 className="text-center font-medium text-2xl">
              No Restaurants Found!
            </h2>
          )}
        </div>
      </div>
    );
  }
};

export default Home;
