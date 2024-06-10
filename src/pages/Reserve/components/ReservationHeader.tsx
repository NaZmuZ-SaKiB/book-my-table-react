import { Img } from "react-image";
import ImageLoader from "../../../components/loaders/ImageLoader";
import FallbackImage from "../../../components/shared/FallbackImage";

type TProps = { image: string; name: string; date: string; partySize: string };

const ReservationHeader = ({ image, name, date, partySize }: TProps) => {
  const day = date.split("T")[0];

  let displayDay: string | string[] = new Date(day)
    .toDateString()
    .split(" ")
    .slice(0, -1);

  displayDay[0] += ",";
  displayDay = displayDay.join(" ");

  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-bold">{"You're almost done!"}</h3>
      <div className="mt-5 flex items-center">
        <Img
          src={image}
          loader={<ImageLoader height={96} width={160} />}
          unloader={
            <FallbackImage classes="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-cover rounded" />
          }
          className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-cover rounded"
        />
        <div className="ml-2 sm:ml-4">
          <h1 className="text-lg sm:text-3xl font-medium sm:font-bold">
            {name}
          </h1>
          <div className="flex mt-3 text-reg sm:text-lg">
            <p className="mr-6">{displayDay}</p>
            <p className="mr-6">
              {partySize} {parseInt(partySize) === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationHeader;
