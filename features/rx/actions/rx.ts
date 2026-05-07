"use server";

import { apiResponse } from "@/lib/response";
import { DoctorRxType } from "./schema";
import { db } from "@/config/db";
import { revalidatePath } from "next/cache";

export const createDoctorRx = async (data: DoctorRxType) => {
  try {
    const { doctor_id, user_id, updated_by, ...rest } = data;
    const res = await db.doctor_rx.create({
      data: {
        ...rest,
        user_id: user_id,
        doctor_id: Number(doctor_id),
        doctor_rx_history: {
          create: {
            ...rest,
            updated_by,
          },
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");

    return apiResponse.single({
      data: res,
      message: "New RX is created successfully",
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
