import z from "zod";

export const userRoleEnum = z.enum([
  "mio",
  "sm",
  "rm",
  "zm",
  "gm",
  "superadmin",
]);