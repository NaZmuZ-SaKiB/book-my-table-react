import { z } from "zod";
import Loading from "../loaders/Loading";
import CustomForm from "./CustomForm";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import { Alert, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useAddBookingMutation } from "../../lib/Queries/Booking.query";
import { useState } from "react";
import { TResponse } from "../../lib/axios";
import { useGetLoggedInUserQuery } from "../../lib/Queries/User.query";

type TProps = { slug: string; partySize: string; date: string };

const ReserveValidation = z.object({
  booker_email: z
    .string({
      invalid_type_error: "Booker email must be a string",
    })
    .email({ message: "Invalid email" }),

  booker_first_name: z
    .string({
      invalid_type_error: "Booker first name must be a string",
    })
    .min(1, { message: "First name is required" }),

  booker_last_name: z
    .string({
      invalid_type_error: "Booker last name must be a string",
    })
    .min(1, { message: "Last name is required" }),

  booker_phone: z
    .string({
      invalid_type_error: "Booker phone must be a string",
    })
    .min(1, { message: "Phone number is required" }),

  booker_occasion: z
    .string({
      invalid_type_error: "Booker occasion must be a string",
    })
    .optional(),

  booker_request: z
    .string({
      invalid_type_error: "Booker request must be a string",
    })
    .optional(),
});

const ReservationForm = ({ slug, partySize, date }: TProps) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { data, isLoading } = useGetLoggedInUserQuery();

  const [day, time] = date.split("T");

  const { mutateAsync: createReservation, isPending } = useAddBookingMutation();

  const handleReservation: SubmitHandler<
    z.infer<typeof ReserveValidation>
  > = async (values) => {
    setError("");
    setSuccess("");

    const result = (await createReservation({
      slug,
      bookingData: values,
      params: { day, time, partySize },
    })) as unknown as TResponse;

    if (!result.success) {
      setError(result.message);
    } else {
      setSuccess(result.message);
    }
  };

  if (isLoading) return <Loading />;

  const user = data?.data;
  const defaultValues = {
    booker_email: user?.email || "",
    booker_first_name: user?.first_name || "",
    booker_last_name: user?.last_name || "",
    booker_phone: user?.phone || "",
    booker_occasion: "",
    booker_request: "",
  };

  return (
    <div className="mt-5 w-full bg-white px-3 py-5 rounded shadow">
      {error && (
        <Alert severity="error" className="my-5">
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" className="my-5">
          {success}
        </Alert>
      )}

      {!success ? (
        <>
          <CustomForm
            onSubmit={handleReservation}
            resolver={zodResolver(ReserveValidation)}
            defaultValues={defaultValues}
          >
            <div className="flex gap-4 max-md:flex-col justify-between">
              <CustomInput
                name="booker_first_name"
                label="First Name"
                placeholder="First Name"
                fullWidth
                size="small"
              />
              <CustomInput
                name="booker_last_name"
                label="Last Name"
                placeholder="Last Name"
                fullWidth
                size="small"
              />
            </div>
            <div className="my-4 flex gap-4 max-md:flex-col justify-between">
              <CustomInput
                name="booker_email"
                label="Email"
                fullWidth
                placeholder="Email"
                size="small"
              />

              <CustomInput
                name="booker_phone"
                label="Phone"
                fullWidth
                placeholder="Phone"
                size="small"
              />
            </div>
            <div className="mt-8 mb-4 flex gap-4 flex-col justify-between">
              <CustomInput
                name="booker_occasion"
                label="Occasion"
                fullWidth
                placeholder="Occasion"
                size="small"
              />
              <CustomInput
                name="booker_request"
                label="Special Request"
                fullWidth
                placeholder="Special Request"
                size="small"
              />
            </div>

            <button
              disabled={isPending}
              type="submit"
              className="bg-gray-700 w-full p-3 text-white font-bold rounded disabled:bg-gray-200"
            >
              {isPending ? (
                <CircularProgress color="inherit" />
              ) : (
                "Complete reservation"
              )}
            </button>
          </CustomForm>

          <Link
            to="/"
            className="bg-gray-300 text-gray-700 p-2 w-full rounded mt-2 inline-block text-center cursor-pointer"
          >
            Cancel
          </Link>
        </>
      ) : (
        <Link
          to="/"
          className="bg-gray-700 text-white p-2 w-full rounded mt-5 inline-block text-center"
        >
          Back to Home
        </Link>
      )}
    </div>
  );
};

export default ReservationForm;
