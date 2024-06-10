import Loading from "../../../components/loaders/Loading";
import { useGetMyRestaurantsQuery } from "../../../lib/Queries/Restaurant.query";
import RestaurantRow from "./components/RestaurantRow";

const MyRestaurants = () => {
  const { data, isLoading } = useGetMyRestaurantsQuery();

  const restaurants = data?.data || [];

  if (isLoading) return <Loading />;
  return (
    <div className="mx-auto w-full max-w-screen-md p-2 pt-5">
      <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
        Your Restaurants
      </h2>

      <div className="overflow-auto rounded-md shadow w-full mx-auto">
        <table className="table-auto w-full whitespace-nowrap bg-white">
          <thead className="bg-gray-50 border-b-2 border-gray-200 h-10">
            <tr>
              <th className="px-2 text-sm sm:text-reg font-medium">
                Restaurant
              </th>
              <th className="px-2 text-sm sm:text-reg font-medium">Rating</th>
              <th className="px-2 text-sm sm:text-reg font-medium">Bookings</th>
              <th className="px-2 text-sm sm:text-reg font-medium">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {restaurants.map((restaurant: any) => (
              <RestaurantRow
                key={`My_Restaurant_${restaurant.id}`}
                restaurant={restaurant}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRestaurants;
