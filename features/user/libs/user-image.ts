"use server";

import { db } from "@/config/db";
import { apiResponse } from "@/lib/response";

export const getUserImage = async (userId: string) => {
  try {
    const user = await db.user_image.findUnique({
      where: {
        user_id: userId,
      },
    });

    return apiResponse.single({
      message: "Get user image successful",
      data: user,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
