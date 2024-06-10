import ReviewCard from "../../../components/cards/ReviewCard";

type TProps = {
  reviews: {
    id: number;
    first_name: string;
    last_name: string;
    rating: number;
    text: string;
  }[];
};

const Reviews = ({ reviews }: TProps) => {
  return (
    <div id="restaurant_reviews">
      <h2 className="font-bold text-left text-gray-700 text-2xl md:text-3xl borber-b my-5 md:my-10 border-b pb-5">
        {reviews.length > 0
          ? `What ${reviews.length} people are saying`
          : "No Reviews!"}
      </h2>
      <div>
        {reviews.length
          ? reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Reviews;
