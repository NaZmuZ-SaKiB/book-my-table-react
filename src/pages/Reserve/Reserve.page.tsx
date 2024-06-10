import { redirect, useParams, useSearchParams } from "react-router-dom";
import { useGetRestaurantBySlugQuery } from "../../lib/Queries/Restaurant.query";
import Loading from "../../components/loaders/Loading";
import ReservationHeader from "./components/ReservationHeader";
import ReservationForm from "../../components/forms/ReservationForm";

const Reserve = () => {
  const { slug } = useParams();
  if (!slug) redirect("/");

  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const partySize = searchParams.get("partySize");

  if (!date || !partySize) redirect("/restaurant/" + slug);

  const { data, isLoading } = useGetRestaurantBySlugQuery(slug as string);
  const restaurant = data?.data;

  if (isLoading) return <Loading />;

  const { name, main_image } = restaurant;
  return (
    <div className="py-5 px-2 w-full max-w-screen-md m-auto flex-1">
      <ReservationHeader
        image={main_image}
        name={name}
        date={date as string}
        partySize={partySize as string}
      />

      <ReservationForm
        slug={slug as string}
        date={date as string}
        partySize={partySize as string}
      />

      <p className="mt-4 text-sm bg-white p-3 rounded shadow">
        By clicking “Complete reservation” you agree to the BookMyTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
    </div>
  );
};

export default Reserve;
