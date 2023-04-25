import { useContext, useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { times } from "../../../data";
import { GlobalState } from "../../../context/GlobalContext";

const AddRestaurant = () => {
  const [inputs, setInputs] = useState({
    name: "",
    main_image: "",
    description: "",
    open_time: "00:00:00.000Z",
    close_time: "00:00:00.000Z",
    price: "REGULAR",
    location_id: "43",
    cuisine_id: "43",
    tables_1: "0",
    tables_2: "0",
  });

  const [images, setImages] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const { data, setGlobalState } = useContext(GlobalState);

  const navigate = useNavigate();

  const {
    name,
    main_image,
    description,
    open_time,
    close_time,
    price,
    location_id,
    cuisine_id,
    tables_1,
    tables_2,
  } = inputs;

  // Button Disabled Related Code
  useEffect(() => {
    if (
      name &&
      main_image &&
      description &&
      open_time &&
      close_time &&
      open_time !== close_time &&
      price &&
      location_id &&
      cuisine_id &&
      tables_1 &&
      tables_2 &&
      (tables_1 !== "0" || tables_2 !== "0") &&
      images.length
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputs, images]);

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
      const data = {
        name,
        main_image,
        description,
        open_time,
        close_time,
        price,
        images,
        location_id: parseInt(location_id),
        cuisine_id: parseInt(cuisine_id),
        tables: [parseInt(tables_1), parseInt(tables_2)],
      };
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/restaurant`,
        data,
        { withCredentials: true }
      );

      if (res.data?.status === "success") {
        setGlobalState({
          data,
          loading: false,
          error: null,
          success: res.data?.message + " Redirecting to the restaurant's page.",
        });

        setTimeout(() => {
          navigate(`/restaurant/${res.data?.data?.slug}`);
        }, 3000);
      } else {
        setGlobalState({
          data,
          loading: false,
          success: null,
          error: {
            message: res.data?.message,
            error: res.data?.error,
          },
        });
      }
    } catch (error) {
      setGlobalState({
        data,
        loading: false,
        success: null,
        error: {
          message:
            `${error?.response?.data?.message}` ||
            "Ops there was a problem creating your restaurant. Please try again.",
          error: `${error?.response?.data?.error}` || "Client Error",
        },
      });
    }
    setLoading(false);
  };
  return (
    <div className="w-full max-w-screen-md mx-auto p-2">
      <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
        Add New Restaurant
      </h2>
      <div className="my-3 flex justify-between text-sm">
        <input
          onChange={handleChange}
          className="border rounded px-2 py-3 w-full"
          type="text"
          placeholder="Name"
          name="name"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <textarea
          onChange={handleChange}
          className="border rounded px-2 py-3 w-full resize-none"
          placeholder="Description"
          name="description"
          rows={4}
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          onChange={handleChange}
          className="border rounded px-2 py-3 w-full"
          type="text"
          placeholder="Main Image URL"
          name="main_image"
        />
      </div>
      <div className="my-3 flex flex-col justify-between text-sm">
        <p className="font-medium text-reg">Add Gallery Images</p>
        <div className="flex flex-wrap">
          {images.map((image, i) => (
            <div key={image} className="flex flex-col items-center mx-2">
              <img src={image} alt="gallary" className="w-16" />
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
            defaultValue={times[0]}
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
            defaultValue={times[1]}
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
            defaultValue="REGULAR"
          >
            <option value="REGULAR">REGULAR</option>
            <option value="CHEAP">CHEAP</option>
            <option value="EXPENSIVE">EXPENSIVE</option>
          </select>
        </div>
        <div className="mr-6">
          <label className="mr-3 font-medium">Location : </label>
          <select
            name="location_id"
            defaultValue={1}
            onChange={handleChange}
            className="py-3 border-b font-light"
          >
            <option value={43}>Ottawa</option>
            <option value={44}>Toronto</option>
            <option value={45}>Niagara</option>
          </select>
        </div>
        <div className="mr-6">
          <label className="mr-3 font-medium">Cuisine : </label>
          <select
            name="cuisine_id"
            defaultValue={1}
            onChange={handleChange}
            className="py-3 border-b font-light"
          >
            <option value={43}>Indian</option>
            <option value={44}>Italian</option>
            <option value={45}>Mexican</option>
          </select>
        </div>
      </div>
      <div className="mb-2">
        <p className="font-medium text-reg mb-2">Tables</p>
        <div className="flex justify-between">
          <input
            className="border rounded px-2 py-3 w-[47%]"
            type="number"
            placeholder="4 Seats"
            name="tables_1"
            min={0}
            defaultValue={0}
            onChange={handleChange}
          />
          <input
            name="tables_2"
            className="border rounded px-2 py-3 w-[47%]"
            type="number"
            placeholder="2 Seats"
            min={0}
            defaultValue={0}
            onChange={handleChange}
          />
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
          "Create Restaurant"
        )}
      </button>
    </div>
  );
};

export default AddRestaurant;
