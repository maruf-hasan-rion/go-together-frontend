"use server";

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await serverFetch.get("/auth/me", {
      next: { tags: ["user-info"], revalidate: 180 },
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
    console.log(error);
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
