"use server";

import { apiResponse } from "@/lib/response";
import { bulkUsersSchema, BulkUsersType } from "./schema";
import { db } from "@/config/db";
import { hashPassword } from "@/utils/password";
import { env } from "@/lib/env";

export const createUsers = async (data: BulkUsersType) => {
  try {
    const validatedData = bulkUsersSchema.parse(data);

    for (const item of validatedData) {
      // create or update mio
      await db.user.upsert({
        where: {
          user_id: item.MIOCode,
        },
        create: {
          user_id: item.MIOCode,
          password: await hashPassword(env.DEFAULT_USER_PASSWORD),
          role: "mio",
        },
        update: {
          user_id: item.MIOCode,
        },
      });

      // create or update user mio information
      await db.user_information.upsert({
        where: {
          user_code: item.MIOCode,
        },
        create: {
          user_code: item.MIOCode,
          full_name: item.MIOName,
          designation: item.Designation,
          email: item.Email,
          mobile: item.Phone,
          team: item.Team,
          area_code: item.AreaCode,
          area_name: item.AreaName,
          sap_area_code: item.SAPAreaCode,
          sap_id: item.SAPMIOCode,
        },
        update: {
          full_name: item.MIOName,
          designation: item.Designation,
          email: item.Email,
          mobile: item.Phone,
          team: item.Team,
          area_code: item.AreaCode,
          area_name: item.AreaName,
          sap_area_code: item.SAPAreaCode,
          sap_id: item.SAPMIOCode,
        },
      });
    }

    return apiResponse.single({
      message: "Users upload successfully",
      data: null,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
