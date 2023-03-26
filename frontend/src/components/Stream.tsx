import { ResponsiveStream, StreamDataProps, StreamDatum } from "@nivo/stream";

interface StreamDataPropsWithAxisLegends extends StreamDataProps<StreamDatum> {
  bottomAxisLegend?: String;
  leftAxisLegend?: String;
}

export default function Stream({
  data,
  keys,
  bottomAxisLegend,
  leftAxisLegend,
}: StreamDataPropsWithAxisLegends) {
  return (
    <ResponsiveStream
      data={data}
      keys={keys}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: bottomAxisLegend,
        legendPosition: "middle",
        legendOffset: 36,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: leftAxisLegend,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableGridX={false}
      enableGridY={false}
      offsetType="none"
      colors={{ scheme: "nivo" }}
      fillOpacity={0.85}
      borderColor={{ theme: "background" }}
      enableStackTooltip={false}
      legends={[
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
      ]}
    />
  );
}
