import { useState } from "react";
import { convertToDisplayTime } from "../../../../utils/convertToDisplayTime";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCancelBookingMutation } from "../../../../lib/Queries/Booking.query";
import { useQueryClient } from "@tanstack/react-query";
import { tags } from "../../../../constants";

const BookingRow = ({ booking }: any) => {
  const [open, setOpen] = useState(false);

  const [day, time] = booking.booking_time.split("T");

  const queryClient = useQueryClient();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutateAsync: cancelBooking, isPending } = useCancelBookingMutation();
  const handleClick = async (id: string) => {
    await cancelBooking(id);
    queryClient.invalidateQueries({
      queryKey: [tags.Booking],
    });
    handleClose();
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
          {isPending ? (
            <CircularProgress size={30} color="error" />
          ) : (
            <button
              disabled={isPending}
              onClick={handleOpen}
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

export default BookingRow;
