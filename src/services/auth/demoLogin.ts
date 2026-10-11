"use server";

import { DEMO_CREDENTIALS, type DemoRole } from "@/lib/demo-credentials";
import { loginUser } from "./loginUser";

/**
 * Logs in as a demo account. Each entry is a real user in the database
 * (created by `pnpm run seed`), so this exercises the full auth flow.
 */
export const demoLogin = async (role: DemoRole) => {
  const credentials = DEMO_CREDENTIALS[role];

  const formData = new FormData();
  formData.set("email", credentials.email);
  formData.set("password", credentials.password);

  // loginUser redirects to the role's dashboard on success.
  return loginUser(null, formData);
};
