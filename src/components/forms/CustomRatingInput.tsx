import { Rating } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
  name: string;
};

const CustomRatingInput = ({ name }: TProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Rating
            {...field}
            name="half-rating"
            precision={0.5}
            onChange={(_, value) => field.onChange(Number(value))}
          />
          <span className="ml-2">({field.value || 0})</span>
        </>
      )}
    />
  );
};

export default CustomRatingInput;
