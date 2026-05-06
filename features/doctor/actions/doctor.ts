"use server";

import { apiResponse } from "@/lib/response";
import { doctorsSchema, DoctorsType } from "./schema";
import { db } from "@/config/db";
import { revalidatePath } from "next/cache";

export const createDoctors = async (data: DoctorsType) => {
    try {
        const reshapedData = data.map(item => {
            const {
                SAPSMAreaCode,
                SAPAreaCode,
                SAPRegionCode,
                SAPZoneCode,
                CellPhone1,
                ...rest
            } = item;

            let mobile = CellPhone1?.replace("'", "")?.replace("+", "");

            mobile = mobile?.startsWith("1") ? "0" + mobile : mobile;

            return {
                ...rest,
                SAPSMAreaCode: SAPSMAreaCode.replace("'", ""),
                SAPAreaCode: SAPAreaCode.replace("'", ""),
                SAPRegionCode: SAPRegionCode.replace("'", ""),
                SAPZoneCode: SAPZoneCode.replace("'", ""),
                CellPhone1: CellPhone1 ? mobile : undefined,
            };
        });

        const validatedData = doctorsSchema.parse(reshapedData);

        // create or update doctors
        for (const item of validatedData) {
            await db.doctor.upsert({
                where: {
                    dr_child_id: item.DrChildID,
                },
                create: {
                    dr_sl: item.DrSL,
                    dr_child_id: item.DrChildID,
                    dr_master_id: item.DrMasterID,
                    pppp_id: item.PPPPID,
                    full_name: item.DoctorName,
                    gender_idx: item.Gender,
                    degrees: item.Degrees,
                    speciality: item.Speciality,
                    chamber: item.Chamber,
                    mobile: item.CellPhone1,
                    sap_area_code: item.SAPAreaCode,
                    sap_region_code: item.SAPRegionCode,
                    sap_sm_area_code: item.SAPSMAreaCode,
                    sap_zone_code: item.SAPZoneCode,
                    zone_name: item.ZoneName,
                    region_name: item.RegionName,
                    area_name: item.AreaName,
                    area_group: item.AreaGroup,
                    sm_area_name: item.SMAreaName,
                    dr_class: item.DrClass,
                    rxQty: item.RxQty,
                    emp: item.EMP,
                    exm: item.EXM,
                },
                update: {
                    dr_sl: item.DrSL,
                    dr_master_id: item.DrMasterID,
                    pppp_id: item.PPPPID,
                    full_name: item.DoctorName,
                    gender_idx: item.Gender,
                    degrees: item.Degrees,
                    speciality: item.Speciality,
                    chamber: item.Chamber,
                    mobile: item.CellPhone1,
                    sap_area_code: item.SAPAreaCode,
                    sap_region_code: item.SAPRegionCode,
                    sap_sm_area_code: item.SAPSMAreaCode,
                    sap_zone_code: item.SAPZoneCode,
                    zone_name: item.ZoneName,
                    region_name: item.RegionName,
                    area_name: item.AreaName,
                    area_group: item.AreaGroup,
                    sm_area_name: item.SMAreaName,
                    dr_class: item.DrClass,
                    rxQty: item.RxQty,
                    emp: item.EMP,
                    exm: item.EXM,
                },
            });
        }

        revalidatePath("/");
        revalidatePath("/dashboard");

        return apiResponse.single({
            message: "Doctors data uploads successfull",
            data: null,
        });
    } catch (error) {
        return apiResponse.error({ error });
    }
};
