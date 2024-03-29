import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import getAllLocationAndCuisine from "../../../queries/getAllLocationAndCuisine";
import SearchSiceBarLoading from "./SearchSiceBarLoading";

const prices = [
  { name: "CHEAP", value: "$" },
  { name: "REGULAR", value: "$$" },
  { name: "EXPENSIVE", value: "$$$" },
];

const SearchSideBar = ({ searchParams, setSearchparams }) => {
  const allQueryParams = () => Object.fromEntries(searchParams.entries());

  useEffect(() => {}, []);

  const { data, isInitialLoading } = useQuery({
    queryKey: ["getAllLocation", "getAllCuisine", "searchSideBar"],
    queryFn: async () => await getAllLocationAndCuisine(),
  });

  if (isInitialLoading) return <SearchSiceBarLoading />;
  else
    return (
      <div className="pr-2 w-full bg-white md:bg-gray-50">
        <div className="p-4 bg-white flex flex-col rounded shadow">
          <h1 className="mb-2 font-medium text-lg">Region</h1>
          {data?.locationData?.data.map((location) => (
            <p
              key={location.id + location.name}
              className="font-light text-reg capitalize cursor-pointer"
              onClick={() =>
                setSearchparams({ ...allQueryParams(), city: location.name })
              }
            >
              {location.name}
            </p>
          ))}
        </div>
        <div className="p-4 bg-white shadow rounded mt-3 flex flex-col">
          <h1 className="mb-2 font-medium text-lg">Cuisine</h1>
          {data?.cuisineData?.data.map((cuisine) => (
            <p
              key={cuisine.id + cuisine.name}
              className="font-light text-reg capitalize cursor-pointer"
              onClick={() =>
                setSearchparams({ ...allQueryParams(), cuisine: cuisine.name })
              }
            >
              {cuisine.name}
            </p>
          ))}
        </div>
        <div className="p-4 bg-white shadow rounded mt-3">
          <h1 className="mb-2 font-medium text-lg">Price</h1>
          <div className="flex">
            {prices.map((price) => (
              <p
                key={price.value}
                className="border w-full text-reg p-2 font-light rounded text-center cursor-pointer"
                onClick={() =>
                  setSearchparams({ ...allQueryParams(), price: price.name })
                }
              >
                {price.value}
              </p>
            ))}
          </div>
        </div>
        <p
          to="/search"
          className="py-2 px-4 mb-2 ml-2 text-reg rounded-full cursor-pointer bg-red-700 text-white mt-3 inline-block"
          onClick={() => setSearchparams({})}
        >
          Reset Filters
        </p>
      </div>
    );
};

export default SearchSideBar;
