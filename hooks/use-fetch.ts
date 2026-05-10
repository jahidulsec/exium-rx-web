"use client";

import React from "react";

export default function useFetch<T>(
  action: () => Promise<{
    success: boolean;
    message?: string;
    data: unknown;
    count?: number;
  }>,
) {
  const [data, setData] = React.useState<any>();
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    const handleData = async () => {
      const res = await action();
      if (res.success) {
        setData(res.data as any);
      }
    };

    startTransition(() => {
      handleData();
    });
  }, []);
  return { isPending, data };
}
