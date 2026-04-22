import { userRoleEnum } from "@/schema/common";
import { bdPhoneRegex } from "@/utils/regex";
import z from "zod";

export const userSchema = z.object({
  sap_id: z.string().min(1),
  password: z.string().min(6),
  role: userRoleEnum,
});

export const userInformationSchema = z.object({
  user_code: z.string().min(1),
  sap_id: z.string().min(1),
  full_name: z.string().min(1),
  designation: z.string().min(1),
  mobile: z.string().min(1).optional(),
  email: z.email().optional(),
  team: z.string().min(1).optional(),
  area_code: z.string().min(1),
  area_name: z.string().min(1),
  sap_area_code: z.string().min(1),
});

export const userGroupSchema = z.object({
  mio_sap_id: z.string().min(1),
  rm_sap_id: z.string().min(1),
  zm_sap_id: z.string().min(1),
  sm_sap_id: z.string().min(1),
  gm_sap_id: z.string().min(1),
});

export const bulkUsersSchema = z.array(
  z.object({
    MIOCode: z.string().min(1),
    SAPMIOCode: z.string().min(1),
    MIOName: z.string().min(1),
    Designation: z.string().min(1),
    Email: z.email().optional(),
    Phone: z.string().regex(bdPhoneRegex, "Invalid Phone Number").optional(),
    Team: z.string().min(1),
    AreaName: z.string().min(1),
    AreaCode: z.string().min(1),
    SAPAreaCode: z.string().min(1),
    RMCode: z.string().min(1),
    SAPRMCode: z.string().min(1),
    RMName: z.string().min(1),
    MailID: z.email().optional(),
    RegionName: z.string().min(1),
    RegionCode: z.string().min(1),
    SAPRegionCode: z.string().min(1),
    ZMCode: z.string().min(1),
    SAPZMCode: z.string().min(1),
    ZMName: z.string().min(1),
    ZoneName: z.string().min(1),
    ZoneCode: z.string().min(1),
    SAPZoneCode: z.string().min(1),
    SMCode: z.string().min(1),
    SAPSMCode: z.string().min(1),
    SMName: z.string().min(1),
    SMAreaName: z.string().min(1),
    SMAreaCode: z.string().min(1),
    SAPSMAreaCode: z.string().min(1),
    GMCode: z.string().min(1),
    SAPGMCode: z.string().min(1),
    GMName: z.string().min(1),
    GMAreaName: z.string().min(1),
    GMAreaCode: z.string().min(1),
    SAPGMAreaCode: z.string().min(1),
  }),
);

export type BulkUsersType = z.infer<typeof bulkUsersSchema>;
