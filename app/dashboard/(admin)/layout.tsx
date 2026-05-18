import { getAuthUser } from "@/lib/dal";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function AdminSpecificLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  if (user.role !== "superadmin") return notFound();

  return <>{children}</>;
}
