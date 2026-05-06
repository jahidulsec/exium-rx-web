import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import { DoctorMulti } from "../../libs/doctor";
import CreateRxButton from "@/features/rx/components/mio/create-rx-button";
import { AuthUser } from "@/types/auth-user";

export default function DoctorCard({
    doctor,
    user,
}: {
    doctor: DoctorMulti;
    user: AuthUser;
}) {
    const { full_name, degrees, speciality, ...props } = doctor;
    return (
        <div className="bg-background overflow-hidden rounded-xl">
            <div className="flex items-start justify-between gap-6 p-4">
                <article>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-semibold">{full_name}</h3>
                        <p className="text-primary-foreground text-xs">
                            {degrees} / {speciality}
                        </p>
                    </div>
                </article>

                {/* actions */}
                <div className="flex flex-col items-end justify-between gap-1">
                    <p className="text-muted-foreground text-xs">Yesterday</p>
                    <CreateRxButton doctor={doctor} user={user} />
                </div>
            </div>
            <div className="bg-muted/50 p-3">
                <p>
                    Total Entries:{" "}
                    <strong className="text-secondary">
                        {props._count.doctor_rx}
                    </strong>
                </p>
            </div>
        </div>
    );
}
