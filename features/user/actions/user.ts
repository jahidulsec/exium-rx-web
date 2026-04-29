"use server";

import { apiResponse } from "@/lib/response";
import {
  bulkUsersSchema,
  BulkUsersType,
  UserProfileType,
  UserWithInformationType,
} from "./schema";
import { db } from "@/config/db";
import { hashPassword } from "@/utils/password";
import { env } from "@/lib/env";
import { revalidatePath } from "next/cache";

export const createUsers = async (data: BulkUsersType) => {
  let rmCode = "";
  let zmCode = "";
  let smCode = "";
  let gmCode = "";

  try {
    const validatedData = bulkUsersSchema.parse(data);

    for (const item of validatedData) {
      // upsert mio
      await upsertUserWithInformation({
        user_id: item.MIOCode,
        full_name: item.MIOName,
        designation: item.Designation,
        email: item.Email,
        mobile: item.Phone,
        team: item.Team,
        area_code: item.AreaCode,
        area_name: item.AreaName,
        sap_area_code: item.SAPAreaCode,
        sap_id: item.SAPMIOCode,
        role: "mio",
        password: await hashPassword(env.DEFAULT_USER_PASSWORD),
      });

      // create or update rm
      if (rmCode !== item.RMCode) {
        rmCode = item.RMCode;

        await upsertUserWithInformation({
          user_id: item.RMCode,
          full_name: item.RMName,
          designation: item.RMDesignation,
          email: item.RMEmail,
          mobile: item.RMPhone,
          team: item.Team,
          area_code: item.RegionCode,
          area_name: item.RegionName,
          sap_area_code: item.SAPRegionCode,
          sap_id: item.SAPRMCode,
          role: "rm",
          password: await hashPassword(env.DEFAULT_USER_PASSWORD),
        });
      }

      // create or update zm
      if (zmCode !== item.ZMCode) {
        zmCode = item.ZMCode;

        await upsertUserWithInformation({
          user_id: item.ZMCode,
          full_name: item.ZMName,
          designation: item.ZMDesignation,
          email: item.ZMEmail,
          mobile: item.ZMPhone,
          team: item.Team,
          area_code: item.ZoneCode,
          area_name: item.ZoneName,
          sap_area_code: item.SAPZoneCode,
          sap_id: item.SAPZMCode,
          role: "zm",
          password: await hashPassword(env.DEFAULT_USER_PASSWORD),
        });
      }

      // create or update sm
      if (smCode !== item.SMCode) {
        smCode = item.SMCode;

        await upsertUserWithInformation({
          user_id: item.SMCode,
          full_name: item.SMName,
          designation: item.SMDesignation,
          email: item.SMEmail,
          mobile: item.SMPhone,
          team: item.Team,
          area_code: item.SMAreaCode,
          area_name: item.SMAreaName,
          sap_area_code: item.SAPSMAreaCode,
          sap_id: item.SAPSMCode,
          role: "sm",
          password: await hashPassword(env.DEFAULT_USER_PASSWORD),
        });
      }

      // create or update gm
      if (gmCode !== item.GMCode) {
        gmCode = item.GMCode;

        await upsertUserWithInformation({
          user_id: item.GMCode,
          full_name: item.GMName,
          designation: item.GMDesignation,
          email: item.GMEmail,
          mobile: item.GMPhone,
          team: item.Team,
          area_code: item.GMAreaCode,
          area_name: item.GMAreaName,
          sap_area_code: item.SAPGMAreaCode,
          sap_id: item.SAPGMCode,
          role: "gm",
          password: await hashPassword(env.DEFAULT_USER_PASSWORD),
        });
      }

      // create or update user group
      await db.user_group.upsert({
        where: {
          mio_code: item.MIOCode,
        },
        create: {
          mio_code: item.MIOCode,
          rm_code: item.RMCode,
          zm_code: item.ZMCode,
          sm_code: item.SMCode,
          gm_code: item.GMCode,
        },
        update: {
          rm_code: item.RMCode,
          zm_code: item.ZMCode,
          sm_code: item.SMCode,
          gm_code: item.GMCode,
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

const upsertUserWithInformation = async (data: UserWithInformationType) => {
  // create or update mio
  await db.user.upsert({
    where: {
      user_id: data.user_id,
    },
    create: {
      user_id: data.user_id,
      password: await hashPassword(env.DEFAULT_USER_PASSWORD),
      role: data.role,
    },
    update: {
      user_id: data.user_id,
    },
  });

  // create or update user mio information
  await db.user_information.upsert({
    where: {
      user_code: data.user_id,
    },
    create: {
      user_code: data.user_id,
      full_name: data.full_name,
      designation: data.designation,
      email: data.email,
      mobile: data.mobile,
      team: data.team,
      area_code: data.area_code,
      area_name: data.area_name,
      sap_area_code: data.sap_area_code,
      sap_id: data.sap_id,
    },
    update: {
      full_name: data.full_name,
      designation: data.designation,
      email: data.email,
      mobile: data.mobile,
      team: data.team,
      area_code: data.area_code,
      area_name: data.area_name,
      sap_area_code: data.sap_area_code,
      sap_id: data.sap_id,
    },
  });
};

export const updateUserProfile = async (data: UserProfileType) => {
  try {
    const { user_id, ...rest } = data;
    const user = await db.user_information.update({
      where: {
        user_code: user_id,
      },
      data: rest,
    });

    revalidatePath("/profile");
    revalidatePath("/");
    revalidatePath("/dashboard");

    return apiResponse.single({
      message: "Profile is updated",
      data: user,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
