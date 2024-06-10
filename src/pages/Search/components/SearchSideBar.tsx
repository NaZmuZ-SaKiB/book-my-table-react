import { SetURLSearchParams } from "react-router-dom";
import { useGetAllCuisinesQuery } from "../../../lib/Queries/Cuisine.query";
import { useGetAllLocationsQuery } from "../../../lib/Queries/Location.query";
import SearchSideBarItemLoading from "../../../components/loaders/SearchSideBarItemLoading";

type TProps = {
  searchParams: URLSearchParams;
  setSearchparams: SetURLSearchParams;
};

const prices = [
  { name: "CHEAP", value: "$" },
  { name: "REGULAR", value: "$$" },
  { name: "EXPENSIVE", value: "$$$" },
];

const SearchSideBar = ({ searchParams, setSearchparams }: TProps) => {
  const allQueryParams = () => Object.fromEntries(searchParams.entries());

  const { data: cuisineData, isLoading: loadingCuisine } =
    useGetAllCuisinesQuery();
  const { data: locationData, isLoading: loadingLocation } =
    useGetAllLocationsQuery();

  const cuisines = cuisineData?.data;
  const locations = locationData?.data;

  return (
    <div className="pr-2 w-full bg-white md:bg-gray-50">
      <div className="p-4 bg-white flex flex-col rounded shadow">
        <h1 className="mb-2 font-medium text-lg">Region</h1>
        {!loadingLocation ? (
          locations.map((location: { id: number; name: string }) => (
            <p
              key={location.id + location.name}
              className="font-light text-reg capitalize cursor-pointer"
              onClick={() =>
                setSearchparams({
                  ...allQueryParams(),
                  location: location.name,
                })
              }
            >
              {location.name}
            </p>
          ))
        ) : (
          <SearchSideBarItemLoading />
        )}
      </div>
      <div className="p-4 bg-white shadow rounded mt-3 flex flex-col">
        <h1 className="mb-2 font-medium text-lg">Cuisine</h1>
        {!loadingCuisine ? (
          cuisines.map((cuisine: { id: number; name: string }) => (
            <p
              key={cuisine.id + cuisine.name}
              className="font-light text-reg capitalize cursor-pointer"
              onClick={() =>
                setSearchparams({ ...allQueryParams(), cuisine: cuisine.name })
              }
            >
              {cuisine.name}
            </p>
          ))
        ) : (
          <SearchSideBarItemLoading />
        )}
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
      <span
        className="py-2 px-4 mb-2 ml-2 text-reg rounded-full cursor-pointer bg-red-700 text-white mt-3 inline-block"
        onClick={() => setSearchparams({})}
      >
        Reset Filters
      </span>
    </div>
  );
};

export default SearchSideBar;
