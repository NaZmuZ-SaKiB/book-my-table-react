import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { CreateItemValidation } from "../../pages/Dashboard/AddItem/AddItem.page";
import axiosClient from "../axios";

type TAddItem = {
  slug: string;
  item: z.infer<typeof CreateItemValidation>;
};

export const useAddItemMutation = () =>
  useMutation({
    mutationFn: async (data: TAddItem) =>
      await axiosClient.post(`/item/${data.slug}`, data.item),
  });
