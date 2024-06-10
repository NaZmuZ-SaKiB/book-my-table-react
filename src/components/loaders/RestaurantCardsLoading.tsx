import RestaurantCardLoading from "./RestaurantCardLoading";

const RestaurantCardsLoading = () => {
  return (
    <div className="py-3 px-2 mt-5 lg:w-[900px] lg:mx-auto flex flex-wrap justify-center">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <RestaurantCardLoading key={`restaurant_card_loading_${i}`} />
        ))}
    </div>
  );
};

export default RestaurantCardsLoading;
