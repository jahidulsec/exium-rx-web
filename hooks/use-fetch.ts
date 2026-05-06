"use client";

import React from "react";

export default function useFetch<T>(
    action: () => Promise<{
        success: boolean;
        message?: string;
        data: T[] | null;
        count: number;
    }>,
) {
    const [data, setData] = React.useState<T[]>([]);
    const [isPending, startTransition] = React.useTransition();

    React.useEffect(() => {
        const handleData = async () => {
            const res = await action();
            if (res.success) {
                setData(res.data ?? []);
            }
        };

        if (data.length === 0) {
            startTransition(() => {
                handleData();
            });
        }
    }, []);
    return { isPending, data };
}
