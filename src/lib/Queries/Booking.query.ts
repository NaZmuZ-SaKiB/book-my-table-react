import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "../axios";
import { tags } from "../../constants";

export const useAddBookingMutation = () =>
  useMutation({
    mutationFn: async (data: { slug: string; bookingData: any; params: any }) =>
      await axiosClient.post(`/booking/${data.slug}`, data.bookingData, {
        params: data.params,
      }),
  });

export const useGetMyBookingsQuery = () =>
  useQuery({
    queryKey: [tags.Booking],
    queryFn: async () => await axiosClient.get(`/booking/my`),
  });

export const useCancelBookingMutation = () =>
  useMutation({
    mutationFn: async (bookingId: string) =>
      await axiosClient.delete(`/booking/${bookingId}`),
  });
