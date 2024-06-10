import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import CustomForm from "./CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import { Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUserMutation } from "../../lib/Queries/User.query";
import { TResponse } from "../../lib/axios";
import { tags } from "../../constants";

export const AccountUpdateValidation = z.object({
  first_name: z
    .string({
      invalid_type_error: "First name must be a string",
    })
    .max(20, { message: "First name must be less than 20 characters" })
    .optional(),

  last_name: z
    .string({
      invalid_type_error: "Last name must be a string",
    })
    .max(20, { message: "Last name must be less than 20 characters" })
    .optional(),

  city: z
    .string({
      invalid_type_error: "City must be a string",
    })
    .optional(),
  phone: z
    .string({
      invalid_type_error: "Phone must be a string",
    })
    .optional(),
});

const MyAccountForm = ({ user }: { user: any }) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const queryClient = useQueryClient();

  const { mutateAsync: updateUser, isPending } = useUpdateUserMutation();

  const handleUpdateAccount: SubmitHandler<
    z.infer<typeof AccountUpdateValidation>
  > = async (values) => {
    setError("");
    setSuccess("");
    if (JSON.stringify(values) === JSON.stringify(defaultValues)) return;

    const result = (await updateUser(values)) as unknown as TResponse;

    if (result.success) {
      setSuccess(result.message);
      queryClient.invalidateQueries({ queryKey: [tags.User] });
    } else {
      setError(result.message);
    }
  };

  const defaultValues = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    city: user?.city,
    phone: user?.phone,
  };
  return (
    <CustomForm
      onSubmit={handleUpdateAccount}
      resolver={zodResolver(AccountUpdateValidation)}
      defaultValues={defaultValues}
      reset={false}
    >
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
      <div className="my-3 flex justify-between text-sm gap-2">
        <CustomInput
          name="first_name"
          label="First Name"
          placeholder="First Name"
          fullWidth
        />
        <CustomInput
          name="last_name"
          label="Last Name"
          placeholder="Last Name"
          fullWidth
        />
      </div>
      <div className="my-3 flex justify-between text-sm gap-2">
        <CustomInput name="city" label="City" placeholder="City" fullWidth />
        <CustomInput name="phone" label="Phone" placeholder="Phone" fullWidth />
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="bg-gray-700 hover:bg-gray-700 w-full text-white p-3 rounded text-sm disabled:bg-gray-200"
      >
        {isPending ? (
          <CircularProgress size={30} color="inherit" />
        ) : (
          "Update Info"
        )}
      </button>
    </CustomForm>
  );
};

export default MyAccountForm;
