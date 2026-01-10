/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { AdminAnalyticsData, HostAnalyticsData } from "@/types/meta.interface";

export type AnalyticsData = AdminAnalyticsData | HostAnalyticsData;

export async function getAnalytics() {
  try {
    const response = await serverFetch.get("/meta", {
      cache: "no-store",
      next: { tags: ["analytics"] },
    });
    const result = await response.json();
    console.log("Analytics Data:", result);
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
