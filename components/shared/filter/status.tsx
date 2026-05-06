"use client";

import React from "react";
import { Select } from "../select/select";

function SelectStatus() {
  const data = [
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Approved",
      value: "approved",
    },
    {
      label: "Disapproved",
      value: "disapproved",
    },
  ];

  return <Select placeholder="Select Status" data={data} paramsName="status" />;
}

export { SelectStatus };
