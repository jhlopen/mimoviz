import { ResponsiveBar, BarSvgProps, BarDatum } from "@nivo/bar";

export interface BarDataPropsWithAxisLegends
  extends Omit<BarSvgProps<BarDatum>, "height" | "width"> {
  bottomAxisLegend?: String;
  leftAxisLegend?: String;
  showLegend?: boolean;
  showAxisBottom?: boolean;
  showAxisLeft?: boolean;
}

export default function Bar({
  data,
  keys,
  indexBy,
  bottomAxisLegend,
  leftAxisLegend,
  showLegend,
  showAxisBottom,
  showAxisLeft,
}: BarDataPropsWithAxisLegends) {
  return (
    data && (
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{
          top: 0,
          right: showLegend ? 168 : 0,
          bottom: showAxisBottom ? 50 : 8,
          left: showAxisLeft ? 60 : 0,
        }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisBottom={
          showAxisBottom
            ? {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -65,
                legend: bottomAxisLegend,
                legendPosition: "middle",
                legendOffset: 42,
              }
            : null
        }
        axisLeft={
          showAxisLeft
            ? {
                format: (value) => (value >= 1000 ? `${value / 1000}K` : value),
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -55,
                legend: leftAxisLegend,
                legendPosition: "middle",
                legendOffset: -55,
              }
            : null
        }
        enableGridY={showAxisLeft}
        labelSkipWidth={42}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={
          showLegend
            ? [
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 46,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
            : []
        }
      />
    )
  );
}
