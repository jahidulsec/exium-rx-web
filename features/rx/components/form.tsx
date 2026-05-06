"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { doctorRxSchema, DoctorRxType } from "../actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { brand, doctor_rx } from "@/lib/generated/prisma";
import { createDoctorRx } from "../actions/rx";
import { FormButton } from "@/components/shared/button/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getBrands } from "@/features/brand/libs/brand";
import { Select } from "@/components/shared/select/select";
import useFetch from "@/hooks/use-fetch";

export default function RxForm({
    prevData,
    onSuccess,
    onError,
}: {
    prevData?: Partial<doctor_rx>;
    onSuccess?: (message?: string) => void;
    onError?: (message?: string) => void;
}) {
    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);

    const { data: brands } = useFetch(() => {
        return getBrands({ page: 1, size: 20 });
    });

    const form = useForm<DoctorRxType>({
        resolver: zodResolver(doctorRxSchema),
        defaultValues: {
            user_id: prevData?.user_id,
            doctor_id: prevData?.doctor_id,
            rx_date: prevDate,
        },
    });

    const onSubmit = async (data: DoctorRxType) => {
        const res = await createDoctorRx(data);

        if (res.success) {
            onSuccess?.(res.message);
        } else {
            onError?.(res.message);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name={"brand_id"}
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Brand</FieldLabel>
                            <Select
                                defaultValue={prevData?.brand_id?.toString()}
                                data={brands.map(item => ({
                                    label: item.name,
                                    value: item.id.toString(),
                                }))}
                                onValueChange={value => {
                                    field.onChange(Number(value));
                                }}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name={"quantity"}
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Quantity
                            </FieldLabel>
                            <Input
                                {...field}
                                type="number"
                                placeholder="Quantity"
                                onChange={e =>
                                    field.onChange(e.target.valueAsNumber)
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <FormButton isPending={form.formState.isSubmitting}>
                    Submit
                </FormButton>
            </FieldGroup>
        </form>
    );
}
