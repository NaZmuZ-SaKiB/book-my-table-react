import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import useReservation from "../../../hooks/useReservation";
import { GlobalState } from "../../../context/GlobalContext";

export default function Form({ slug, partySize, date }) {
  const [day, time] = date.split("T");
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const {
    bookerFirstName,
    bookerLastName,
    bookerPhone,
    bookerEmail,
    bookerOccasion,
    bookerRequest,
  } = inputs;

  const { data: userData } = useContext(GlobalState);
  useEffect(() => {
    userData &&
      setInputs({
        bookerFirstName: userData?.first_name,
        bookerLastName: userData?.last_name,
        bookerPhone: userData?.phone,
        bookerEmail: userData?.email,
        bookerOccasion: "",
        bookerRequest: "",
      });
  }, [userData]);
  const { loading, resData, createReservation } = useReservation();

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (bookerFirstName && bookerLastName && bookerPhone && bookerEmail) {
      return setDisabled(false);
    } else {
      return setDisabled(true);
    }
  }, [inputs]);

  const handleClick = async () => {
    await createReservation({
      slug,
      partySize,
      day,
      time,
      bookerEmail,
      bookerPhone,
      bookerFirstName,
      bookerLastName,
      bookerOccasion,
      bookerRequest,
    });
  };
  return (
    <>
      {resData ? (
        <Link
          to="/"
          className="bg-blue-600 text-white p-2 w-[660px] rounded mt-2 inline-block text-center"
        >
          Back to Home
        </Link>
      ) : (
        <div className="mt-5 flex flex-wrap justify-between w-full">
          <input
            value={bookerFirstName}
            name="bookerFirstName"
            type="text"
            className="border rounded p-3 w-full md:w-[49%] mb-4"
            placeholder="First name"
            onChange={handleInputChange}
          />
          <input
            value={bookerLastName}
            name="bookerLastName"
            type="text"
            className="border rounded p-3 w-full md:w-[49%] mb-4"
            placeholder="Last name"
            onChange={handleInputChange}
          />
          <input
            value={bookerPhone}
            name="bookerPhone"
            type="text"
            className="border rounded p-3 w-full md:w-[49%] mb-4"
            placeholder="Phone number"
            onChange={handleInputChange}
          />
          <input
            value={bookerEmail}
            name="bookerEmail"
            type="email"
            className="border rounded p-3 w-full md:w-[49%] mb-4"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <input
            value={bookerOccasion}
            name="bookerOccasion"
            type="text"
            className="border rounded p-3 w-full md:w-[49%] mb-4"
            placeholder="Occasion (optional)"
            onChange={handleInputChange}
          />
          <input
            value={bookerRequest}
            name="bookerRequest"
            type="text"
            className="border rounded p-3 w-full md:w-[49%] mb-4"
            placeholder="Requests (optional)"
            onChange={handleInputChange}
          />

          <button
            onClick={handleClick}
            disabled={disabled || loading}
            type="submit"
            className="bg-blue-400 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <Link
            to="/"
            className="bg-gray-600 text-white p-2 w-full rounded mt-2 inline-block text-center cursor-pointer"
          >
            Cancel
          </Link>

          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the BookMyTable
            Terms of Use and Privacy Policy. Standard text message rates may
            apply. You may opt out of receiving text messages at any time.
          </p>
        </div>
      )}
    </>
  );
}
