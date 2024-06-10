import { Skeleton } from "@mui/material";

const ImageLoader = ({
  height,
  width,
}: {
  height: number | string;
  width: number | string;
}) => {
  return (
    <Skeleton sx={{ height, width }} animation="wave" variant="rectangular" />
  );
};

export default ImageLoader;
