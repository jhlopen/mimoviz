import { ResponsiveLine, LineSvgProps } from "@nivo/line";

export interface LineSvgPropsWithAxisLegends extends LineSvgProps {
  bottomAxisLegend?: String;
  leftAxisLegend?: String;
}

export default function Line(props: LineSvgPropsWithAxisLegends) {
  const { data, bottomAxisLegend, leftAxisLegend } = props;
  return (
    data && (
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
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
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
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
        ]}
      />
    )
  );
}
