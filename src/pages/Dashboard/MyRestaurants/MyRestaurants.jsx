import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

import getMyRestaurants from "../../../queries/getMyRestaurants";
import Restaurant from "./Restaurant";

const MyRestaurants = () => {
  const { data, isInitialLoading } = useQuery({
    queryKey: ["my-restaurants"],
    queryFn: async () => await getMyRestaurants(),
  });

  if (isInitialLoading) {
    return (
      <div className="w-full flex justify-center">
        <CircularProgress color="primary" />
      </div>
    );
  } else {
    const { data: restaurants } = data;
    return (
      <div className="mx-auto w-full max-w-screen-md px-2">
        {restaurants.length ? (
          <>
            <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
              Your Restaurants
            </h2>
            <div className="overflow-auto rounded-md shadow w-full mx-auto">
              <table className="table-auto w-full whitespace-nowrap">
                <thead className="bg-gray-50 border-b-2 border-gray-200 h-10">
                  <tr>
                    <th className="px-2 text-sm sm:text-reg font-medium">
                      Restaurant
                    </th>
                    <th className="px-2 text-sm sm:text-reg font-medium">
                      Rating
                    </th>
                    <th className="px-2 text-sm sm:text-reg font-medium">
                      Bookings
                    </th>
                    <th className="px-2 text-sm sm:text-reg font-medium">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {restaurants.map((restaurant) => (
                    <Restaurant
                      key={`My_Restaurant_${restaurant.id}`}
                      restaurant={restaurant}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h2 className="text-center text-3xl font-bold text-red-600">
            Could not find any restaurant. Please try again later.
          </h2>
        )}
      </div>
    );
  }
};

export default MyRestaurants;
