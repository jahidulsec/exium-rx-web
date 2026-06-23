"use server";

import { db } from "@/config/db";
import { Prisma } from "@/lib/generated/prisma";
import { apiResponse } from "@/lib/response";
import { baseQuerySchema, BaseQueryType } from "@/schema/base-query";

export const getBrands = async (query: BaseQueryType) => {
  try {
    const { page, size, search } = baseQuerySchema.parse(query);

    const filter: Prisma.brandWhereInput = {
      ...(search && {
        name: { startsWith: search },
      }),
    };

    const [res, count] = await Promise.all([
      db.brand.findMany({
        where: filter,
        take: size,
        skip: (page - 1) * size,
      }),
      db.brand.count({
        where: filter,
      }),
    ]);

    return apiResponse.multi({
      message: "Get brands successfully",
      data: res,
      count,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
