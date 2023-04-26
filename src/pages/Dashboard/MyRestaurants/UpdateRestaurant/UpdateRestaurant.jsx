import { useContext, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";

import getRestaurantBySlug from "../../../../queries/getRestaurantBySlug";
import { GlobalState } from "../../../../context/GlobalContext";
import { times } from "../../../../data/times";
import Menu from "../../../../components/Menu";
import Loader from "../../../../components/Loader";
import { Img } from "react-image";
import ImageLoader from "../../../../components/ImageLoader";
import FallbackImage from "../../../../components/FallbackImage";

const UpdateRestaurant = () => {
  const params = useParams();
  const { data: userData, setGlobalState } = useContext(GlobalState);

  const queryClient = useQueryClient();

  const [inputs, setInputs] = useState(null);
  const [images, setImages] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { data, isInitialLoading } = useQuery({
    queryKey: ["getRestaurantBySlug", params.slug, "updateRestaurantPage"],
    queryFn: async () => await getRestaurantBySlug(params.slug),
  });

  useEffect(() => {
    const { data: restaurant } = data || {};
    if (
      restaurant &&
      (inputs?.name !== restaurant.name ||
        inputs?.main_image !== restaurant.main_image ||
        inputs?.description !== restaurant.description ||
        inputs?.open_time !== restaurant.open_time ||
        inputs?.close_time !== restaurant.close_time ||
        inputs?.price !== restaurant.price ||
        JSON.stringify(images) !== JSON.stringify(restaurant.images)) &&
      inputs?.open_time !== inputs?.close_time
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputs, images]);

  useEffect(() => {
    const { data: restaurant } = data || {};
    if (restaurant) {
      setInputs({
        name: restaurant.name,
        main_image: restaurant.main_image,
        description: restaurant.description,
        open_time: restaurant.open_time,
        close_time: restaurant.close_time,
        price: restaurant.price,
      });
      setImages(restaurant.images);
    }
  }, [data]);

  // Images Array Related Code
  const imageRef = useRef("");
  const addImage = () => {
    setImages([...images, imageRef.current.value]);
    imageRef.current.value = "";
  };
  const deleteImage = (imageToDelete) => {
    const newImages = images.filter((image) => image !== imageToDelete);
    setImages(newImages);
  };

  // Handle Inputs
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_API_URL}/restaurant/${params.slug}`,
        { ...inputs, images },
        { withCredentials: true }
      );
      if (res.data?.status === "success") {
        setGlobalState({
          data: userData,
          loading: false,
          error: null,
          success: res.data?.message,
        });
        queryClient.invalidateQueries("getAllRestaurants");
        navigate(`/dashboard/my-restaurant/${res.data?.data.slug}`);
      } else {
        setGlobalState({
          data: userData,
          loading: false,
          error: {
            message: res.data?.message,
            error: res.data?.error,
          },
          success: null,
        });
      }
    } catch (error) {
      setGlobalState({
        data: userData,
        loading: false,
        success: null,
        error: {
          message:
            `${error?.response?.data?.message}` ||
            "Ops there was a problem updating your restaurant. Please try again.",
          error: `${error?.response?.data?.error}` || "Client Error",
        },
      });
    }
    setLoading(false);
  };

  if (isInitialLoading) return <Loader />;
  else {
    const {
      name,
      description,
      open_time,
      close_time,
      items,
      main_image,
      price,
    } = data.data;
    return (
      <div className="w-full max-w-screen-md mx-auto p-2">
        {data ? (
          <>
            <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
              Restaurant Details
            </h2>
            <div className="my-3 flex justify-between text-sm">
              <input
                onChange={handleChange}
                className="border rounded px-2 py-3 w-full"
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={name}
              />
            </div>
            <div className="my-3 flex justify-between text-sm">
              <textarea
                onChange={handleChange}
                className="border rounded px-2 py-3 w-full resize-none"
                placeholder="Description"
                name="description"
                rows={4}
                defaultValue={description}
              />
            </div>
            <div className="my-3 flex justify-between text-sm">
              <input
                onChange={handleChange}
                className="border rounded px-2 py-3 w-full"
                type="text"
                placeholder="Main Image URL"
                name="main_image"
                defaultValue={main_image}
              />
            </div>
            <div className="my-3 flex flex-col justify-between text-sm">
              <p className="font-medium text-reg">Gallery Images</p>
              <div className="flex flex-wrap">
                {images.map((image) => (
                  <div key={image} className="flex flex-col items-center mx-2">
                    <Img
                      src={image}
                      alt="gallary"
                      className="w-16"
                      loader={<ImageLoader height={64} width={64} />}
                      unloader={
                        <FallbackImage classes="w-16 h-16 object-cover" />
                      }
                    />
                    <span
                      onClick={() => deleteImage(image)}
                      className="text-red-500 cursor-pointer"
                    >
                      Delete
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex mt-2">
                <input
                  className="border rounded px-2 py-3 w-full"
                  type="text"
                  placeholder="Image URL"
                  ref={imageRef}
                />
                <button
                  onClick={addImage}
                  className="ml-2 py-2 px-6 bg-gray-700 text-white rounded-md"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="my-3 flex flex-wrap items-center text-sm">
              <div className="mr-6">
                <label className="mr-3 font-medium">Open Time: </label>
                <select
                  name="open_time"
                  defaultValue={open_time}
                  onChange={handleChange}
                  className="py-3 border-b font-light"
                >
                  {times.map((time) => (
                    <option key={time.time} value={time.time}>
                      {time.displayTime}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mr-6">
                <label className="mr-3 font-medium">Close Time : </label>
                <select
                  name="close_time"
                  defaultValue={close_time}
                  onChange={handleChange}
                  className="py-3 border-b font-light"
                >
                  {times.map((time) => (
                    <option key={time.displayTime} value={time.time}>
                      {time.displayTime}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mr-6">
                <label className="mr-3 font-medium">Price : </label>
                <select
                  name="price"
                  onChange={handleChange}
                  className="py-3 border-b font-light"
                  defaultValue={price}
                >
                  <option value="REGULAR">REGULAR</option>
                  <option value="CHEAP">CHEAP</option>
                  <option value="EXPENSIVE">EXPENSIVE</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleClick}
              disabled={disabled || loading}
              className="bg-gray-700 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-200"
            >
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                "Save Changes"
              )}
            </button>
            <Link
              to={`/dashboard/add-item/${params.slug}`}
              className="py-2 px-4 rounded bg-gray-700 text-white text-sm"
            >
              Add Item +
            </Link>
            <Menu items={items} />
          </>
        ) : (
          <h2 className="text-center text-3xl font-bold text-red-600">
            No Restaurant Found!
          </h2>
        )}
      </div>
    );
  }
};

export default UpdateRestaurant;
