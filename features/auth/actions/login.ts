"use server";

import { db } from "@/config/db";
import { apiResponse, response } from "@/lib/response";
import { createSession, deleteSession } from "@/lib/session";
import { isValidPassword } from "@/utils/password";
import { LoginType } from "./schema";

export const userLogin = async (data: LoginType) => {
  try {
    // check user
    const user = await db.user.findUnique({
      where: {
        sap_id: data.sap_id,
      },
      include: {
        user_information: {
          select: {
            full_name: true,
            mobile: true,
          },
        },
      },
    });

    if (!user) throw new Error("User does not exist");

    // check password
    if (!(await isValidPassword(data.password, user.password)))
      throw new Error("Invalid password");

    // create session
    await createSession({
      sapId: user.sap_id,
      role: user.role,
      name: user.user_information?.[0]?.full_name ?? user.sap_id,
    });

    return apiResponse.single({
      message: "You are logged in successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return apiResponse.error({
      error,
    });
  }
};

export const userLogout = async () => {
  try {
    await deleteSession();
    return response({ success: true, message: "You are logged out" });
  } catch (error) {
    return apiResponse.error({
      error,
    });
  }
};
