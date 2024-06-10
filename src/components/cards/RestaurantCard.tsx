import { Link } from "react-router-dom";
import getEvgRating from "../../utils/getAvgRating";
import { Img } from "react-image";
import ImageLoader from "../loaders/ImageLoader";
import FallbackImage from "../shared/FallbackImage";
import RatingStars from "../shared/RatingStars";
import Price from "../shared/Price";

const RestaurantCard = ({ restaurant }: { restaurant: any }) => {
  const { name, main_image, cuisine, price, location, slug, reviews } =
    restaurant;

  const getRandomBookedTimes = () => {
    return Math.ceil(Math.random() * 5) + 1;
  };

  const avgRating = getEvgRating(reviews);
  return (
    <div className="w-64 h-72 m-3 bg-white rounded overflow-hidden shadow cursor-pointer">
      <Link to={`/restaurant/${slug}`}>
        <Img
          src={main_image}
          className="w-full h-36 object-cover"
          loader={<ImageLoader height={145} width="100%" />}
          unloader={<FallbackImage classes="w-full h-36 object-cover" />}
        />
        <div className="p-2">
          <h3 className="font-bold text-2xl mb-2 hover:underline">{name}</h3>
          <div className="flex items-baseline">
            <RatingStars avgRating={avgRating} />
            <p className="ml-2">
              {reviews.length} review{reviews.length > 1 && "s"}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{cuisine.name}</p>
            <Price price={price} />
            <p>{location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">
            Booked {getRandomBookedTimes()} times today
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
