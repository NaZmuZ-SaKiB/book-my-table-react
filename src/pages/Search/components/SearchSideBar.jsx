import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const prices = [
  { name: "CHEAP", value: "$" },
  { name: "REGULAR", value: "$$" },
  { name: "EXPENSIVE", value: "$$$" },
];

const SearchSideBar = ({ searchParams, setSearchparams }) => {
  const allQueryParams = () => Object.fromEntries(searchParams.entries());

  useEffect(() => {}, []);

  const getAllLocationAndCuisine = async () => {
    const locationRes = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/location`
    );
    const cuisineRes = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/cuisine`
    );

    return { locationData: locationRes.data, cuisineData: cuisineRes.data };
  };
  const { data, isInitialLoading } = useQuery({
    queryKey: ["getAllLocation", "getAllCuisine", "searchPage"],
    queryFn: async () => await getAllLocationAndCuisine(),
  });

  if (isInitialLoading) return null;
  else
    return (
      <div className="pr-2 w-full">
        <div className="border-b pb-4 flex flex-col">
          <h1 className="mb-2">Region</h1>
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
        <div className="border-b pb-4 mt-3 flex flex-col">
          <h1 className="mb-2">Cuisine</h1>
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
        <div className="mt-3 pb-4">
          <h1 className="mb-2">Price</h1>
          <div className="flex pb-4 border-b">
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
          <p
            to="/search"
            className="py-2 px-4 text-reg rounded-full cursor-pointer bg-red-700 text-white mt-3 inline-block"
            onClick={() => setSearchparams({})}
          >
            Reset Filters
          </p>
        </div>
      </div>
    );
};

export default SearchSideBar;
