import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import getFilteredRestaurants from "../../queries/getFilteredRestaurants";
import RestaurantCardLoading from "./components/RestaurantCardLoading";
import Footer from "../../components/Footer";

const Search = () => {
  const [searchParams, setSearchparams] = useSearchParams();

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 1);
  }, [searchParams]);

  const { data, isInitialLoading, refetch } = useQuery({
    queryKey: ["getFilteredRestaurants", "searchPage"],
    queryFn: async () => await getFilteredRestaurants(searchParams),
  });
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <div className="md:flex pt-2 pb-4 px-2 m-auto w-full md:max-w-screen-md justify-between items-start relative">
          <label className="md:hidden" htmlFor="filter-toggle">
            <p className="px-4 py-1 my-2 bg-white inline-block text-sm rounded border cursor-pointer font-medium">
              Filters
            </p>
          </label>
          <input hidden type="checkbox" id="filter-toggle" />

          <div className="absolute z-50 top-0 -left-[100%] md:static  pt-2 bg-white w-[90%] max-w-[250px] h-full  transition-all">
            <SearchSideBar
              setSearchparams={setSearchparams}
              searchParams={searchParams}
            />
            <label
              className="absolute md:hidden right-5 top-3"
              htmlFor="filter-toggle"
            >
              <p className="inline-block  font-medium cursor-pointer ">Close</p>
            </label>
          </div>

          {isInitialLoading ? (
            <RestaurantCardLoading />
          ) : (
            <div className="w-full md:pl-2">
              {data?.data?.length ? (
                data?.data.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))
              ) : (
                <p>
                  No restaurant found :( <br />
                  Only ottawa, toronto and niagara is available now.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
