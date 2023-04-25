import { Link } from "react-router-dom";

import Price from "../../../components/Price";
import RatingStars from "../../../components/RatingStars";
import getEvgRatting from "../../../../utils/avgRating";

export default function RestaurantCard({ restaurant }) {
  const { name, main_image, location, price, cuisine, slug, reviews } =
    restaurant;

  const avgRating = getEvgRatting(reviews);
  let ratingText;

  if (avgRating > 4) {
    ratingText = "Awesome";
  } else if (avgRating <= 4 && avgRating >= 3) {
    ratingText = "Good";
  } else if (avgRating <= 3 && avgRating > 0) {
    ratingText = "Average";
  } else {
    ratingText = "Not Rated";
  }

  return (
    <div className="flex my-4 bg-white rounded shadow">
      <img
        src={main_image}
        alt=""
        className="w-24 sm:w-44 object-cover rounded"
      />
      <div className="pl-3 sm:pl-5 py-2">
        <h2 className="text-2xl sm:text-3xl">{name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <RatingStars avgRating={avgRating} />
          </div>
          <p className="ml-2 text-sm">{ratingText}</p>
        </div>
        <div className="mb-4">
          <div className="font-light flex text-reg">
            <Price price={price} />
            <p className="mr-4">{cuisine.name}</p>
            <p className="mr-4">{location.name}</p>
          </div>
        </div>
        <div className="text-red-600 hover:underline">
          <Link to={`/restaurant/${slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
}
