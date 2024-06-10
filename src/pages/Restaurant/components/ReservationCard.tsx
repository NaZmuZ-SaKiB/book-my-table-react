import { useEffect, useState } from "react";
import { useAvailabilitiesQuery } from "../../../lib/Queries/Restaurant.query";
import { CircularProgress, MenuItem, Select } from "@mui/material";
import { TTimeData, times, partySize as partySizes } from "../../../data";
import ReactDatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { convertToDisplayTime } from "../../../utils/convertToDisplayTime";
import "react-datepicker/dist/react-datepicker.css";

type TProps = { openTime: string; closeTime: string; slug: string };

const ReservationCard = ({ openTime, closeTime, slug }: TProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState(2);
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const [availableTimes, setAvailableTimes] = useState<TTimeData[] | null>(
    null
  );

  const {
    data,
    isFetching: isLoading,
    refetch,
  } = useAvailabilitiesQuery({
    slug,
    partySize,
    day,
    time,
  });

  useEffect(() => {
    setAvailableTimes(null);
  }, [selectedDate, time, partySize]);

  useEffect(() => {
    if (data) {
      setAvailableTimes(data?.data);
    }
  }, [data]);

  const handleChangeDate = (date: Date) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    } else {
      return setSelectedDate(null);
    }
  };

  const filterTimeByRestaurantOpenWindow = () => {
    const timesWithinWindow: TTimeData[] = [];
    let isWinthinWindow = false;
    times.forEach((time) => {
      if (time.time === openTime) isWinthinWindow = true;

      if (isWinthinWindow) timesWithinWindow.push(time);

      if (time.time === closeTime) isWinthinWindow = false;
    });

    return timesWithinWindow;
  };

  return (
    <div className="bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-2xl md:text-3xl lg:text-lg text-gray-700">
          Make a Reservation
        </h4>
      </div>
      <div className="my-3 flex flex-col gap-2">
        <label htmlFor="">Party size</label>
        <Select
          defaultValue={partySize}
          onChange={(e) => setPartySize(Number(e.target.value))}
          placeholder="Time"
          size="small"
        >
          {partySizes.map((size) => (
            <MenuItem key={size.label} value={size.value}>
              {size.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="">Date</label>
          <ReactDatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className=" p-2 px-3 border rounded text-reg w-[100%]"
            dateFormat="MMMM d"
            wrapperClassName="w-[100%]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Time</label>
          <Select
            defaultValue={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Time"
            size="small"
          >
            {filterTimeByRestaurantOpenWindow().map((time) => (
              <MenuItem key={time.time} value={time.time}>
                {time.displayTime}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="mt-5">
        <button
          disabled={isLoading}
          onClick={() => refetch()}
          className="bg-orange-600 rounded w-full px-4 text-white font-bold h-12"
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={30} />
          ) : (
            "Find a Time"
          )}
        </button>
      </div>
      {availableTimes && availableTimes?.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {availableTimes.map((time: any, i: number) =>
              time.available ? (
                <Link
                  key={i}
                  to={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="bg-orange-600 cursor-pointer p-2 text-center text-white mb-3 rounded mr-3"
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time)}
                  </p>
                </Link>
              ) : (
                <p
                  key={i}
                  className="bg-gray-300 p-2 text-white cursor-not-allowed mb-3 rounded mr-3"
                >
                  {convertToDisplayTime(time.time)}
                </p>
              )
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationCard;
