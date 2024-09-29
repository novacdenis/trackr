"use client";

import { useMemo } from "react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { Grid } from "@visx/grid";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { Text } from "@visx/text";
import { cn } from "@/utils/cn";

const margin = { top: 20, right: 20, bottom: 28, left: 44 };

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

interface Data {
  timestamp: number;
  amount: number;
}

interface Props {
  width: number;
  height: number;
  data: Data[];
}

const Content = ({ width, height, data }: Props) => {
  const innerWidth = Math.max(width - margin.left - margin.right, 0);
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0);

  const xScale = useMemo(() => {
    const min = Math.min(...data.map((d) => d.timestamp));
    const max = Math.max(...data.map((d) => d.timestamp));

    return scaleTime<number>({
      domain: [min, max],
      nice: true,
    });
  }, [data]);

  const yScale = useMemo(() => {
    const min = Math.min(...data.map((d) => d.amount));
    const max = Math.max(...data.map((d) => d.amount));

    return scaleLinear<number>({
      domain: [min, max],
      nice: true,
    });
  }, [data]);

  yScale.range([innerHeight, 0]);
  xScale.range([0, innerWidth]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Group top={margin.top} left={margin.left}>
        <Group className="paths">
          <LinePath
            data={data}
            curve={curveMonotoneX}
            x={(d) => xScale(d.timestamp)}
            y={(d) => yScale(d.amount)}
            stroke="red"
          />
        </Group>

        <Group className="grid">
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={innerWidth}
            height={innerHeight}
            stroke="rgba(0, 0, 0, 0.1)"
            strokeDasharray="2"
          />
        </Group>

        <Group className="axes">
          <AxisLeft
            scale={yScale}
            numTicks={4}
            tickFormat={(value) => amountFormatter.format(value.valueOf())}
            tickComponent={({ formattedValue, ...rest }) => (
              <Text {...rest} className={cn("font-sans text-xs font-medium md:text-sm", rest.className)}>
                {formattedValue}
              </Text>
            )}
          />
          <AxisBottom
            scale={xScale}
            top={innerHeight}
            numTicks={4}
            tickFormat={(value) => dateFormatter.format(value.valueOf())}
            tickComponent={({ formattedValue, ...rest }) => (
              <Text {...rest} className={cn("font-sans text-xs font-medium md:text-sm", rest.className)}>
                {formattedValue}
              </Text>
            )}
          />
        </Group>
      </Group>
    </svg>
  );
};

const Chart = ({ data }: Omit<Props, "width" | "height">) => (
  <ParentSize debounceTime={10}>
    {({ width, height }) => <Content width={width} height={height} data={data} />}
  </ParentSize>
);

export default Chart;
