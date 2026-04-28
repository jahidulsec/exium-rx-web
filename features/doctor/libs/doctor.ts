"use server";

import { db } from "@/config/db";
import { Prisma } from "@/lib/generated/prisma";
import { apiResponse } from "@/lib/response";
import { baseQuerySchema } from "@/schema/base-query";
import z from "zod";


const doctorQuerySchema = baseQuerySchema.extend({
  sapAreaCode: z.string().optional(),
});

type DoctorQueryType = z.infer<typeof doctorQuerySchema>;

export type DoctorMulti = Prisma.doctorGetPayload<{
  include: {
    _count: true;
  };
}>;

export const getDoctors = async (query: DoctorQueryType) => {
  try {
    const validatedParams = doctorQuerySchema.parse(query);

    const filter: Prisma.doctorWhereInput = {
      ...(validatedParams.search && {
        OR: [
          {
            dr_child_id: validatedParams.search,
          },
          {
            full_name: {
              startsWith: validatedParams.search,
            },
          },
        ],
      }),
      sap_area_code: validatedParams.sapAreaCode,
    };

    const [data, count] = await Promise.all([
      db.doctor.findMany({
        where: filter,
        take: validatedParams.size,
        skip: (validatedParams.page - 1) * validatedParams.size,
        orderBy: {
          full_name: "asc",
        },
        include: {
          _count: true,
        },
      }),
      db.doctor.count({
        where: filter,
      }),
    ]);


    return apiResponse.multi<DoctorMulti>({
      data,
      count,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
