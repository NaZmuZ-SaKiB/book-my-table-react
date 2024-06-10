import { useSearchParams } from "react-router-dom";
import SearchBox from "./components/SearchBox";
import SearchSideBar from "./components/SearchSideBar";
import { useGetAllRestaurantsQuery } from "../../lib/Queries/Restaurant.query";
import SearchResultLoading from "../../components/loaders/SearchResultLoading";
import RestaurantCardVertical from "../../components/cards/RestaurantCardVertical";
import { useEffect } from "react";

const Search = () => {
  const [searchParams, setSearchparams] = useSearchParams();

  const { data, isFetching, refetch } = useGetAllRestaurantsQuery(searchParams);
  const restaurants = data?.data;

  useEffect(() => {
    refetch();
  }, [searchParams, setSearchparams, refetch]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-grow">
        <SearchBox />

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

          {isFetching ? (
            <SearchResultLoading />
          ) : (
            <div className="w-full md:pl-2">
              {restaurants?.length ? (
                restaurants.map((restaurant: any) => (
                  <RestaurantCardVertical
                    key={restaurant.id}
                    restaurant={restaurant}
                  />
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
    </div>
  );
};

export default Search;
