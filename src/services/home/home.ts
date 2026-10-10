"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getLandingStats() {
  try {
    const response = await serverFetch.get("/meta/landing-page", {
      cache: "force-cache",
      next: { tags: ["landing-page-stats"] },
    });
    return await response.json();
  } catch {
    return { success: false, data: null };
  }
}

export async function getTopHosts() {
  try {
    const response = await serverFetch.get("/users/top-hosts", {
      cache: "force-cache",
      next: { tags: ["top-hosts"] },
    });
    return await response.json();
  } catch {
    return { success: false, data: [] };
  }
}
