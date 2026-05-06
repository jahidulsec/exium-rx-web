"use server";

import { db } from "@/config/db";
import { Prisma } from "@/lib/generated/prisma";
import { apiResponse } from "@/lib/response";
import { doctorRxQuerySchema, DoctorRxQuerySchemaType } from "../actions/schema";

export type DoctorRxMulti = Prisma.doctor_rxGetPayload<{
    include: {
        doctor: {
            select: {
                full_name: true,
            }
        },
        user: {
            select: {
                user_information: {
                    select: {
                        full_name: true,
                        sap_area_code: true
                    }
                }
            }
        }
    },
}>

export const getDoctorRxs = async (query: DoctorRxQuerySchemaType) => {
    try {
        const { search, ...validatedQuery } = doctorRxQuerySchema.parse(query);

        const filter: Prisma.doctor_rxWhereInput = {
            ...(search && {
                OR: [
                    {
                        doctor: {
                            full_name: {
                                contains: search
                            }
                        }
                    },
                    {
                        doctor: {
                            dr_child_id: {
                                contains: search
                            }
                        }
                    },
                    {
                        doctor: {
                            dr_master_id: {
                                contains: search
                            }
                        }
                    }
                ]
            }),
            ...(validatedQuery.sap_area_code && {
                doctor: {
                    sap_area_code: validatedQuery.sap_area_code
                }
            }),
            ...(validatedQuery.sap_region_code && {
                doctor: {
                    sap_region_code: validatedQuery.sap_region_code
                }
            }),
            ...(validatedQuery.sap_sm_area_code && {
                doctor: {
                    sap_sm_area_code: validatedQuery.sap_sm_area_code
                }
            }),
            ...(validatedQuery.sap_zone_code && {
                doctor: {
                    sap_zone_code: validatedQuery.sap_zone_code
                }
            }),
            ...(validatedQuery.status && {
                status: validatedQuery.status
            }),
        };

        const [data, count] = await Promise.all([
            db.doctor_rx.findMany({
                where: filter,
                include: {
                    doctor: {
                        select: {
                            full_name: true,
                        }
                    },
                    user: {
                        select: {
                            user_information: {
                                select: {
                                    full_name: true,
                                    sap_area_code: true
                                }
                            }
                        }
                    }
                },
                take: validatedQuery.size,
                skip: (validatedQuery.page - 1) * validatedQuery.size,
                orderBy: [
                    {
                        doctor: {
                            full_name: 'asc'
                        }
                    }, { created_at: 'desc' }
                ]
            }),
            db.doctor_rx.count({
                where: filter
            }),
        ])

        return apiResponse.multi({
            data, count
        })
    } catch (error) {
        return apiResponse.error({ error })
    }
}