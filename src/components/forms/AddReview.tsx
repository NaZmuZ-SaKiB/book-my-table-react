import { z } from "zod";
import CustomForm from "./CustomForm";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomRatingInput from "./CustomRatingInput";
import CustomInput from "./CustomInput";
import { Alert, CircularProgress } from "@mui/material";
import { isUserLoggedIn } from "../../lib/auth";
import { useAddReviewMutation } from "../../lib/Queries/Review.query";
import { useState } from "react";
import { TResponse } from "../../lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { tags } from "../../constants";

export const ReviewValidation = z.object({
  text: z
    .string({
      invalid_type_error: "Review must be a string",
    })
    .min(1, { message: "Review is required" }),

  rating: z.number({
    invalid_type_error: "Rating must be a number",
  }),
});

const AddReview = ({ slug }: { slug: string }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = isUserLoggedIn();

  const queryClient = useQueryClient();

  const { mutateAsync: addReviewFn, isPending } = useAddReviewMutation();

  const handleAddReview: SubmitHandler<
    z.infer<typeof ReviewValidation>
  > = async (values) => {
    if (!user) return;
    setError("");

    const result = (await addReviewFn({
      slug,
      review: values,
    })) as unknown as TResponse;

    if (result.success) {
      setSuccess(result.message);
      queryClient.invalidateQueries({
        queryKey: [tags.Restaurant, slug],
      });
    } else {
      setError(result.message);
    }
  };

  const defaultValues = {
    text: "",
    rating: 3,
  };

  if (!user) return null;
  return (
    <div>
      <p className="font-bold mb-3">Leave a Rating</p>
      {error && (
        <Alert severity="error" className="my-5" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          className="my-5"
          onClose={() => setSuccess("")}
        >
          {success}
        </Alert>
      )}
      <CustomForm
        onSubmit={handleAddReview}
        resolver={zodResolver(ReviewValidation)}
        defaultValues={defaultValues}
      >
        <div className="flex items-center">
          <CustomRatingInput name="rating" />
        </div>

        <div className="my-5 flex justify-between text-sm">
          <CustomInput
            name="text"
            placeholder="Review"
            label="Review"
            fullWidth
            size="small"
            type="text"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-gray-700 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-200"
        >
          {isPending ? (
            <CircularProgress size={30} color="primary" />
          ) : (
            "Submit Review"
          )}
        </button>
      </CustomForm>
    </div>
  );
};

export default AddReview;
