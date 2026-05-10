"use client";

import React from "react";
import { getUserProfile, UserProfileSingleType } from "../libs/user";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { userProfileSchema, UserProfileType } from "../actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { FormButton } from "@/components/shared/button/button";
import { updateUserProfile } from "../actions/user";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { SectionLoader } from "@/components/shared/skeleton/section";

export default function ProfileForm({ userId }: { userId: string }) {
  const { data, isPending } = useFetch(async () => {
    const res = await getUserProfile(userId);

    return res as any;
  });

  const form = useForm<UserProfileType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      user_id: data?.user_id,
      full_name: data?.user_information?.full_name,
      email: data?.user_information?.email ?? undefined,
      mobile: data?.user_information?.mobile ?? undefined,
      designation: data?.user_information?.designation,
    },
  });

  const onSubmit = async (data: UserProfileType) => {
    const res = await updateUserProfile(data);

    toast[res.success ? "success" : "info"](res.message);
  };

  React.useEffect(() => {
    if (data) {
      form.reset({
        user_id: data?.user_id,
        full_name: data?.user_information?.full_name,
        email: data?.user_information?.email ?? undefined,
        mobile: data?.user_information?.mobile ?? undefined,
        designation: data?.user_information?.designation,
      });
    }
  }, [data, form]);

  if (isPending) return <SectionLoader />;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="full_name"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input {...field} placeholder="Your Name" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="designation"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Designation</FieldLabel>
              <Input {...field} placeholder="Designation" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input {...field} placeholder="eg. m@example.com" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="mobile"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Mobile</FieldLabel>
              <Input {...field} placeholder="eg. 01XXX XXX XXX" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FormButton isPending={form.formState.isSubmitting}>Save</FormButton>
      </FieldGroup>
    </form>
  );
}
