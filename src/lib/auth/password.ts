import { z } from "zod";

/**
 * Matches the minimum configured in the Supabase dashboard (both projects).
 * If that setting ever changes, change this too, or a password Supabase
 * rejects will look like it passed client-side only to fail on submit.
 */
export const PASSWORD_MIN_LENGTH = 10;

export const newPassword = z
  .string()
  .min(
    PASSWORD_MIN_LENGTH,
    `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
  );

/** Pass to `.refine()` on a schema with `password` and `confirmPassword`. */
export const passwordsMatch: [
  (data: { password: string; confirmPassword: string }) => boolean,
  { message: string; path: string[] },
] = [
  (data) => data.password === data.confirmPassword,
  { message: "Passwords don't match.", path: ["confirmPassword"] },
];
