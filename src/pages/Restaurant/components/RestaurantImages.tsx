import { Img } from "react-image";
import ImageLoader from "../../../components/loaders/ImageLoader";
import FallbackImage from "../../../components/shared/FallbackImage";

const RestaurantImages = ({ images }: { images: string[] }) => {
  return (
    <div id="restaurant_images">
      <h2 className="text-gray-700 text-left font-bold text-2xl md:text-3xl mt-10 mb-7 border-b pb-5">
        {images.length} Photo{images.length > 1 ? "s" : ""}
      </h2>
      <div className="flex flex-wrap">
        {images.map((image, i) => (
          <Img
            key={i + Math.random()}
            className="w-45 md:w-56 h-44 mr-1 mb-1 object-cover"
            src={image}
            loader={<ImageLoader height={175} width={220} />}
            unloader={
              <FallbackImage classes="w-45 md:w-56 h-44 mr-1 mb-1 object-cover" />
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantImages;
