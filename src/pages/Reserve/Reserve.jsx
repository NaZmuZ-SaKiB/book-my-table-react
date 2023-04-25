import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

import getRestaurantBySlug from "../../queries/getRestaurantBySlug";
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

  if (isInitialLoading) return <div>Loading...</div>;
  else {
    const { name, main_image, slug } = data.data;
    return (
      <div>
        <div className="py-5 px-2 w-full max-w-screen-md m-auto">
          <Header
            image={main_image}
            name={name}
            date={date}
            partySize={partySize}
          />
          <Form slug={slug} partySize={partySize} date={date} />
        </div>
      </div>
    );
  }
};

export default Reserve;
