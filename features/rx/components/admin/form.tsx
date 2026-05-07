"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { doctorRxSchema, DoctorRxType } from "../../actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctor, doctor_rx } from "@/lib/generated/prisma";
import { createDoctorRx } from "../../actions/rx";
import { FormButton } from "@/components/shared/button/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Combobox from "@/components/shared/combobox/combobox";
import { getDoctors } from "@/features/doctor/libs/doctor";
import { AuthUser } from "@/types/auth-user";
import { getUsers, UserMultiProps } from "@/features/user/libs/user";
import { DatePicker } from "@/components/shared/date-picker/date-picker";

export default function RxForm({
  onSuccess,
  onError,
  authUser,
}: {
  onSuccess?: (message?: string) => void;
  onError?: (message?: string) => void;
  authUser: AuthUser;
}) {
  const prevDate = new Date();
  prevDate.setDate(prevDate.getDate() - 1);

  // const { data: brands } = useFetch(() => {
  //   return getBrands({ page: 1, size: 20 });
  // });

  const form = useForm<DoctorRxType>({
    resolver: zodResolver(doctorRxSchema),
    defaultValues: {
      rx_date: prevDate,
      updated_by: authUser.userId,
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
        {/* <Controller
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        /> */}

        <Controller
          name={"user_id"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>MIO</FieldLabel>
              <Combobox
                getKey={(item: UserMultiProps) => item.user_id}
                getLabel={(item: UserMultiProps) =>
                  `${item.user_information?.full_name} (${item.user_id})`
                }
                fetcher={getUsers as any}
                placeholder="Select"
                onValueChange={value => {
                  field.onChange(value);
                }}
                searchparams={{
                  sap_region_code:
                    authUser.role === "rm" ? authUser.userId : undefined,
                  size: 8,
                  role: "mio",
                }}
                // defaultValue={prevData?.doctor_id?.toString()}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={"doctor_id"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Doctor</FieldLabel>
              <Combobox
                getKey={(item: doctor) => item.id.toString()}
                getLabel={(item: doctor) => item.full_name}
                fetcher={getDoctors as any}
                placeholder="Select"
                onValueChange={value => {
                  field.onChange(value);
                }}
                searchparams={{
                  sapRegionCode:
                    authUser.role === "rm" ? authUser.areaCode : undefined,
                  size: 8,
                }}
                // defaultValue={prevData?.doctor_id?.toString()}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={"quantity"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Quantity</FieldLabel>
              <Input
                {...field}
                type="number"
                placeholder="Quantity"
                onChange={e => field.onChange(e.target.valueAsNumber)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={"rx_date"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Quantity</FieldLabel>
              <DatePicker onChange={value => field.onChange(value)} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <FormButton isPending={form.formState.isSubmitting}>Submit</FormButton>
      </FieldGroup>
    </form>
  );
}
