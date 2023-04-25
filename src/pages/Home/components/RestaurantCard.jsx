import React from "react";
import { Link } from "react-router-dom";

import Price from "../../../components/Price";
import RatingStars from "../../../components/RatingStars";
import getEvgRating from "../../../../utils/avgRating";

const RestaurantCard = ({ restaurant }) => {
  const { name, main_image, cuisine, price, location, slug, reviews } =
    restaurant;

  const getRandomBookedTimes = () => {
    return Math.ceil(Math.random() * 5) + 1;
  };

  const avgRating = getEvgRating(reviews);
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link to={`/restaurant/${slug}`}>
        <img src={main_image} alt="" className="w-full h-36" />
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
