import { userRoleEnum } from "@/schema/common";
import { bdPhoneRegex } from "@/utils/regex";
import z from "zod";

const MAX_FILE_SIZE = 500 * 1024; // 500KB

export const userSchema = z.object({
  user_id: z.string().min(1),
  password: z.string().min(6),
  role: userRoleEnum,
});

export const userInformationSchema = z.object({
  user_code: z.string().min(1),
  sap_id: z.string().min(1),
  full_name: z.string().min(1),
  designation: z.string().min(1),
  mobile: z.string().regex(bdPhoneRegex, "Invalid phone number").optional(),
  email: z.email().optional(),
  team: z.string().min(1).optional(),
  area_code: z.string().min(1),
  area_name: z.string().min(1),
  sap_area_code: z.string().min(1),
});

export const userProfileSchema = userSchema
  .omit({ password: true, role: true })
  .extend(
    userInformationSchema.omit({
      user_code: true,
      sap_id: true,
      team: true,
      area_code: true,
      area_name: true,
      sap_area_code: true,
    }).shape,
  );

export const userGroupSchema = z.object({
  mio_code: z.string().min(1),
  rm_code: z.string().min(1),
  zm_code: z.string().min(1),
  sm_code: z.string().min(1),
  gm_code: z.string().min(1),
});

export const bulkUsersSchema = z.array(
  z.object({
    MIOCode: z.string().min(1),
    SAPMIOCode: z.string().min(1),
    MIOName: z.string().min(1),
    Designation: z.string().min(1),
    Email: z.string().optional(),
    Phone: z.string().optional(),
    Team: z.string().min(1),
    AreaName: z.string().min(1),
    AreaCode: z.string().min(1),
    SAPAreaCode: z.string().min(1),
    RMCode: z.string().min(1),
    SAPRMCode: z.string().min(1),
    RMName: z.string().min(1),
    RMDesignation: z.string().min(1),
    RMEmail: z.string().optional(),
    RMPhone: z.string().optional(),
    RegionName: z.string().min(1),
    RegionCode: z.string().min(1),
    SAPRegionCode: z.string().min(1),
    ZMCode: z.string().min(1),
    SAPZMCode: z.string().min(1),
    ZMName: z.string().min(1),
    ZMDesignation: z.string().min(1),
    ZMEmail: z.string().optional(),
    ZMPhone: z.string().optional(),
    ZoneName: z.string().min(1),
    ZoneCode: z.string().min(1),
    SAPZoneCode: z.string().min(1),
    SMCode: z.string().min(1),
    SAPSMCode: z.string().min(1),
    SMName: z.string().min(1),
    SMDesignation: z.string().min(1),
    SMEmail: z.string().optional(),
    SMPhone: z.string().optional(),
    SMAreaName: z.string().min(1),
    SMAreaCode: z.string().min(1),
    SAPSMAreaCode: z.string().min(1),
    GMCode: z.string().min(1),
    SAPGMCode: z.string().min(1),
    GMName: z.string().min(1),
    GMDesignation: z.string().min(1),
    GMEmail: z.string().optional(),
    GMPhone: z.string().optional(),
    GMAreaName: z.string().min(1),
    GMAreaCode: z.string().min(1),
    SAPGMAreaCode: z.string().min(1),
  }),
);

export const userWithInformationSchema = userSchema
  .extend(userInformationSchema.shape)
  .omit({ user_code: true });

export const userImageSchema = z.object({
  user_id: z.string(),
  image: z
    .instanceof(File, { message: "Upload a valid file" })
    .refine(
      (file) => file.type.toLowerCase().startsWith("image/"),
      "Upload only jpg, png",
    )
    .refine(
      (file) => file.size < MAX_FILE_SIZE,
      "File size is not more than 500 KB",
    ), // 500 Kb,
});

export type BulkUsersType = z.infer<typeof bulkUsersSchema>;
export type UserWithInformationType = z.infer<typeof userWithInformationSchema>;
export type UserProfileType = z.infer<typeof userProfileSchema>;
export type UserImageType = z.infer<typeof userImageSchema>;
