import { user_role } from "@/lib/generated/prisma";

export type AuthUser = {
  userId: string;
  name: string;
  role: AuthUserRole;
  areaCode: string;
};

export type AuthUserRole = user_role;
