import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient, { TResponse } from "../axios";
import { tags } from "../../constants";
import { z } from "zod";
import { AddRestaurantValidation } from "../../pages/Dashboard/AddRestaurant/AddRestaurant";
import { UpdateRestaurantValidation } from "../../pages/Dashboard/UpdateRestaurant/UpdateRestaurant.page";

type TAvailabilities = {
  slug: string;
  partySize: number;
  day: string;
  time: string;
};

type TAddRestaurant = z.infer<typeof AddRestaurantValidation> & {
  images: string[];
  tables: number[];
};

type TUpdateRestaurant = {
  slug: string;
  restaurant: z.infer<typeof UpdateRestaurantValidation>;
};

export const useGetAllRestaurantsQuery = (params: any = {}) =>
  useQuery({
    queryKey: [tags.Restaurants],
    queryFn: async () => await axiosClient.get("/restaurant", { params }),
  });

export const useGetRestaurantBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: [tags.Restaurant, slug],
    queryFn: async () =>
      (await axiosClient.get(`/restaurant/${slug}`)) as TResponse,
  });

export const useAvailabilitiesQuery = ({
  slug,
  partySize,
  day,
  time,
}: TAvailabilities) =>
  useQuery({
    queryKey: [tags.Availability],
    queryFn: async () =>
      await axiosClient.get(`/restaurant/${slug}/availability`, {
        params: { day, time, partySize },
      }),
    enabled: false,
  });

export const useAddRestaurantMutation = () =>
  useMutation({
    mutationFn: async (data: TAddRestaurant) =>
      await axiosClient.post("/restaurant", data),
  });

export const useGetMyRestaurantsQuery = () =>
  useQuery({
    queryKey: [tags.MyRestaurants],
    queryFn: async () => await axiosClient.get("/restaurant/my"),
  });

export const useUpdateRestaurantMutation = () =>
  useMutation({
    mutationFn: async (data: TUpdateRestaurant) =>
      await axiosClient.patch(`/restaurant/${data.slug}`, data.restaurant),
  });
