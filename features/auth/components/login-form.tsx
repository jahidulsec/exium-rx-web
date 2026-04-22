"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "@bprogress/next";
import { LoginSchema, LoginType } from "../actions/schema";
import { userLogin } from "../actions/login";
import { toast } from "sonner";
import { PasswordInput } from "@/components/shared/inputs/password";
import { Asterisk } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      sap_id: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: LoginType) {
    const res = await userLogin(data);
    toast[res.success ? "success" : "error"](res.message);

    if (res.success) {
      router.replace("/dashboard");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex items-center justify-center rounded-md">
                <Image
                  width={120}
                  height={100}
                  src={"/logos/Exium-Mups-1.svg"}
                  alt="Exium Logo"
                />
              </div>
              <span className="sr-only">Exium Rx Generation</span>
            </a>
            <h1 className="text-xl font-bold">
              Welcome to Exium Rx Generation
            </h1>
            <FieldDescription>
              Please login with your SAP ID and password
            </FieldDescription>
          </div>
          <FieldGroup>
            <Controller
              control={form.control}
              name="sap_id"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    SAP ID{" "}
                    <Asterisk size={10} className="text-destructive" />
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="SAP ID"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Password <Asterisk size={10} className="text-destructive" />
                  </FieldLabel>
                  <PasswordInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="PASSWORD"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Field>
            <Button type="submit">Login</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
