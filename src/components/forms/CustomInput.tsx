import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label?: string;
  type?: "text" | "password" | "email" | "number" | "tel";
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
};

const CustomInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  placeholder,
  required,
}: TProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          placeholder={placeholder}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          InputProps={{
            sx: { ...sx },
          }}
        />
      )}
    />
  );
};

export default CustomInput;
