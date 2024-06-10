import { Img } from "react-image";
import getEvgRating from "../../utils/getAvgRating";
import ImageLoader from "../loaders/ImageLoader";
import FallbackImage from "../shared/FallbackImage";
import RatingStars from "../shared/RatingStars";
import Price from "../shared/Price";
import { Link } from "react-router-dom";

const RestaurantCardVertical = ({ restaurant }: { restaurant: any }) => {
  const { name, main_image, location, price, cuisine, slug, reviews } =
    restaurant;

  const avgRating = getEvgRating(reviews);
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
      <Img
        src={main_image}
        className="w-24 sm:w-44 object-cover rounded"
        loader={<ImageLoader height={140} width={175} />}
        unloader={<FallbackImage classes="w-24 sm:w-44 object-cover rounded" />}
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
};

export default RestaurantCardVertical;
