import RatingStars from "../shared/RatingStars";

type TProps = {
  review: {
    id: number;
    first_name: string;
    last_name: string;
    rating: number;
    text: string;
  };
};

const ReviewCard = ({ review }: TProps) => {
  return (
    <div className="border-b pb-4 md:pb-7 mb-4 md:mb-7">
      <div className="flex items-center">
        <div className="w-1/6 flex flex-col items-center">
          <div className="rounded-full bg-gray-700 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
            <h2 className="text-white text-base md:text-2xl capitalize">
              {review.first_name[0]} {review.last_name[0]}
            </h2>
          </div>
          <p className="text-center text-sm md:text-lg capitalize">
            {review.first_name} {review.last_name}
          </p>
        </div>
        <div className="  ml-2 pl-3 md:pl-10 w-5/6">
          <div className="flex items-center">
            <div className="flex mr-5">
              <RatingStars avgRating={review.rating} />
            </div>
          </div>
          <div className="mt-3 md:mt-5">
            <p className="text-sm sm:text-reg font-light">{review.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
