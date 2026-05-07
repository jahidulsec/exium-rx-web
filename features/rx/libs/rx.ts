"use server";

import { db } from "@/config/db";
import { Prisma } from "@/lib/generated/prisma";
import { apiResponse } from "@/lib/response";
import {
  doctorRxExtendedQuery,
  DoctorRxExtendedQueryType,
  doctorRxQuerySchema,
  DoctorRxQuerySchemaType,
} from "../actions/schema";
import { endOfDay, startOfDay } from "date-fns";

export const getDoctorRxs = async (query: DoctorRxQuerySchemaType) => {
  let startDate: Date | undefined = undefined;
  let endDate: Date | undefined = undefined;

  try {
    const { search, start, end, ...validatedQuery } =
      doctorRxQuerySchema.parse(query);

    if (start) {
      startDate = startOfDay(start);
    }

    if (end) {
      endDate = endOfDay(end);
    }

    const filter: Prisma.doctor_rxWhereInput = {
      ...(search && {
        OR: [
          {
            doctor: {
              full_name: {
                contains: search,
              },
            },
          },
          {
            doctor: {
              dr_child_id: {
                contains: search,
              },
            },
          },
          {
            doctor: {
              dr_master_id: {
                contains: search,
              },
            },
          },
        ],
      }),
      ...(validatedQuery.sap_area_code && {
        doctor: {
          sap_area_code: validatedQuery.sap_area_code,
        },
      }),
      ...(validatedQuery.sap_region_code && {
        doctor: {
          sap_region_code: validatedQuery.sap_region_code,
        },
      }),
      ...(validatedQuery.sap_sm_area_code && {
        doctor: {
          sap_sm_area_code: validatedQuery.sap_sm_area_code,
        },
      }),
      ...(validatedQuery.sap_zone_code && {
        doctor: {
          sap_zone_code: validatedQuery.sap_zone_code,
        },
      }),
      ...(validatedQuery.status && {
        status: validatedQuery.status,
      }),
      ...(startDate &&
        endDate && {
          rx_date: {
            gte: startDate,
            lte: endDate,
          },
        }),
    };

    const [data, count] = await Promise.all([
      db.doctor_rx.findMany({
        where: filter,
        include: {
          doctor: {
            select: {
              full_name: true,
            },
          },
          user: {
            select: {
              user_information: {
                select: {
                  full_name: true,
                  sap_area_code: true,
                },
              },
            },
          },
        },
        take: validatedQuery.size,
        skip: (validatedQuery.page - 1) * validatedQuery.size,
        orderBy: [
          {
            doctor: {
              full_name: "asc",
            },
          },
          { created_at: "desc" },
        ],
      }),
      db.doctor_rx.count({
        where: filter,
      }),
    ]);

    return apiResponse.multi({
      data,
      count,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};

export const getDoctorRxExportList = async (
  query: DoctorRxExtendedQueryType,
) => {
  try {
    const { start, end, sap_region_code, status, search } =
      doctorRxExtendedQuery.parse(query);

    const conditions: string[] = [];
    const values: any[] = [];

    if (sap_region_code) {
      conditions.push(`d.sap_region_code = ?`);
      values.push(sap_region_code);
    }

    if (start && end) {
      const startDate = startOfDay(start);
      const endDate = endOfDay(end);

      conditions.push(`drx.rx_date >= ? AND drx.rx_date <= ?`);
      values.push(startDate, endDate);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const baseQuery = `
  SELECT 
    drx.id,
    d.full_name,
    d.degrees,
    d.dr_master_id,
    d.dr_child_id,
    d.mobile,
    d.region_name,
    d.sap_region_code,
    d.area_name,
    d.sap_area_code,
    drx.quantity,
    drx.status,
    drx.rx_date,
    drx.created_at
  FROM doctor_rx drx
  LEFT JOIN doctor d ON d.id = drx.doctor_id
  ${whereClause}
  ORDER BY d.full_name ASC, drx.rx_date DESC
`;

    const data = await db.$queryRawUnsafe(baseQuery, ...values);

    return apiResponse.multi({
      message: "successful",
      data: data as any[],
      count: 0,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
