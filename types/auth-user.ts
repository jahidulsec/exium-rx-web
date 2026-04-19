export type AuthUser = {
  id: string;
  workAreaCode: string;
  name: string;
  mobile: string;
  role: AuthUserRole[];
};

export type AuthUserRole = string;
