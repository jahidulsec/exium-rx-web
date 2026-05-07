"use server";

import { db } from "@/config/db";
import { Prisma } from "@/lib/generated/prisma";
import { apiResponse } from "@/lib/response";
import { baseQuerySchema } from "@/schema/base-query";
import z from "zod";
import { startOfDay, endOfDay } from "date-fns";

const doctorQuerySchema = baseQuerySchema.extend({
  sapAreaCode: z.string().optional(),
  sapRegionCode: z.string().optional(),
  rxDate: z.date().optional(),
});

type DoctorQueryType = z.infer<typeof doctorQuerySchema>;

export type DoctorMulti = Prisma.doctorGetPayload<{
  include: {
    _count: {
      select: {
        doctor_rx: true;
      };
    };
  };
}>;

export const getDoctors = async (query: DoctorQueryType) => {
  try {
    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    let startDate: Date = startOfDay(prevDate);
    let endDate: Date = endOfDay(prevDate);

    const validatedParams = doctorQuerySchema.parse(query);

    if (validatedParams.rxDate) {
      startDate = startOfDay(validatedParams.rxDate);
      endDate = endOfDay(validatedParams.rxDate);
    }

    console.log(validatedParams);

    const filter: Prisma.doctorWhereInput = {
      ...(validatedParams.search && {
        OR: [
          {
            full_name: {
              contains: validatedParams.search,
            },
          },
          {
            dr_child_id: {
              contains: validatedParams.search,
            },
          },
          {
            dr_master_id: {
              contains: validatedParams.search,
            },
          },
          {
            id: Number(validatedParams.search),
          },
        ],
      }),
      sap_area_code: validatedParams.sapAreaCode,
      sap_region_code: validatedParams.sapRegionCode,
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
          _count: {
            select: {
              doctor_rx: {
                where: {
                  rx_date: {
                    gte: startDate,
                    lt: endDate,
                  },
                },
              },
            },
          },
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
