"use server";

import fs2 from "fs/promises";
import { apiResponse } from "@/lib/response";
import { UserImageType } from "./schema";
import { db } from "@/config/db";
import { revalidatePath } from "next/cache";

export const uploadUserImage = async (data: UserImageType) => {
  try {
    const imageCount = await db.user_image.count({
      where: {
        file_name: data.image.name,
      },
    });

    const uniqueFileName =
      imageCount === 0 ? data.image.name : data.image.name + `(${imageCount})`;
    const filePath = `/users/${uniqueFileName}`;

    // save image in dir
    await fs2.mkdir("storage/users", { recursive: true });
    await fs2.writeFile(
      "storage" + filePath,
      Buffer.from(await data.image.arrayBuffer()),
    );

    const res = await db.user_image.upsert({
      where: {
        user_id: data.user_id,
      },
      create: {
        file_name: uniqueFileName,
        file_path: filePath,
        user_id: data.user_id,
      },
      update: {
        file_name: uniqueFileName,
        file_path: filePath,
      },
    });

    // revalidate cache
    revalidatePath("/profile");
    revalidatePath("/");
    revalidatePath("/dashboard");

    return apiResponse.single({
      data: res,
      message: "Profile picture is uploaded successfully",
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
