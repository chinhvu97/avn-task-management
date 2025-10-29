import * as React from "react";
import * as RechartsPrimitive from "recharts";

// Simplified chart component for AI-HQ Task Assignment
// Uses recharts for visualizations

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    color?: string;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}

function ChartContainer({
  id,
  className = "",
  children,
  config,
  ...props
}: ChartContainerProps) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={`flex justify-center text-xs ${className}`}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => `  --color-${key}: ${itemConfig.color};`).join("\n")}
}
`,
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

interface ChartTooltipContentProps extends React.ComponentProps<typeof RechartsPrimitive.Tooltip> {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  labelFormatter?: (value: any, payload: any) => React.ReactNode;
}

function ChartTooltipContent({
  active,
  payload,
  className = "",
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
}: ChartTooltipContentProps) {
  const { config } = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-xl px-3 py-2 text-xs ${className}`}
    >
      {!hideLabel && label && (
        <div className="font-medium text-gray-900 mb-1">
          {labelFormatter ? labelFormatter(label, payload) : label}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((item: any, index: number) => {
          const itemConfig = config[item.dataKey as string] || {};
          const indicatorColor = item.color;

          return (
            <div key={`item-${index}`} className="flex items-center gap-2">
              {!hideIndicator && (
                <div
                  className={`w-2 h-2 rounded-full shrink-0`}
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <div className="flex flex-1 justify-between items-center gap-4">
                <span className="text-gray-600">
                  {itemConfig.label || item.name}
                </span>
                <span className="font-mono font-medium text-gray-900">
                  {typeof item.value === "number"
                    ? item.value.toLocaleString()
                    : item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

interface ChartLegendContentProps extends React.ComponentProps<"div"> {
  payload?: Array<{ value: string; color: string; dataKey: string }>;
  hideIcon?: boolean;
  verticalAlign?: "top" | "bottom";
}

function ChartLegendContent({
  className = "",
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
}: ChartLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-center gap-4 ${
        verticalAlign === "top" ? "pb-3" : "pt-3"
      } ${className}`}
    >
      {payload.map((item) => {
        const itemConfig = config[item.dataKey] || {};

        return (
          <div key={item.value} className="flex items-center gap-1.5">
            {!hideIcon && (
              <div
                className="h-2 w-2 shrink-0 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className="text-xs text-gray-600">
              {itemConfig.label || item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
