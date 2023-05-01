import { ResponsiveStream, StreamDataProps, StreamDatum } from "@nivo/stream";

export interface StreamDataPropsWithAxisLegends
  extends StreamDataProps<StreamDatum> {
  bottomAxisLegend?: String;
  leftAxisLegend?: String;
  showLegend?: boolean;
  showAxisBottom?: boolean;
  showAxisLeft?: boolean;
}

export default function Stream(props: StreamDataPropsWithAxisLegends) {
  const {
    data,
    keys,
    bottomAxisLegend,
    leftAxisLegend,
    showLegend,
    showAxisBottom,
    showAxisLeft,
  } = props;
  return (
    data && (
      <ResponsiveStream
        data={data}
        keys={keys}
        margin={{
          top: 0,
          right: showLegend ? 60 : 0,
          bottom: showAxisBottom ? 25 : 0,
          left: showAxisLeft ? 25 : 0,
        }}
        axisBottom={
          showAxisBottom
            ? {
                format: () => "",
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: bottomAxisLegend,
                legendPosition: "middle",
                legendOffset: 18,
              }
            : null
        }
        axisLeft={
          showAxisLeft
            ? {
                format: () => "",
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: leftAxisLegend,
                legendPosition: "middle",
                legendOffset: -18,
              }
            : null
        }
        enableGridX={false}
        enableGridY={false}
        offsetType="none"
        colors={{ scheme: "nivo" }}
        fillOpacity={0.85}
        borderColor={{ theme: "background" }}
        enableStackTooltip={false}
        legends={
          showLegend
            ? [
                {
                  anchor: "bottom-right",
                  direction: "column",
                  translateX: 100,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: "#999999",
                  symbolSize: 12,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000000",
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

export type { StreamDatum } from "@nivo/stream";
