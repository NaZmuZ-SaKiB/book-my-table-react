import RestaurantCard from "../../components/cards/RestaurantCard";
import Header from "../../components/shared/Header";
import { useGetAllRestaurantsQuery } from "../../lib/Queries/Restaurant.query";
import HomeLoading from "./components/HomeLoading";

const Home = () => {
  const { data, isLoading } = useGetAllRestaurantsQuery();

  const restaurants = data?.data;

  if (isLoading) {
    return <HomeLoading />;
  }

  return (
    <div className="flex-1">
      <Header />
      <div className="py-3 px-2 mt-5 lg:w-[900px] lg:mx-auto flex flex-wrap justify-center">
        {restaurants ? (
          restaurants.map((restaurant: any, index: number) => (
            <RestaurantCard
              key={restaurant.name + index}
              restaurant={restaurant}
            />
          ))
        ) : (
          <h2 className="text-center font-medium text-2xl">
            No Restaurants Found!
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;
