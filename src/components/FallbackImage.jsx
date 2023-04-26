import React from "react";
import { Img } from "react-image";

const FallbackImage = ({ classes }) => {
  return (
    <Img
      src="/assets/image-not-found.png"
      className={classes || "object-cover"}
    />
  );
};

export default FallbackImage;
