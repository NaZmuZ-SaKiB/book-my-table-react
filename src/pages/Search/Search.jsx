import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Search = () => {
  const [searchParams, setSearchparams] = useSearchParams();

  const getFilteredRestaurants = async () => {
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

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 1);
  }, [searchParams]);

  const { data, isInitialLoading, refetch } = useQuery({
    queryKey: ["getFilteredRestaurants", "searchPage"],
    queryFn: async () => await getFilteredRestaurants(),
  });
  return (
    <div className="pt-8 sm:pt-10 md:pt-12">
      <Header />
      <div className="md:flex pt-2 pb-4 px-2 m-auto w-full md:max-w-screen-md justify-between items-start relative">
        <label className="md:hidden" htmlFor="filter-toggle">
          <p className="px-4 py-1 my-2 inline-block text-sm rounded border cursor-pointer font-medium">
            Filters
          </p>
        </label>
        <input hidden type="checkbox" id="filter-toggle" />

        <div className="absolute z-50 top-0 border-r -left-[100%] md:static  pt-2 bg-white w-[90%] max-w-[250px] h-full  transition-all">
          <SearchSideBar
            setSearchparams={setSearchparams}
            searchParams={searchParams}
          />
          <label
            className="absolute md:hidden right-2 top-1"
            htmlFor="filter-toggle"
          >
            <p className=" inline-block  font-medium cursor-pointer ">Close</p>
          </label>
        </div>

        {isInitialLoading ? (
          "Loading..."
        ) : (
          <div className="w-full">
            {data?.data?.length ? (
              data?.data.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            ) : (
              <p>No restaurant found :(</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
