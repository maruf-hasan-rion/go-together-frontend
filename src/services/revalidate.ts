
"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";

export async function revalidateAllData() {
    try {
        // Event-related tags
        revalidateTag('my-booked-events', { expire: 0 });
        revalidateTag('all-events', { expire: 0 });
        revalidateTag('event-participants', { expire: 0 });
        revalidateTag('single-event', { expire: 0 });
        revalidateTag('my-hosted-events', { expire: 0 });
        revalidateTag('event-applications', { expire: 0 });
        revalidateTag('landing-page-stats', { expire: 0 });

        // User-related tags
        revalidateTag('user-profile', { expire: 0 });

        // Admin-related tags
        revalidateTag('all-clients', { expire: 0 });
        revalidateTag('all-hosts', { expire: 0 });
        revalidateTag('all-host-applications', { expire: 0 });
        revalidateTag('user-payments', { expire: 0 });

        return { success: true };
    } catch (error: any) {
        console.log(error);
        return { success: false };
    }
}