import { useMutation, useQuery } from "@tanstack/react-query";
import { tags } from "../../constants";
import axiosClient from "../axios";
import { z } from "zod";
import { AccountUpdateValidation } from "../../components/forms/MyAccountForm";

export const useGetLoggedInUserQuery = () =>
  useQuery({
    queryKey: [tags.User],
    queryFn: async () => await axiosClient.get("/auth/me"),
  });

export const useUpdateUserMutation = () =>
  useMutation({
    mutationFn: async (data: z.infer<typeof AccountUpdateValidation>) =>
      await axiosClient.patch("/auth/me", data),
  });
