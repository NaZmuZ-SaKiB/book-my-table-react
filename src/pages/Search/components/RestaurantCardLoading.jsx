import { Skeleton } from "@mui/material";
import React from "react";

const RestaurantCardLoading = () => {
  return (
    <div className="w-full">
      {Array(5)
        .fill()
        .map((_, i) => (
          <div
            key={`restaurant_card_loading_${i}`}
            className="border-b flex pb-5"
          >
            <Skeleton
              sx={{ height: 145, width: 175, borderRadius: 1 }}
              animation="wave"
              variant="rectangular"
            />
            <div className="pl-2 max-w-full">
              <Skeleton
                sx={{ height: 25, width: 150 }}
                animation="wave"
                style={{ marginBottom: 10 }}
              />
              <Skeleton
                sx={{ height: 15, width: 120 }}
                animation="wave"
                style={{ marginBottom: 10 }}
              />
              <Skeleton
                sx={{ height: 15, width: 120 }}
                animation="wave"
                style={{ marginBottom: 40 }}
              />
              <Skeleton sx={{ height: 15, width: 135 }} animation="wave" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default RestaurantCardLoading;
