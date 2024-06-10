import RestaurantCardVerticalLoading from "./RestaurantCardVerticalLoading";

const SearchResultLoading = () => {
  return (
    <div className="w-full">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <RestaurantCardVerticalLoading key={`restaurant_card_loading_${i}`} />
        ))}
    </div>
  );
};

export default SearchResultLoading;
