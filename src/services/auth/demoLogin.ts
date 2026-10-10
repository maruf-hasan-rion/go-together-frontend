"use server";

import { loginUser } from "./loginUser";

/**
 * Demo credentials match the accounts created by `pnpm run seed` on the
 * backend (prisma/seed.ts). Each entry is a real user in the database, so the
 * one-click login exercises the full auth flow.
 */
export const DEMO_CREDENTIALS = {
  ADMIN: { email: "admin@gotogether.dev", password: "Demo@1234" },
  HOST: { email: "host@gotogether.dev", password: "Demo@1234" },
  USER: { email: "user@gotogether.dev", password: "Demo@1234" },
} as const;

export type DemoRole = keyof typeof DEMO_CREDENTIALS;

export const demoLogin = async (role: DemoRole) => {
  const credentials = DEMO_CREDENTIALS[role];

  const formData = new FormData();
  formData.set("email", credentials.email);
  formData.set("password", credentials.password);

  // loginUser redirects to the role's dashboard on success.
  return loginUser(null, formData);
};
