import { Img } from "react-image";

const FallbackImage = ({ classes }: { classes: string }) => {
  return (
    <Img
      src="/assets/image-not-found.png"
      className={classes || "object-cover"}
    />
  );
};

export default FallbackImage;
