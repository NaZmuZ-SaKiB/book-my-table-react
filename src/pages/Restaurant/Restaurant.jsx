import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Header from "./components/Header";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import AddReview from "./components/AddReview";
import ReservationCard from "./components/ReservationCard";
import Menu from "../../components/Menu";

const Restaurant = () => {
  const params = useParams();

  const getRestaurantBySlug = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/restaurant/${params.slug}`
    );
    return data;
  };

  const { data, isInitialLoading, refetch } = useQuery({
    queryKey: ["getRestaurantBySlug", params.slug],
    queryFn: async () => await getRestaurantBySlug(),
  });

  console.log(data?.data);
  if (isInitialLoading) return <div>Loading...</div>;
  else {
    const {
      name,
      main_image,
      slug,
      location,
      reviews,
      description,
      images,
      open_time,
      close_time,
      items,
    } = data.data;
    return (
      <>
        <Header name={name} location={location} main_image={main_image} />
        <div className="relative flex m-auto w-full sm:w-[85%] lg:max-w-screen-lg justify-between items-start 0 -mt-8 sm:-mt-9 md:-mt-11">
          <div className="bg-white w-full lg:w-[70%] rounded p-3 pt-1 shadow">
            <RestaurantNavBar />
            <div id="restaurant_title">
              <Title name={name} />
              <Rating reviews={reviews} />
              <Description description={description} />
              <div className="mt-3 lg:hidden">
                <ReservationCard
                  openTime={open_time}
                  closeTime={close_time}
                  slug={slug}
                />
              </div>
            </div>
            <Images images={images} />
            <Menu items={items} />
            <Reviews reviews={reviews} />
            <AddReview slug={slug} refetch={refetch} />
          </div>
          <div className="hidden lg:block w-[27%] text-reg">
            <ReservationCard
              openTime={open_time}
              closeTime={close_time}
              slug={slug}
            />
          </div>
        </div>
      </>
    );
  }
};

export default Restaurant;
