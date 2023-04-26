import { Skeleton } from "@mui/material";

const ImageLoader = ({ height, width }) => {
  return (
    <Skeleton sx={{ height, width }} animation="wave" variant="rectangular" />
  );
};

export default ImageLoader;
