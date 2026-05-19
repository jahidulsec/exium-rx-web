"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { RxQuantityStatsMultiProps } from "../libs/chart";
import { format } from "date-fns";
import { formatDateDB } from "@/utils/formatter";

export const description = "An interactive line chart";

const chartConfig = {
  views: {
    label: "Rx Qty.(s)",
  },
  total_quantity: {
    label: "Quantity",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function RxMonthlyLineChart({
  data,
}: {
  data: RxQuantityStatsMultiProps[];
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("total_quantity");

  const total = React.useMemo(
    () => ({
      total_quantity: data.reduce((acc, curr) => acc + curr.total_quantity, 0),
    }),
    [data],
  );

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const chartData = Array.from({ length: 30 }).map((item, index) => {
    const dateValue = new Date(startDate);
    dateValue.setDate(dateValue.getDate() + index);

    const a = data.find(
      value => formatDateDB(new Date(value.date)) === formatDateDB(dateValue),
    );

    return {
      date: formatDateDB(dateValue),
      total_quantity: a?.total_quantity ?? 0,
    };
  });

  return (
    <Card className="bg-muted/35 py-4 shadow-sm sm:py-0">
      <CardHeader className="bg-background/75 flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Line Chart - RX Quantity</CardTitle>
          <CardDescription>
            Showing total quantities for the last 30 days
          </CardDescription>
        </div>
        <div className="flex">
          {["total_quantity"].map(key => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart]?.label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {chartData.length === 0 ? (
          <p className="text-center">No data.</p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={value => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={value => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
