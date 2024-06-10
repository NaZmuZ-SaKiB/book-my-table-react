import { z } from "zod";
import RestaurantForm from "../../../components/forms/RestaurantForm";
import { useAddRestaurantMutation } from "../../../lib/Queries/Restaurant.query";

export const AddRestaurantValidation = z
  .object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name must be less than 100 characters" }),

    main_image: z
      .string({
        invalid_type_error: "Main image must be a string",
      })
      .url({ message: "Main image must be a valid URL" }),

    description: z
      .string({
        invalid_type_error: "Description must be a string",
      })
      .min(1, { message: "Description is required" }),

    open_time: z
      .string({
        invalid_type_error: "Open time must be a string",
      })
      .min(1, { message: "Open time is required" }),

    close_time: z
      .string({
        invalid_type_error: "Close time must be a string",
      })
      .min(1, { message: "Close time is required" }),

    price: z
      .enum(["CHEAP", "REGULAR", "EXPENSIVE"], {
        invalid_type_error: "Price must be CHEAP, REGULAR or EXPENSIVE",
      })
      .default("CHEAP"),

    cuisine_id: z.coerce
      .number({
        invalid_type_error: "Cuisine must be a number",
      })
      .min(1, { message: "Cuisine is required" }),

    location_id: z.coerce
      .number({
        invalid_type_error: "Location must be a number",
      })
      .min(1, { message: "Location is required" }),

    table_1: z.coerce.number().optional(),
    table_2: z.coerce.number().optional(),
  })
  .refine(
    (data) => {
      if (data.table_1 || data.table_2) {
        return true;
      } else {
        false;
      }
    },
    {
      message: "At least one table size is required",
      path: ["table_1"],
    }
  );

const defaultValues = {
  name: "",
  description: "",
  main_image: "",
  open_time: "",
  close_time: "",
  price: "CHEAP",
  location_id: "",
  cuisine_id: "",
  table_1: "",
  table_2: "",
};

const AddRestaurant = () => {
  return (
    <div className="w-full max-w-screen-md mx-auto p-2 pt-5">
      <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
        Add New Restaurant
      </h2>

      <div className="bg-white px-3 py-5 rounded shadow">
        <RestaurantForm
          schema={AddRestaurantValidation}
          defaultValues={defaultValues}
          mutation={useAddRestaurantMutation}
        />
      </div>
    </div>
  );
};

export default AddRestaurant;
