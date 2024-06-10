type TProps = {
  name: string;
  location: { name: string };
  main_image: string;
};

const RestaurantHeader = ({ name, location, main_image }: TProps) => {
  return (
    <div className="overflow-hidden">
      <div
        className={`pb-12 pt-7 sm:pb-14 sm:pt-10 md:pb-24 md:pt-20 h-full flex justify-center items-center`}
        style={{
          background: `linear-gradient(to right, #0f1f47e6, #0f1f47e6), url(${main_image})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl 2xl:text-7xl text-white capitalize text-shadow text-center">
          {name}-({location.name})
        </h1>
      </div>
    </div>
  );
};

export default RestaurantHeader;
