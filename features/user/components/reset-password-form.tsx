import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "../actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { PasswordInput } from "@/components/shared/inputs/password";
import { FormButton } from "@/components/shared/button/button";
import { updateUserPassword } from "../actions/user";
import { toast } from "sonner";

export default function ResetPasswordForm({ userId }: { userId: string }) {
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      user_id: userId,
    },
  });

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    const res = await updateUserPassword(data);

    toast[res.success ? "success" : "error"](res.message);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <PasswordInput
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="PASSWORD"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FormButton isPending={form.formState.isSubmitting}>Submit</FormButton>
      </FieldGroup>
    </form>
  );
}
