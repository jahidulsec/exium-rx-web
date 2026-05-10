"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userLogout } from "@/features/auth/actions/login";
import { User } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { FormSheet } from "../sheet/sheet";
import ResetPasswordForm from "@/features/user/components/reset-password-form";
import { AuthUser } from "@/types/auth-user";
import ProfileForm from "@/features/user/components/profile-form";

export default function NavUser({ user }: { user: AuthUser }) {
  const [resetPassword, setResetPassword] = React.useState(false);
  const [profile, setProfile] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            className="border-primary"
            size={"icon-lg"}
          >
            <User /> <span className="sr-only">Profile</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                setProfile(true);
              }}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setResetPassword(true);
              }}
            >
              Reset Password
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() =>
              toast.promise(userLogout, {
                loading: "Logging out...",
                success: data => {
                  if (!data.success) throw data;
                  return data.message;
                },
                error: data => data.message,
              })
            }
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* reset password form */}
      <FormSheet
        open={resetPassword}
        onOpenChange={setResetPassword}
        formTitle="Reset Password"
      >
        <ResetPasswordForm userId={user.userId} />
      </FormSheet>

      {/* profile form */}
      <FormSheet
        open={profile}
        onOpenChange={setProfile}
        formTitle="Update Profile"
      >
        <ProfileForm userId={user.userId} />
      </FormSheet>
    </>
  );
}
