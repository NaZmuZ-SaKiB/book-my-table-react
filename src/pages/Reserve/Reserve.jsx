import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

import Footer from "../../components/Footer";
import getRestaurantBySlug from "../../queries/getRestaurantBySlug";
import Loader from "../../components/Loader";
import Header from "./components/Header";
import Form from "./components/Form";

const Reserve = () => {
  const params = useParams();
  const [searchParams, setSearchparams] = useSearchParams();
  const date = searchParams.get("date");
  const partySize = searchParams.get("partySize");

  const { data, isInitialLoading } = useQuery({
    queryKey: ["getRestaurantBySlug", params.slug, "reservePage"],
    queryFn: async () => await getRestaurantBySlug(params.slug),
  });

  if (isInitialLoading) return <Loader />;
  else {
    const { name, main_image, slug } = data.data;
    return (
      <div className="flex flex-col min-h-screen">
        <div className="py-5 px-2 w-full max-w-screen-md m-auto flex-grow">
          <Header
            image={main_image}
            name={name}
            date={date}
            partySize={partySize}
          />
          <Form slug={slug} partySize={partySize} date={date} />
        </div>
        <Footer />
      </div>
    );
  }
};

export default Reserve;
