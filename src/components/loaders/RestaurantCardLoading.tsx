import { Card, Skeleton } from "@mui/material";

const RestaurantCardLoading = () => {
  return (
    <Card
      sx={{ width: 256, m: 2, boxShadow: "none" }}
      className="shadow rounded"
    >
      <Skeleton sx={{ height: 145 }} animation="wave" variant="rectangular" />
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
  );
};

export default RestaurantCardLoading;
