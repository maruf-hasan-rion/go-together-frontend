"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function getAllUsers(queryString?: string) {
	try {
		const response = await serverFetch.get(
			`/admin/users${queryString ? `?${queryString}` : ""}`,
			{
				cache: "no-store",
				next: { tags: ["all-clients"] },
			},
		);
		const result = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Something went wrong",
		};
	}
}

export async function suspendClient(clientId: string) {
	try {
		const response = await serverFetch.patch(`/admin/users/${clientId}/block`, {
			cache: "no-store",
		});
		const result = await response.json();

		if (result.success) {
			revalidateTag("all-clients", { expire: 0 });
			revalidateTag("all-hosts", { expire: 0 });
			revalidateTag("all-host-applications", { expire: 0 });
		}
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Something went wrong",
		};
	}
}

export async function unsuspendClient(clientId: string) {
	try {
		const response = await serverFetch.patch(
			`/admin/users/${clientId}/unblock`,
			{
				cache: "no-store",
			},
		);
		const result = await response.json();

		if (result.success) {
			revalidateTag("all-clients", { expire: 0 });
			revalidateTag("all-hosts", { expire: 0 });
			revalidateTag("all-host-applications", { expire: 0 });
		}
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Something went wrong",
		};
	}
}

export async function getAllHosts(queryString?: string) {
	try {
		const response = await serverFetch.get(
			`/admin/hosts${queryString ? `?${queryString}` : ""}`,
			{
				cache: "no-store",
			},
		);
		const result = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Something went wrong",
		};
	}
}

export async function getAllHostApplications(queryString?: string) {
	try {
		const response = await serverFetch.get(
			`/admin/host-applications${queryString ? `?${queryString}` : ""}`,
			{
				cache: "no-store",
			},
		);
		const result = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Something went wrong",
		};
	}
}

export async function approveHostApplication(applicationId: string) {
	try {
		const response = await serverFetch.patch(
			`/admin/host-applications/${applicationId}/approve`,
			{
				cache: "no-store",
			},
		);
		const result = await response.json();

		if (result.success) {
			revalidateTag("all-host-applications", { expire: 0 });
			revalidateTag("all-hosts", { expire: 0 });
			revalidateTag("all-clients", { expire: 0 });
		}
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Something went wrong",
		};
	}
}

export async function rejectHostApplication(applicationId: string) {
	try {
		const response = await serverFetch.patch(
			`/admin/host-applications/${applicationId}/reject`,
			{
				cache: "no-store",
			},
		);
		const result = await response.json();

		if (result.success) {
			revalidateTag("all-host-applications", { expire: 0 });
			revalidateTag("all-hosts", { expire: 0 });
			revalidateTag("all-clients", { expire: 0 });
		}
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Something went wrong",
		};
	}
}
