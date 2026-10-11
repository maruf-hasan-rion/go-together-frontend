/**
 * Demo credentials for the one-click login buttons. Kept in a plain module
 * (NOT a "use server" file, which may only export async functions).
 *
 * These must match the accounts created by `pnpm run seed` in the backend.
 */
export const DEMO_CREDENTIALS = {
  ADMIN: { email: "admin@gmail.com", password: "123456" },
  HOST: { email: "host@gmail.com", password: "123456" },
  USER: { email: "user@gmail.com", password: "123456" },
} as const;

export type DemoRole = keyof typeof DEMO_CREDENTIALS;
