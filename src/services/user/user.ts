"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getUserProfile(id: string) {
  try {
    const response = await serverFetch.get(`/users/${id}`, {
      cache: "force-cache",
      next: { tags: ["public-profile"] },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to load profile",
    };
  }
}
