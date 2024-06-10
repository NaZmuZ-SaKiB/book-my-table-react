import { times } from "../data";

export * from "./tags";

export const authKey = "jwtToken";

export const timeOptions = times.map((time) => ({
  label: time.displayTime,
  value: time.time,
}));

export const priceOptions = [
  { label: "Cheap", value: "CHEAP" },
  { label: "Regular", value: "REGULAR" },
  { label: "Expensive", value: "EXPENSIVE" },
];
