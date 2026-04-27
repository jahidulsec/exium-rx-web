import z from "zod";

export const doctorRxSchema = z.object({
  user_id: z.string(),
  brand_id: z.number(),
  doctor_id: z.number(),
  quantity: z.number(),
  rx_date: z.date(),
});

export type DoctorRxType = z.infer<typeof doctorRxSchema>;
