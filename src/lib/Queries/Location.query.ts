import { useQuery } from "@tanstack/react-query";
import { tags } from "../../constants";
import axiosClient from "../axios";

export const useGetAllLocationsQuery = () =>
  useQuery({
    queryKey: [tags.Location],
    queryFn: async () => await axiosClient.get("/location"),
  });
