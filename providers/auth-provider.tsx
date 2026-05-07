"use client";

import { getAuthUser } from "@/lib/dal";
import { AuthUser } from "@/types/auth-user";
import React from "react";

interface AuthProps {
  user: AuthUser | undefined;
}

const AuthContext = React.createContext<AuthProps | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = React.useState<AuthUser | undefined>(undefined);

  React.useEffect(() => {
    if (user) return;

    const handleData = async () => {
      const res = await getAuthUser();

      if (res) {
        setUser(res);
      }
    };

    handleData();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) throw new Error("Auth is not loaded");

  return context;
};
