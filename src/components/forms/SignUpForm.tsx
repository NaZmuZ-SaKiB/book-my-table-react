import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import CustomForm from "./CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "@mui/material";
import CustomInput from "./CustomInput";
import { useSignUpMutation } from "../../lib/Queries/Auth.query";
import { TResponse } from "../../lib/axios";
import { authKey, tags } from "../../constants";
import { setToLocalStorage } from "../../utils/localStorage";

export const SignUpValidation = z.object({
  first_name: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .min(1, { message: "First name is required" })
    .max(20, { message: "First name must be less than 20 characters" }),

  last_name: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .min(1, { message: "Last name is required" })
    .max(20, { message: "Last name must be less than 20 characters" }),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" }),

  city: z
    .string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    })
    .min(1, { message: "City is required" }),

  phone: z
    .string({
      required_error: "Phone is required",
      invalid_type_error: "Phone must be a string",
    })
    .min(1, { message: "Phone is required" }),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters" }),
});

const SignUpForm = ({ handleClose }: { handleClose: () => void }) => {
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { mutateAsync: signUp, isPending } = useSignUpMutation();

  const handleSignUp: SubmitHandler<z.infer<typeof SignUpValidation>> = async (
    values
  ) => {
    setError("");

    const result = (await signUp(values)) as unknown as TResponse;

    if (!result.success) {
      setError(result.message);
    } else {
      setToLocalStorage(authKey, result.data?.token);

      queryClient.invalidateQueries({
        queryKey: [tags.Auth],
      });

      queryClient.invalidateQueries({
        queryKey: [tags.User],
      });
      handleClose();
    }
  };

  const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    phone: "",
    password: "",
  };

  return (
    <CustomForm
      onSubmit={handleSignUp}
      defaultValues={defaultValues}
      resolver={zodResolver(SignUpValidation)}
    >
      {error && (
        <Alert severity="error" className="my-5">
          {error}
        </Alert>
      )}

      <div className="my-4 flex justify-between text-sm gap-2">
        <CustomInput
          name="first_name"
          label="First Name"
          fullWidth
          placeholder="First Name"
          size="small"
        />
        <CustomInput
          name="last_name"
          label="Last Name"
          fullWidth
          placeholder="Last Name"
          size="small"
        />
      </div>

      <div className="my-4">
        <CustomInput
          name="email"
          label="Email"
          fullWidth
          placeholder="Email"
          size="small"
        />
      </div>

      <div className="my-4 flex justify-between text-sm gap-2">
        <CustomInput
          name="phone"
          label="Phone"
          fullWidth
          placeholder="Phone"
          size="small"
        />
        <CustomInput
          name="city"
          label="City"
          fullWidth
          placeholder="City"
          size="small"
        />
      </div>

      <div className="my-4">
        <CustomInput
          name="password"
          label="Password"
          fullWidth
          placeholder="Password"
          type="password"
          size="small"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={
          "uppercase bg-gray-700 w-full text-white p-3 rounded text-sm mb-2 disabled:bg-gray-200"
        }
      >
        {isPending ? "Signing Up..." : "Sign Up"}
      </button>
    </CustomForm>
  );
};

export default SignUpForm;
