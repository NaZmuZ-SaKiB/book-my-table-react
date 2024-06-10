import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { ReviewValidation } from "../../components/forms/AddReview";
import axiosClient from "../axios";

export const useAddReviewMutation = () =>
  useMutation({
    mutationFn: async (data: {
      slug: string;
      review: z.infer<typeof ReviewValidation>;
    }) => await axiosClient.post(`/review/${data.slug}`, data.review),
  });
