import { useQuery } from "@tanstack/react-query";

import getMyBookings from "../../../queries/getMyBookings";
import Booking from "./Booking";
import Loader from "../../../components/Loader";

const MyBookings = () => {
  const { data, isInitialLoading, refetch } = useQuery({
    queryKey: ["getMyBookings"],
    queryFn: async () => await getMyBookings(),
  });

  if (isInitialLoading) return <Loader />;
  else {
    const { data: bookings } = data;

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
                  {bookings.map((booking) => (
                    <Booking
                      key={`My booking ${booking.id}`}
                      booking={booking}
                      refetch={refetch}
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
  }
};

export default MyBookings;
