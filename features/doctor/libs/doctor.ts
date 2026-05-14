"use server";

import { db } from "@/config/db";
import { doctor, Prisma } from "@/lib/generated/prisma";
import { apiResponse } from "@/lib/response";
import { baseQuerySchema } from "@/schema/base-query";
import z from "zod";
import { startOfDay, endOfDay, format } from "date-fns";
import { getSerializeData } from "@/utils/helper";

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

export type DoctorMultiWithQty = doctor & {
  total: number;
  qty: number;
};

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

export const getDoctorsWithQuantity = async (query: DoctorQueryType) => {
  try {
    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    let startDate: Date = startOfDay(prevDate);
    let endDate: Date = endOfDay(prevDate);

    const { rxDate, page, size, sapAreaCode, sapRegionCode, search } =
      doctorQuerySchema.parse(query);

    if (rxDate) {
      startDate = startOfDay(rxDate);
      endDate = endOfDay(rxDate);
    }

    const baseQuery = `
     SELECT 
      COUNT(*) OVER() AS total,
      dr.*,
      COALESCE(SUM(drx.quantity), 0) AS qty
    FROM doctor dr
    LEFT JOIN doctor_rx drx 
      ON drx.doctor_id = dr.id
      AND drx.rx_date >= "${format(startDate, "yyyy-MM-dd HH:mm:ss")}"
      AND drx.rx_date <= "${format(endDate, "yyyy-MM-dd HH:mm:ss")}"
    
    where 1=1
      ${sapAreaCode ? ` AND dr.sap_area_code = "${sapAreaCode}" ` : ""}
      ${sapRegionCode ? ` AND dr.sap_region_code = "${sapRegionCode}" ` : ""}
      ${search ? ` AND (dr.full_name like "%${search}%" OR dr.dr_master_id LIKE "%${search}%" OR dr.dr_child_id LIKE "%${search}%") ` : ""}
      
    GROUP BY dr.id, dr.full_name
    ORDER BY dr.full_name ASC
    LIMIT ${size}
    OFFSET ${(page - 1) * size}
    `;

    console.log(baseQuery);

    const data = await db.$queryRawUnsafe(baseQuery);

    return apiResponse.multi({
      data: getSerializeData(data),
      count: Number((data as any[])?.[0]?.total || 0),
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
