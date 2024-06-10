import CustomForm from "./CustomForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import { useSignInMutation } from "../../lib/Queries/Auth.query";
import { useState } from "react";
import { TResponse } from "../../lib/axios";
import { Alert } from "@mui/material";
import { setToLocalStorage } from "../../utils/localStorage";
import { authKey, tags } from "../../constants";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

export const SignInValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
      message: "Invalid email address",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

const SignInForm = ({ handleClose }: { handleClose: () => void }) => {
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { mutateAsync: signIn, isPending } = useSignInMutation();

  const handleSignIn: SubmitHandler<z.infer<typeof SignInValidation>> = async (
    values
  ) => {
    setError("");

    const result = (await signIn(values)) as unknown as TResponse;

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
  return (
    <CustomForm
      onSubmit={handleSignIn}
      defaultValues={{ email: "", password: "" }}
      resolver={zodResolver(SignInValidation)}
    >
      {error && (
        <Alert severity="error" className="my-5">
          {error}
        </Alert>
      )}
      <div className="my-5">
        <CustomInput
          name="email"
          label="Email"
          fullWidth
          placeholder="Email"
          size="small"
        />
      </div>
      <div className="my-5">
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
        {isPending ? "Signing In..." : "Sign In"}
      </button>
    </CustomForm>
  );
};

export default SignInForm;
