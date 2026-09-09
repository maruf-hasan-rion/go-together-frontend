"use server";

import { decodeJwt } from "./jwt-decode";

/**
 * Client-side access-token check (unsigned). The backend is the source
 * of truth; this only reports validity for the refresh decision.
 */
export const verifyAccessToken = async (token: string) => {
  const decoded = decodeJwt(token);

  if (!decoded) {
    return {
      success: false,
      message: "Invalid token",
    };
  }

  if (decoded.expired) {
    return {
      success: false,
      message: "Token is expired",
    };
  }

  return {
    success: true,
    message: "Token is valid",
    payload: decoded.payload,
  };
};
