import { Alert, CircularProgress } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import CustomForm from "../../../components/forms/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../../components/forms/CustomInput";
import { useState } from "react";
import { useChangePasswordMutation } from "../../../lib/Queries/Auth.query";
import { TResponse } from "../../../lib/axios";

export const PasswordChangeValidation = z
  .object({
    oldPassword: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .min(1, { message: "Password is required" }),
    newPassword: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmNewPassword: z.string({
      invalid_type_error: "Password must be a string",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

const ChangePassword = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { mutateAsync: changePasswordFn, isPending } =
    useChangePasswordMutation();

  const handleSubmit: SubmitHandler<
    z.infer<typeof PasswordChangeValidation>
  > = async (values) => {
    setError("");
    setSuccess("");

    const result = (await changePasswordFn({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    })) as unknown as TResponse;

    if (result.success) {
      setSuccess(result.message);
    } else {
      setError(result.message);
    }
  };

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  return (
    <div className="w-full max-w-screen-sm mx-auto p-2 pt-5">
      <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
        Change Your Password
      </h2>
      <div className="bg-white rounded shadow px-3 py-5 mb-5">
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
          onSubmit={handleSubmit}
          resolver={zodResolver(PasswordChangeValidation)}
          defaultValues={defaultValues}
        >
          <div className="my-5 flex justify-between text-sm">
            <CustomInput
              name="oldPassword"
              label="Old Password"
              placeholder="Old Password"
              type="password"
              fullWidth
            />
          </div>
          <div className="my-5 flex justify-between text-sm">
            <CustomInput
              name="newPassword"
              label="New Password"
              placeholder="New Password"
              type="password"
              fullWidth
            />
          </div>
          <div className="my-5 flex justify-between text-sm">
            <CustomInput
              name="confirmNewPassword"
              label="Confirm New Password"
              placeholder="Confirm New Password"
              type="password"
              fullWidth
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-gray-700 w-full text-white p-3 rounded text-sm disabled:bg-gray-200"
          >
            {isPending ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              "Change Password"
            )}
          </button>
        </CustomForm>
      </div>
    </div>
  );
};

export default ChangePassword;
