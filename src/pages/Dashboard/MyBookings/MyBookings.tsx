import BookingRow from "./components/BookingRow";
import Loading from "../../../components/loaders/Loading";
import { useGetMyBookingsQuery } from "../../../lib/Queries/Booking.query";

const MyBookings = () => {
  const { data, isLoading } = useGetMyBookingsQuery();
  const bookings = data?.data;

  if (isLoading) return <Loading />;
  return (
    <div className="mx-auto w-full max-w-screen-md p-2">
      {bookings.length ? (
        <>
          <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
            Your Bookings
          </h2>
          <div className="overflow-auto rounded-md shadow w-full mx-auto">
            <table className="table-auto w-full whitespace-nowrap bg-white">
              <thead className="bg-gray-50 border-b-2 border-gray-200 h-10">
                <tr>
                  <th className="px-2 text-sm sm:text-reg font-medium">
                    Restaurant
                  </th>
                  <th className="px-2 text-sm sm:text-reg font-medium">
                    Date | Time
                  </th>
                  <th className="px-2 text-sm sm:text-reg font-medium">
                    People
                  </th>
                  <th className="px-2 text-sm sm:text-reg font-medium">
                    Cancel booking
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking: any) => (
                  <BookingRow
                    key={`My booking ${booking.id}`}
                    booking={booking}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h2 className="text-center text-3xl font-bold text-red-600">
          No Upcoming Bookings
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
