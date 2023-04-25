import { Skeleton } from "@mui/material";
import React from "react";

const SearchSiceBarLoading = () => {
  return (
    <div className="pr-2 w-full">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        <Skeleton
          animation="wave"
          height={15}
          width="50%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={15}
          width="50%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={15}
          width="50%"
          style={{ marginBottom: 6 }}
        />
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        <Skeleton
          animation="wave"
          height={15}
          width="50%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={15}
          width="50%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={15}
          width="50%"
          style={{ marginBottom: 6 }}
        />
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex pb-4 border-b justify-between">
          <Skeleton
            animation="wave"
            height={60}
            width="32%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={60}
            width="32%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={60}
            width="32%"
            style={{ marginBottom: 6 }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSiceBarLoading;
