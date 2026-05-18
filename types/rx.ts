import { Prisma } from "@/lib/generated/prisma";

export type DoctorRxMulti = Prisma.doctor_rxGetPayload<{
  include: {
    doctor: {
      select: {
        full_name: true;
        dr_child_id: true;
        dr_master_id: true;
      };
    };
    user: {
      select: {
        user_information: {
          select: {
            full_name: true;
            sap_area_code: true;
          };
        };
      };
    };
  };
}>;
