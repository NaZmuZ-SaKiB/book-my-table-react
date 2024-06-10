import { authKey } from "../constants";
import { JwtHelpers } from "../utils/jwtHelpers";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/localStorage";

type TTokenUser = { id: number; email: string; role: "USER" | "OWNER" };

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);

  if (authToken) {
    const dcodedData = JwtHelpers.verifyToken(authToken) as TTokenUser;
    return dcodedData;
  } else {
    return null;
  }
};

export const isUserLoggedIn = () => {
  return !!getFromLocalStorage(authKey);
};

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};
