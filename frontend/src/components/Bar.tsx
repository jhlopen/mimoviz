import { ResponsiveBar, BarSvgProps, BarDatum } from "@nivo/bar";

export interface BarDataPropsWithAxisLegends
  extends Omit<BarSvgProps<BarDatum>, "height" | "width"> {
  bottomAxisLegend?: String;
  leftAxisLegend?: String;
}

export default function Bar({
  data,
  keys,
  indexBy,
  bottomAxisLegend,
  leftAxisLegend,
}: BarDataPropsWithAxisLegends) {
  return (
    data && (
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -65,
          legend: bottomAxisLegend,
          legendPosition: "middle",
          legendOffset: 42,
        }}
        axisLeft={{
          format: (value) => (value >= 1000 ? `${value / 1000}K` : value),
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -55,
          legend: leftAxisLegend,
          legendPosition: "middle",
          legendOffset: -55,
        }}
        labelSkipWidth={42}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
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
        ]}
      />
    )
  );
}
