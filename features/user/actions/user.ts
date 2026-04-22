"use server";

import { apiResponse } from "@/lib/response";
import { bulkUsersSchema, BulkUsersType } from "./schema";

export const createUsers = async (data: BulkUsersType) => {
  try {
    const validatedData = bulkUsersSchema.parse(data);
    return apiResponse.single({
      message: "Users upload successfully",
      data: null,
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
