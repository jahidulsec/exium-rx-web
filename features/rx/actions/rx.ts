"use server";

import { apiResponse } from "@/lib/response";
import {
  approveDoctorRxsSchema,
  ApproveDoctorRxsType,
  DoctorRxType,
} from "./schema";
import { db } from "@/config/db";
import { revalidatePath } from "next/cache";

export const createDoctorRx = async (data: DoctorRxType) => {
  try {
    const { doctor_id, user_id, updated_by, status, ...rest } = data;
    const res = await db.doctor_rx.create({
      data: {
        ...rest,
        user_id: user_id,
        doctor_id: Number(doctor_id),
        status,
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

export const updateDoctorRx = async (id: number, data: DoctorRxType) => {
  try {
    const { doctor_id, user_id, updated_by, status, ...rest } = data;
    const res = await db.doctor_rx.update({
      where: {
        id,
      },
      data: {
        ...rest,
        user_id: user_id,
        doctor_id: Number(doctor_id),
        status,
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
    revalidatePath("/doctor/" + doctor_id);

    return apiResponse.single({
      data: res,
      message: "New RX is updated successfully",
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};

export const appovedDoctorRxs = async (data: ApproveDoctorRxsType) => {
  try {
    const formData = approveDoctorRxsSchema.parse(data);

    for (const i of formData) {
      await db.doctor_rx.update({
        where: {
          id: Number(i.id),
        },
        data: {
          status: "approved",
        },
      });
    }

    revalidatePath('/dashboard')
    revalidatePath('/dashboard/report')

    return apiResponse.single({ message: "Data approved successful", data });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
