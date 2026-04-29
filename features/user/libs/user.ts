"use server";

import { db } from "@/config/db";
import { Prisma } from "@/lib/generated/prisma";
import { apiResponse } from "@/lib/response";

export type UserProfileSingleType = Prisma.userGetPayload<{
  include: {
    user_information: {
      select: {
        full_name: true;
        email: true;
        mobile: true;
        designation: true;
      };
    };
  };
}>;

export const getUserProfile = async (userId: string) => {
  try {
    const data = await db.user.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        user_information: {
          select: {
            full_name: true,
            email: true,
            mobile: true,
            designation: true,
          },
        },
      },
    });

    return apiResponse.single({
      message: "Get user profile information successful",
      data,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
