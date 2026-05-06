"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import React from "react";

export default function NavUser() {
    return (
        <div>
            <Button>
                <User /> <span className="sr-only">Profile</span>
                <div className=""></div>
            </Button>
        </div>
    );
}
