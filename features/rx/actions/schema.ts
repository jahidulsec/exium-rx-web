import { baseQuerySchema } from "@/schema/base-query";
import z from "zod";

export const doctorRxSchema = z.object({
  user_id: z.string(),
  updated_by: z.string(),
  brand_id: z.number().optional(),
  doctor_id: z.string(),
  quantity: z.number(),
  rx_date: z.date(),
  status: z.enum(["approved", "disapproved", "pending"]).optional(),
});

export const doctorRxExtendedQuery = z.object({
  search: z.string().optional(),
  sap_area_code: z.string().optional(),
  sap_region_code: z.string().optional(),
  sap_zone_code: z.string().optional(),
  sap_sm_area_code: z.string().optional(),
  status: z.enum(["approved", "disapproved", "pending"]).optional(),
  start: z.coerce.date().optional(),
  end: z.coerce.date().optional(),
});

export const doctorRxQuerySchema = baseQuerySchema.extend(
  doctorRxExtendedQuery.omit({ search: true }).shape,
);

export type DoctorRxQuerySchemaType = z.infer<typeof doctorRxQuerySchema>;

export type DoctorRxType = z.infer<typeof doctorRxSchema>;
export type DoctorRxExtendedQueryType = z.infer<typeof doctorRxExtendedQuery>;
