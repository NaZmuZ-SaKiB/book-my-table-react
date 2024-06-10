const getEvgRating = (reviews: { rating: number }[]) => {
  let avgRating;
  if (!reviews.length) {
    avgRating = 0;
  } else {
    avgRating =
      reviews.reduce((prev, next) => prev + next.rating, 0) / reviews.length;
  }

  return avgRating;
};

export default getEvgRating;
