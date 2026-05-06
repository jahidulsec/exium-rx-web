import { baseQuerySchema } from "@/schema/base-query";
import z from "zod";

export const doctorRxSchema = z.object({
    user_id: z.string(),
    brand_id: z.number(),
    doctor_id: z.number(),
    quantity: z.number(),
    rx_date: z.date(),
});

export const doctorRxQuerySchema = baseQuerySchema.extend({
    sap_area_code: z.string().optional(),
    sap_region_code: z.string().optional(),
    sap_zone_code: z.string().optional(),
    sap_sm_area_code: z.string().optional(),
    status: z.enum(['approved', 'disapproved', "pending"]).optional(),
})

export type DoctorRxQuerySchemaType = z.infer<typeof doctorRxQuerySchema>;


export type DoctorRxType = z.infer<typeof doctorRxSchema>;
