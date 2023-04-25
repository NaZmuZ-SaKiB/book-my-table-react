import { Card, Skeleton } from "@mui/material";
import React from "react";

const RestaurantLoading = () => {
  return (
    <div className="py-3 px-2 mt-5 lg:w-[900px] lg:mx-auto flex flex-wrap justify-center">
      {Array(9)
        .fill()
        .map((_, i) => (
          // className="animate-pulse m-3 bg-slate-200 w-64 h-72 rounded overflow-hidden border"
          <Card
            key={`restaurant_card_loading_${i}`}
            sx={{ width: 256, m: 2, boxShadow: "none" }}
            className="border rounded"
          >
            <Skeleton
              sx={{ height: 145 }}
              animation="wave"
              variant="rectangular"
            />
            <div className="p-2">
              <Skeleton
                animation="wave"
                height={25}
                width="80%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={20}
                width="60%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={15}
                width="55%"
                style={{ marginBottom: 12 }}
              />
            </div>
          </Card>
        ))}
    </div>
  );
};

export default RestaurantLoading;
