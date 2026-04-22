import { user_role } from "@/lib/generated/prisma";

export type AuthUser = {
  sapId: string;
  name: string;
  role: AuthUserRole;
};

export type AuthUserRole = user_role;
