"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import React from "react";

export default function NavUser() {
    return (
        <div>
            <Button
                variant={"outline"}
                className="border-primary"
                size={"icon-lg"}
            >
                <User /> <span className="sr-only">Profile</span>
            </Button>
        </div>
    );
}
