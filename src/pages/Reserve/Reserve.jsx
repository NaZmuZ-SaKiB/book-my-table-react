import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

import Header from "./components/Header";
import Form from "./components/Form";
import { useEffect } from "react";

const Reserve = () => {
  const params = useParams();
  const [searchParams, setSearchparams] = useSearchParams();
  const date = searchParams.get("date");
  const partySize = searchParams.get("partySize");

  const getRestaurantBySlug = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/restaurant/${params.slug}`
    );
    return data;
  };

  const { data, isInitialLoading } = useQuery({
    queryKey: ["getRestaurantBySlug", params.slug],
    queryFn: async () => await getRestaurantBySlug(),
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
