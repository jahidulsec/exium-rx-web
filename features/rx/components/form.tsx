"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { doctorRxSchema, DoctorRxType } from "../actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctor_rx } from "@/lib/generated/prisma";
import { useQueryClient } from "@tanstack/react-query";
import { createDoctorRx } from "../actions/rx";
import { FormButton } from "@/components/shared/button/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function RxForm({
  prevData,
  onSuccess,
}: {
  prevData?: Partial<doctor_rx>;
  onSuccess?: () => void;
}) {
  const form = useForm<DoctorRxType>({
    resolver: zodResolver(doctorRxSchema),
    defaultValues: {
      user_id: prevData?.user_id,
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = async (data: DoctorRxType) => {
    const res = await createDoctorRx(data);

    if (res.success) {
      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });

      onSuccess?.();
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
              <FieldLabel htmlFor="form-rhf-demo-title">Bug Title</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Login button not working on mobile"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FormButton isPending={form.formState.isSubmitting}>Submit</FormButton>
    </form>
  );
}
