"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Upload } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { userImageSchema, UserImageType } from "../../actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { FormButton } from "@/components/shared/button/button";
import { uploadUserImage } from "../../actions/user-image";
import { toast } from "sonner";

export default function ImageSection({
  filePath,
  userFullName,
  userId,
}: {
  userId: string;
  filePath?: string;
  userFullName?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mx-auto my-6 relative">
      <Avatar className="size-20 p-2 bg-background">
        <AvatarImage src={"/images/user.png"} />
        <AvatarFallback>{userFullName?.charAt(0)}</AvatarFallback>
      </Avatar>

      <Button
        size={"icon-sm"}
        className="absolute -bottom-2 right-0"
        onClick={() => setOpen(true)}
      >
        <Upload />
        <span className="sr-only">Upload Image</span>
      </Button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Profile Picutre</DrawerTitle>
          </DrawerHeader>

          {/* form */}
          <div className="max-w-sm mx-auto w-full my-10">
            <ImageForm userId={userId} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

const ImageForm = ({ userId }: { userId: string }) => {
  const form = useForm<UserImageType>({
    resolver: zodResolver(userImageSchema),
    defaultValues: {
      user_id: userId,
    },
  });

  const onSubmit = async (data: UserImageType) => {
    const res = await uploadUserImage(data);

    toast[res.success ? "success" : "info"](res.message);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="image"
          render={({ field, fieldState }) => {
            const { value, ...rest } = field;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Upload</FieldLabel>
                <Input
                  type="file"
                  {...rest}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      field.onChange(file);
                    }
                  }}
                />
              </Field>
            );
          }}
        />

        <FormButton isPending={form.formState.isSubmitting}>Upload</FormButton>
      </FieldGroup>
    </form>
  );
};
