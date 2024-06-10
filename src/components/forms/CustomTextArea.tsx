import { TextareaAutosize } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  placeholder?: string;
};

const CustomTextArea = ({ name, placeholder }: TProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextareaAutosize
            className="w-full p-2 text-reg border border-gray-400 rounded min-h-16 resize-none focus:outline-none focus:border-transparent hover:border-gray-500 focus:ring-2 focus:ring-blue-500"
            {...field}
            placeholder={placeholder}
          />
          {error && <p className="text-red-500 text-xsm">{error.message}</p>}
        </>
      )}
    />
  );
};

export default CustomTextArea;
