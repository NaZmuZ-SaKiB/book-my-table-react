import { jwtDecode } from "jwt-decode";

const verifyToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);

    if (decoded) {
      return decoded;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

export const JwtHelpers = {
  verifyToken,
};
