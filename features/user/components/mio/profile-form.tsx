"use client";

import React from "react";
import { UserProfileSingleType } from "../../libs/user";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { userProfileSchema, UserProfileType } from "../../actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { FormButton } from "@/components/shared/button/button";
import { updateUserProfile } from "../../actions/user";
import { toast } from "sonner";

export default function ProfileForm({
    profile,
}: {
    profile: UserProfileSingleType;
}) {
    const form = useForm<UserProfileType>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
            user_id: profile.user_id,
            full_name: profile.user_information?.full_name,
            email: profile.user_information?.email ?? undefined,
            mobile: profile.user_information?.mobile ?? undefined,
            designation: profile.user_information?.designation,
        },
    });

    const onSubmit = async (data: UserProfileType) => {
        const res = await updateUserProfile(data);

        toast[res.success ? "success" : "info"](res.message);
    };

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
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
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
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
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
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
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
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <FormButton isPending={form.formState.isSubmitting}>
                    Save
                </FormButton>
            </FieldGroup>
        </form>
    );
}
