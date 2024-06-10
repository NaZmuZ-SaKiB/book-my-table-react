import { redirect, useNavigate, useParams } from "react-router-dom";
import { useGetRestaurantBySlugQuery } from "../../lib/Queries/Restaurant.query";
import Loading from "../../components/loaders/Loading";
import RestaurantHeader from "./components/RestaurantHeader";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Rating from "../../components/shared/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantImages from "./components/RestaurantImages";
import RestaurantMenu from "./components/RestaurantMenu";
import Reviews from "./components/Reviews";
import AddReview from "../../components/forms/AddReview";

const Restaurant = () => {
  const { slug } = useParams();
  if (!slug) redirect("/");

  const navigate = useNavigate();

  const { data, isLoading } = useGetRestaurantBySlugQuery(slug as string);
  if (isLoading) return <Loading />;

  const restaurant = data?.data;

  if (!restaurant) navigate("/404");

  return (
    <div className="flex-1">
      <RestaurantHeader
        name={restaurant?.name}
        location={restaurant?.location}
        main_image={restaurant?.main_image}
      />
      <div className="relative flex m-auto w-full sm:w-[85%] lg:max-w-screen-lg justify-between items-start 0 -mt-8 sm:-mt-9 md:-mt-11">
        <div className="bg-white w-full lg:w-[70%] rounded p-3 pt-1 shadow">
          <RestaurantNavbar />
          <div id="restaurant_title">
            <div className="hidden md:block mt-4 border-b pb-6">
              <h1 className="font-bold text-gray-700 text-6xl">
                {restaurant?.name}
              </h1>
            </div>

            <Rating reviews={restaurant?.reviews} />

            <div className="mt-4">
              <p className="text-base sm:text-lg font-light">
                {restaurant?.description}
              </p>
            </div>

            <div className="mt-3 lg:hidden">
              <ReservationCard
                openTime={restaurant?.open_time}
                closeTime={restaurant?.close_time}
                slug={slug as string}
              />
            </div>
          </div>

          <RestaurantImages images={restaurant?.images} />

          <RestaurantMenu items={restaurant?.items} />

          <Reviews reviews={restaurant?.reviews} />

          <AddReview slug={slug as string} />
        </div>
        <div className="hidden lg:block sticky top-10 w-[27%] text-reg">
          <ReservationCard
            openTime={restaurant?.open_time}
            closeTime={restaurant?.close_time}
            slug={slug as string}
          />
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
