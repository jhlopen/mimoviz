import { ResponsiveLine, LineSvgProps } from "@nivo/line";

export interface LineSvgPropsWithAxisLegends extends LineSvgProps {
  bottomAxisLegend?: String;
  leftAxisLegend?: String;
  showLegend?: boolean;
  showAxisBottom?: boolean;
  showAxisLeft?: boolean;
}

export default function Line(props: LineSvgPropsWithAxisLegends) {
  const {
    data,
    bottomAxisLegend,
    leftAxisLegend,
    showLegend,
    showAxisBottom,
    showAxisLeft,
  } = props;
  return (
    data && (
      <ResponsiveLine
        data={data}
        margin={{
          top: 6,
          right: showLegend ? 160 : 6,
          bottom: showAxisBottom ? 50 : 8,
          left: showAxisLeft ? 60 : 12,
        }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
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
        enableGridX={showAxisBottom}
        enableGridY={showAxisLeft}
        pointSize={5}
        pointColor={{ from: "color" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={
          showLegend
            ? [
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 40,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
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
