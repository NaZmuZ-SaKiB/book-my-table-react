import React from "react";

const RestaurantLoading = () => {
  return (
    <div className="py-3 px-2 mt-5 lg:w-[900px] lg:mx-auto flex flex-wrap justify-center">
      {Array(9)
        .fill()
        .map((_, i) => (
          <div
            key={`restaurant_card_loading_${i}`}
            className="animate-pulse m-3 bg-slate-200 w-64 h-72 rounded overflow-hidden border"
          ></div>
        ))}
    </div>
  );
};

export default RestaurantLoading;
