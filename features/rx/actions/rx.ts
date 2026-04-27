"use server";

import { apiResponse } from "@/lib/response";
import { DoctorRxType } from "./schema";
import { db } from "@/config/db";

export const createDoctorRx = async (data: DoctorRxType) => {
  try {
    const res = await db.doctor_rx.create({
      data,
    });

    return apiResponse.single({
      data: res,
      message: "New RX is created successfully"
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
