import { bdPhoneRegex } from "@/utils/regex";
import z from "zod";

export const doctorsSchema = z.array(
  z.object({
    SAPSMAreaCode: z.string().min(1),
    SMAreaName: z.string().min(1),
    SAPZoneCode: z.string().min(1),
    ZoneName: z.string().min(1),
    SAPRegionCode: z.string().min(1),
    RegionName: z.string().min(1),
    SAPAreaCode: z.string().min(1),
    AreaName: z.string().min(1),
    AreaGroup: z.string().min(1),
    DrSL: z.string().min(1),
    DrMasterID: z.string().min(1),
    DrChildID: z.string().min(1),
    PPPPID: z.string().optional(),
    DoctorName: z.string().min(1),
    Gender: z.string().optional(),
    Degrees: z.string().min(1),
    Speciality: z.string().optional(),
    Chamber: z.string().optional(),
    CellPhone1: z.string().regex(bdPhoneRegex, "Invalid mobile number").optional(),
    DrClass: z.string().optional(),
    RxQty: z.coerce.number().optional(),
    EMP: z.string().optional(),
    EXM: z.string().optional(),
  }),
);

export type DoctorsType = z.infer<typeof doctorsSchema>;
