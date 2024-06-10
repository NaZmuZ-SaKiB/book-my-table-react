import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "../axios";
import { z } from "zod";
import { SignInValidation } from "../../components/forms/SignInForm";
import { getUserInfo } from "../auth";
import { tags } from "../../constants";
import { SignUpValidation } from "../../components/forms/SignUpForm";

export const useAuth = () =>
  useQuery({
    queryKey: [tags.Auth],
    queryFn: async () => await getUserInfo(),
  });

export const useSignInMutation = () =>
  useMutation({
    mutationFn: async (data: z.infer<typeof SignInValidation>) =>
      await axiosClient.post("/auth/signin", data),
  });

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: async (data: z.infer<typeof SignUpValidation>) =>
      await axiosClient.post("/auth/signup", data),
  });

export const useChangePasswordMutation = () =>
  useMutation({
    mutationFn: async (data: { oldPassword: string; newPassword: string }) =>
      await axiosClient.patch("/auth/password", data),
  });

export const useGetNewTokenQuery = () =>
  useQuery({
    queryKey: ["new token"],
    queryFn: async () => await axiosClient.get("/auth/new-token"),
    enabled: false,
  });
