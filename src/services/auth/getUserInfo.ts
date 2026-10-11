"use server";

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await serverFetch.get("/auth/me", {
      cache: "no-store",
    });

    const result = await response.json();

    if (!result?.success) {
      throw new Error("Not authenticated");
    }

    return {
      ...(result.data as UserInfo),
      fullName: result.data.fullName || "Unknown User",
    };
  } catch (error) {
    // Log the message only: logging the Error object makes the Next dev overlay
    // fail to resolve a source map and print a misleading "Invalid source map".
    console.log("getUserInfo:", error instanceof Error ? error.message : error);
    return {
      id: "",
      fullName: "Unknown User",
      email: "",
      role: "USER",
      createdAt: "",
      updatedAt: "",
    };
  }
};
