"use server";

import { db } from "@/config/db";
import { Prisma } from "@/lib/generated/prisma";
import { apiResponse } from "@/lib/response";
import { userQuerySchema, UserQuerySchemaType } from "../actions/schema";

export type UserMultiProps = Prisma.userGetPayload<{
  include: {
    user_information: {
      select: {
        full_name: true;
      };
    };
  };
}>;

export type UserProfileSingleType = Prisma.userGetPayload<{
  include: {
    user_information: {
      select: {
        full_name: true;
        email: true;
        mobile: true;
        designation: true;
      };
    };
  };
}>;

export const getUserProfile = async (userId: string) => {
  try {
    const data = await db.user.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        user_information: {
          select: {
            full_name: true,
            email: true,
            mobile: true,
            designation: true,
          },
        },
      },
    });

    return apiResponse.single({
      message: "Get user profile information successful",
      data,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};

export const getUsers = async (query: UserQuerySchemaType) => {
  try {
    const { page, size, search, ...validatedQuery } =
      userQuerySchema.parse(query);

    const filter: Prisma.userWhereInput = {
      ...(search && {
        OR: [
          {
            user_id: {
              startsWith: search,
            },
          },
          {
            user_information: {
              full_name: {
                contains: search,
              },
            },
          },
        ],
      }),
      ...(validatedQuery.role && {
        role: validatedQuery.role,
      }),
      ...(validatedQuery.sap_region_code && {
        user_group_user_group_mio_codeTouser: {
          rm_code: validatedQuery.sap_region_code,
        },
      }),
    };

    const [data, count] = await Promise.all([
      db.user.findMany({
        where: filter,
        include: {
          user_information: {
            select: {
              full_name: true,
            },
          },
        },
        take: size,
        skip: (page - 1) * size,
      }),
      db.user.count({
        where: filter,
      }),
    ]);

    return apiResponse.multi({
      message: "Get users successful",
      data,
      count,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
