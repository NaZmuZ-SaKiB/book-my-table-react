import ReviewCard from "./ReviewCard";

export default function Reviews({ reviews }) {
  return (
    <div id="restaurant_reviews">
      <h2 className="font-bold text-left text-gray-700 text-2xl md:text-3xl borber-b my-5 md:my-10 border-b pb-5">
        What {reviews.length} people are saying
      </h2>
      <div>
        {reviews.length ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p>No Reviews!</p>
        )}
      </div>
    </div>
  );
}
