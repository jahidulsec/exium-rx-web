"use server";

import { db } from "@/config/db";
import { apiResponse } from "@/lib/response";
import { getSerializeData } from "@/utils/helper";

export type RxQuantityStatsMultiProps = {
  date: Date | string;
  total_quantity: number;
};

export const getRxQuantityStats = async () => {
  try {
    const baseQuery = `
        SELECT 
            d.date,
                COALESCE(SUM(drx.quantity), 0) AS total_quantity
            FROM (
                SELECT CURDATE() - INTERVAL n DAY AS date
                FROM (
                    SELECT 0 n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
                    UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
                    UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14
                    UNION ALL SELECT 15 UNION ALL SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19
                    UNION ALL SELECT 20 UNION ALL SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23 UNION ALL SELECT 24
                    UNION ALL SELECT 25 UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL SELECT 28 UNION ALL SELECT 29
                ) nums
            ) d
            LEFT JOIN doctor_rx drx
            ON DATE(drx.rx_date) = d.date
            GROUP BY d.date
            ORDER BY d.date ASC;
        `;

    const data = await db.$queryRawUnsafe(baseQuery);

    return apiResponse.multi({
      message: "GET stats successful",
      data: getSerializeData(data) as RxQuantityStatsMultiProps[],
      count: (data as RxQuantityStatsMultiProps[]).length,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
