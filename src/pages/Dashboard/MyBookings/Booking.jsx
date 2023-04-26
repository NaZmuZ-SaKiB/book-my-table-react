import React, { useContext, useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

import { GlobalState } from "../../../context/GlobalContext";
import { convertToDisplayTime } from "../../../../utils/convertToDisplayTime";

const Booking = ({ booking }) => {
  const queryClient = useQueryClient();

  const [day, time] = booking.booking_time.split("T");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { data, setGlobalState } = useContext(GlobalState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (id) => {
    handleClose();
    setLoading(true);
    const res = await axios.delete(
      `${import.meta.env.VITE_BASE_API_URL}/booking/${id}`,
      { withCredentials: true }
    );
    if (res.data?.status === "success") {
      setGlobalState({
        data,
        success: res.data?.message,
        loading: false,
        error: null,
      });
      queryClient.invalidateQueries("getMyBookings");
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
    setLoading(false);
  };
  return (
    <>
      <tr className="text-center h-12">
        <td className="px-1 text-sm text-gray-700">
          {booking.restaurant.name}
        </td>
        <td className="px-1 text-sm text-gray-700">
          {day} | {convertToDisplayTime(time)}
        </td>
        <td className="px-1 text-sm text-gray-700">
          {booking.number_of_people}
        </td>
        <td className="text-sm text-gray-700">
          {loading ? (
            <CircularProgress size={30} color="error" />
          ) : (
            <button
              disabled={loading}
              onClick={handleClickOpen}
              className="px-1 border border-red-600 rounded-md text-red-600 text-sm hover:bg-red-600 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          )}
        </td>
      </tr>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="text-red-600" id="alert-dialog-title">
          Warning !
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to cancel your booking ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="border-t">
          <button
            className="py-1 px-5 rounded-md text-white text-sm bg-gray-700 hover:bg-gray-600 cursor-pointer"
            onClick={handleClose}
          >
            No
          </button>
          <button
            className="py-1 px-5 border border-red-600 bg-red-600 rounded-md text-white text-sm hover:bg-red-500 cursor-pointer"
            autoFocus={true}
            onClick={() => handleClick(booking.id)}
          >
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Booking;
