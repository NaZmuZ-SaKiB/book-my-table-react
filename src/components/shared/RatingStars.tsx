const RatingStars = ({ avgRating }: { avgRating: number }) => {
  const percentage = ((avgRating * 100) / 5).toFixed(2);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(90deg, #FDAF07  ${percentage}%, #D8D9DB  ${percentage}%)`,
        display: "flex",
      }}
    >
      <img className="inline-block w-full" src="/assets/full-star.png" alt="" />
    </div>
  );
};

export default RatingStars;
