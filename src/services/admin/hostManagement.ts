// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { serverFetch } from "@/lib/server-fetch";
// import { zodValidator } from "@/lib/zodValidator";
// import { IHost } from "@/types/host.interface";
// import {
//   createHostZodSchema,
//   updateHostZodSchema,
// } from "@/zod/host.validation";

// export async function createHost(_prevState: any, formData: FormData) {
//   try {
//     const payload: Partial<IHost> = {
//       fullName: formData.get("fullName") as string,
//       email: formData.get("email") as string,

//     };
//     if (zodValidator(payload, createHostZodSchema).success === false) {
//       return zodValidator(payload, createHostZodSchema);
//     }

//     const validatedPayload = zodValidator(payload, createHostZodSchema).data;

//     if (!validatedPayload) {
//       throw new Error("Invalid payload");
//     }

//     const newPayload = {
//         fullName: validatedPayload.fullName,
//         email: validatedPayload.email,
//         password: validatedPayload.password
//     };
//     const newFormData = new FormData();
//     newFormData.append("data", JSON.stringify(newPayload));

//     if (formData.get("file")) {
//       newFormData.append("file", formData.get("file") as Blob);
//     }

//     const response = await serverFetch.post("/user/create-host", {
//       body: newFormData,
//     });

//     const result = await response.json();

//     return result;
//   } catch (error: any) {
//     console.log(error);
//     return {
//       success: false,
//       message: `${
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Something went wrong"
//       }`,
//     };
//   }
// }

// export async function getHosts(queryString?: string) {
//   try {
//     const response = await serverFetch.get(
//       `/host${queryString ? `?${queryString}` : ""}`
//     );
//     const result = await response.json();
//     return result;
//   } catch (error: any) {
//     console.log(error);
//     return {
//       success: false,
//       message: `${
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Something went wrong"
//       }`,
//     };
//   }
// }

// export async function getHostById(id: string) {
//   try {
//     const response = await serverFetch.get(`/doctor/${id}`);
//     const result = await response.json();
//     return result;
//   } catch (error: any) {
//     console.log(error);
//     return {
//       success: false,
//       message: `${
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Something went wrong"
//       }`,
//     };
//   }
// }

// export async function updateDoctor(
//   id: string,
//   _prevState: any,
//   formData: FormData
// ) {
//   try {
//     const payload: Partial<IHost> = {
//       fullName: formData.get("fullName") as string,
//         bio: formData.get("bio") as string,
//     };
//     const validatedPayload = zodValidator(payload, updateHostZodSchema).data;

//     const response = await serverFetch.patch(`/host/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(validatedPayload),
//     });
//     const result = await response.json();
//     return result;
//   } catch (error: any) {
//     console.log(error);
//     return {
//       success: false,
//       message: `${
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Something went wrong"
//       }`,
//     };
//   }
// }

// export async function softDeleteHost(id: string) {
//   try {
//     const response = await serverFetch.delete(`/host/soft/${id}`);
//     const result = await response.json();

//     return result;
//   } catch (error: any) {
//     console.log(error);
//     return {
//       success: false,
//       message: `${
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Something went wrong"
//       }`,
//     };
//   }
// }
// export async function deleteHost(id: string) {
//   try {
//     const response = await serverFetch.delete(`/host/${id}`);
//     const result = await response.json();

//     return result;
//   } catch (error: any) {
//     console.log(error);
//     return {
//       success: false,
//       message: `${
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Something went wrong"
//       }`,
//     };
//   }
// }
