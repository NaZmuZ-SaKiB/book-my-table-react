import { Skeleton } from "@mui/material";

const SearchSideBarItemLoading = () => {
  return (
    <>
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
    </>
  );
};

export default SearchSideBarItemLoading;
