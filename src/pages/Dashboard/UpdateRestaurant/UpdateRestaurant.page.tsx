import { Link, redirect, useParams } from "react-router-dom";
import {
  useGetRestaurantBySlugQuery,
  useUpdateRestaurantMutation,
} from "../../../lib/Queries/Restaurant.query";
import Loading from "../../../components/loaders/Loading";
import { z } from "zod";
import RestaurantForm from "../../../components/forms/RestaurantForm";
import RestaurantMenu from "../../Restaurant/components/RestaurantMenu";

export const UpdateRestaurantValidation = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .max(100, { message: "Name must be less than 100 characters" })
    .optional(),

  main_image: z
    .string({
      invalid_type_error: "Main image must be a string",
    })
    .url({ message: "Main image must be a valid URL" })
    .optional(),

  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .optional(),

  open_time: z
    .string({
      invalid_type_error: "Open time must be a string",
    })
    .optional(),

  close_time: z
    .string({
      invalid_type_error: "Close time must be a string",
    })
    .optional(),

  price: z
    .enum(["CHEAP", "REGULAR", "EXPENSIVE"], {
      invalid_type_error: "Price must be CHEAP, REGULAR or EXPENSIVE",
    })
    .optional(),

  cuisine_id: z.coerce
    .number({
      invalid_type_error: "Cuisine must be a number",
    })
    .optional(),

  location_id: z.coerce
    .number({
      invalid_type_error: "Location must be a number",
    })
    .optional(),
});

const UpdateRestaurant = () => {
  const { slug } = useParams();
  if (!slug) redirect("/");

  const { data, isLoading } = useGetRestaurantBySlugQuery(slug as string);
  const restaurant = data?.data;

  if (isLoading) return <Loading />;

  const defaultValues = {
    name: restaurant?.name,
    main_image: restaurant?.main_image,
    description: restaurant?.description,
    open_time: restaurant?.open_time,
    close_time: restaurant?.close_time,
    price: restaurant?.price,
    cuisine_id: restaurant?.cuisine_id,
    location_id: restaurant?.location_id,
  };
  return (
    <div className="w-full max-w-screen-md mx-auto p-2 pt-5">
      <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
        Restaurant Details
      </h2>

      <div className="bg-white px-3 py-5 rounded shadow">
        <RestaurantForm
          schema={UpdateRestaurantValidation}
          defaultValues={defaultValues}
          mutation={useUpdateRestaurantMutation}
          update={true}
          galaryImages={restaurant?.images}
        />
      </div>
      <div className="bg-white px-3 py-5 rounded shadow mt-5">
        <Link
          to={`/dashboard/add-item/${slug}`}
          className="py-2 px-4 rounded bg-gray-700 text-white text-sm"
        >
          Add Item +
        </Link>

        <RestaurantMenu items={restaurant?.items} />
      </div>
    </div>
  );
};

export default UpdateRestaurant;
