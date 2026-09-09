/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { decodeJwt } from "@/lib/jwt-decode";
import { UserInfo } from "@/types/user.interface";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo | any> => {
  let userInfo: UserInfo | any;
  try {
    const response = await serverFetch.get("/auth/me", {
      next: { tags: ["user-info"], revalidate: 180 },
    });

    const result = await response.json();

    if (result.success) {
      const accessToken = await getCookie("accessToken");

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const decoded = decodeJwt(accessToken);
      const tokenRole =
        decoded && !decoded.expired ? (decoded.payload.role as string) : "USER";
      const tokenEmail = decoded?.payload.email as string | undefined;

      userInfo = {
        name: "Unknown User",
        email: tokenEmail,
        role: tokenRole,
      };
    }
    userInfo = {
      name: result.data.fullName || "Unknown User",
      ...result.data,
    };
    return userInfo;
  } catch (error: any) {
    console.log(error);
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "USER",
    };
  }
};
