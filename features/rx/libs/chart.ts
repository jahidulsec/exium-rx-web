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
            DATE(CONVERT_TZ(drx.rx_date, '+00:00', '+06:00')) date,
            SUM(drx.quantity) AS total_quantity
        FROM doctor_rx drx
            WHERE drx.rx_date >= UTC_TIMESTAMP() - INTERVAL 30 DAY
        group by date
        order by date asc
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
