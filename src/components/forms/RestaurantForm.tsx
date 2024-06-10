import { useRef, useState } from "react";
import { ZodSchema, z } from "zod";
import CustomForm from "./CustomForm";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import CustomTextArea from "./CustomTextArea";
import { Img } from "react-image";
import ImageLoader from "../loaders/ImageLoader";
import FallbackImage from "../shared/FallbackImage";
import CustomSelect from "./CustomSelect";
import { useGetAllLocationsQuery } from "../../lib/Queries/Location.query";
import { useGetAllCuisinesQuery } from "../../lib/Queries/Cuisine.query";
import { Alert, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { authKey, priceOptions, tags, timeOptions } from "../../constants";
import { TResponse } from "../../lib/axios";
import { useAuth, useGetNewTokenQuery } from "../../lib/Queries/Auth.query";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../utils/localStorage";
import { useNavigate, useParams } from "react-router-dom";

type TProps = {
  schema: ZodSchema;
  defaultValues: Record<string, any>;
  mutation: any;
  update?: boolean;
  galaryImages?: string[];
};

const RestaurantForm = ({
  schema,
  defaultValues,
  mutation,
  update = false,
  galaryImages = [],
}: TProps) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: user } = useAuth();

  const [images, setImages] = useState<string[]>(galaryImages);

  const { slug } = useParams();

  const { data: locationData, isLoading: loadingLocation } =
    useGetAllLocationsQuery();

  const { data: cuisineData, isLoading: loadingCuisine } =
    useGetAllCuisinesQuery();

  const navigate = useNavigate();

  // Images Array Related Code
  const imageRef = useRef({ value: "" });

  const addImage = () => {
    if (!imageRef.current.value) return;
    setImages([...images, imageRef.current.value]);
    imageRef.current.value = "";
  };
  const deleteImage = (imageToDelete: string) => {
    const newImages = images.filter((image) => image !== imageToDelete);
    setImages(newImages);
  };

  const queryClient = useQueryClient();

  const { isFetching, refetch } = useGetNewTokenQuery();

  const { mutateAsync: createOrUpdateRestaurant, isPending } = mutation();

  const handleSubmit: SubmitHandler<z.infer<typeof schema>> = async (
    values
  ) => {
    setError("");
    setSuccess("");

    if (
      update &&
      JSON.stringify(values) === JSON.stringify(defaultValues) &&
      JSON.stringify(images) === JSON.stringify(galaryImages)
    ) {
      return;
    }

    if (!images.length) {
      setError("Please add at least one image");
      return;
    }

    const { table_1, table_2, ...restData } = values;

    let submitData: any = {};

    submitData = {
      ...restData,
      tables: [table_1, table_2],
      images,
    };

    if (update) {
      delete submitData.tables;

      submitData = {
        slug,
        restaurant: submitData,
      };
    }

    const result = (await createOrUpdateRestaurant(
      submitData
    )) as unknown as TResponse;

    if (result.success) {
      queryClient.invalidateQueries({
        queryKey: [tags.Restaurants],
      });
      queryClient.invalidateQueries({
        queryKey: [tags.MyRestaurants],
      });

      if (user?.role === "USER") {
        const newToken = await refetch();
        removeFromLocalStorage(authKey);
        setToLocalStorage(authKey, newToken?.data?.data);

        queryClient.invalidateQueries({
          queryKey: [tags.Auth],
        });
      }

      if (update) {
        setSuccess(result.message);

        queryClient.invalidateQueries({
          queryKey: [tags.Restaurant, slug],
        });
      } else {
        setImages([]);
        navigate("/dashboard/my-restaurants");
      }
    } else {
      setError(result.message);
    }
  };

  const locationOptions = loadingLocation
    ? []
    : locationData?.data.map((location: any) => ({
        label: location.name,
        value: location.id,
      }));

  const cuisineOptions = loadingCuisine
    ? []
    : cuisineData?.data.map((cuisine: any) => ({
        label: cuisine.name,
        value: cuisine.id,
      }));

  return (
    <CustomForm
      onSubmit={handleSubmit}
      resolver={zodResolver(schema)}
      defaultValues={defaultValues}
      reset={!update}
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
      <div className="my-4">
        <CustomInput name="name" label="Name" placeholder="Name" fullWidth />
      </div>
      <div className="my-4">
        <CustomTextArea name="description" placeholder="Desctiption" />
      </div>
      <div className="my-4">
        <CustomInput
          name="main_image"
          label="Main Image URL"
          placeholder="Main Image URL"
          fullWidth
        />
      </div>
      <div className="my-4 flex flex-col justify-between text-sm">
        <p className="font-medium text-reg">Add Gallery Images</p>
        <div className="flex flex-wrap">
          {images.map((image) => (
            <div key={image} className="flex flex-col items-center mx-2 mt-2">
              <Img
                loader={<ImageLoader height={64} width={64} />}
                unloader={<FallbackImage classes="h-16 w-16 object-cover" />}
                src={image}
                alt="gallary"
                className="w-16 rounded-md"
              />
              <span
                onClick={() => deleteImage(image)}
                className="text-red-500 cursor-pointer mt-1"
              >
                Delete
              </span>
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            className="border border-gray-400 rounded px-2 py-3 w-full focus:outline-none hover:border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            placeholder="Image URL"
            ref={imageRef as any}
          />
          <button
            type="button"
            onClick={addImage}
            className="ml-2 py-2 px-6 bg-gray-700 text-white rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      <div className="my-4 flex flex-wrap items-start text-sm gap-4">
        <CustomSelect
          items={timeOptions}
          name="open_time"
          label="Open Time"
          placeholder="Open Time"
          sx={{ width: "150px" }}
        />

        <CustomSelect
          items={timeOptions}
          name="close_time"
          label="Close Time"
          placeholder="Close Time"
          sx={{ width: "150px" }}
        />

        <CustomSelect
          items={priceOptions}
          name="price"
          label="Price"
          placeholder="Price"
          sx={{ width: "150px" }}
        />
      </div>

      <div className="my-4 flex flex-wrap items-start text-sm gap-4">
        <CustomSelect
          items={locationOptions}
          name="location_id"
          label="Location"
          placeholder="Location"
          sx={{ width: "150px" }}
        />

        <CustomSelect
          items={cuisineOptions}
          name="cuisine_id"
          label="Cuisine"
          placeholder="Cuisine"
          sx={{ width: "150px" }}
        />
      </div>

      {!update && (
        <div className="my-4">
          <p className="font-medium text-reg mb-2">Tables</p>
          <div className="flex justify-between gap-3">
            <CustomInput
              name="table_1"
              label="4 Seater Table"
              placeholder="4 Seater Table"
              type="number"
              fullWidth
            />
            <CustomInput
              name="table_2"
              label="2 Seater Table"
              placeholder="2 Seater Table"
              type="number"
              fullWidth
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || isFetching}
        className="bg-gray-700 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-200"
      >
        {isPending ? (
          <CircularProgress size={30} color="inherit" />
        ) : update ? (
          "Save Changes"
        ) : (
          "Add Restaurant"
        )}
      </button>
    </CustomForm>
  );
};

export default RestaurantForm;
