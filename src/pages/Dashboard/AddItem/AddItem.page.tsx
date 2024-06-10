import { SubmitHandler } from "react-hook-form";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import CustomForm from "../../../components/forms/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import CustomInput from "../../../components/forms/CustomInput";
import CustomTextArea from "../../../components/forms/CustomTextArea";
import { useAddItemMutation } from "../../../lib/Queries/Item.query";
import { TResponse } from "../../../lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { tags } from "../../../constants";

export const CreateItemValidation = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string.",
    })
    .min(1, { message: "Name is required." }),

  price: z.coerce
    .number({
      invalid_type_error: "Price must be a number.",
    })
    .min(1, { message: "Price is required." }),

  description: z
    .string({
      invalid_type_error: "Description must be a string.",
    })
    .min(1, { message: "Description is required." }),
});

const defaultValues = {
  name: "",
  price: 0,
  description: "",
};

const AddItem = () => {
  const { slug } = useParams();
  if (!slug) redirect("/dashboard/my-restaurants");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync: addItemFn, isPending } = useAddItemMutation();

  const handleSubmit: SubmitHandler<
    z.infer<typeof CreateItemValidation>
  > = async (values) => {
    setError("");

    const result = (await addItemFn({
      slug: slug as string,
      item: values,
    })) as unknown as TResponse;

    if (result.success) {
      queryClient.invalidateQueries({
        queryKey: [tags.Restaurant, slug],
      });

      navigate(`/dashboard/my-restaurants/${slug}`);
    } else {
      setError(result.message);
    }
  };
  return (
    <div className="w-full max-w-screen-md mx-auto p-2 pt-5">
      <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
        Add Item
      </h2>

      <div className="bg-white px-3 py-5 rounded shadow">
        {error && (
          <Alert severity="error" className="my-5" onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        <CustomForm
          onSubmit={handleSubmit}
          resolver={zodResolver(CreateItemValidation)}
          defaultValues={defaultValues}
        >
          <div className="my-4">
            <CustomInput
              name="name"
              label="Name"
              placeholder="Name"
              fullWidth
            />
          </div>
          <div className="my-4">
            <CustomInput
              name="price"
              label="Price"
              placeholder="Price"
              type="number"
              fullWidth
            />
          </div>
          <div className="my-4">
            <CustomTextArea name="description" placeholder="Description" />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-gray-700 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-200"
          >
            {isPending ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              "Add Item"
            )}
          </button>
        </CustomForm>
      </div>
    </div>
  );
};

export default AddItem;
