import { useQuery } from "@tanstack/react-query";
import { tags } from "../../constants";
import axiosClient from "../axios";

export const useGetAllCuisinesQuery = () =>
  useQuery({
    queryKey: [tags.Cuisine],
    queryFn: async () => await axiosClient.get("/cuisine"),
  });
