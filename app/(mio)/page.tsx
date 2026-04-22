import { getAuthUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import React from "react";

export default async function MioHomePage() {
  const user = await getAuthUser();

  if (!user) redirect("/login");

  if (user.role !== "mio") redirect("/dashboard");

  return <div>MioHomePage</div>;
}
