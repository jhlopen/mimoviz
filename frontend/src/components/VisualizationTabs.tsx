import { useMediaQuery } from "react-responsive";
import Stream, { StreamDataPropsWithAxisLegends } from "./Stream";
import Line, { LineSvgPropsWithAxisLegends } from "./Line";
import Bar, { BarDataPropsWithAxisLegends } from "./Bar";
import { ReactComponent as StreamChartIcon } from "../assets/trending-up.svg";
import { ReactComponent as LineChartIcon } from "../assets/activity.svg";
import { ReactComponent as BarChartIcon } from "../assets/bar-chart-2.svg";
import "./VisualizationTabs.css";

interface VisualizationTabsProps {
  activeVisualization?: string;
  setActiveVisualization?: (activeVisualization: string) => void;
  streamProps: StreamDataPropsWithAxisLegends;
  lineProps: LineSvgPropsWithAxisLegends;
  barProps: BarDataPropsWithAxisLegends;
}

export default function VisualizationTabs({
  activeVisualization,
  setActiveVisualization,
  streamProps,
  lineProps,
  barProps,
}: VisualizationTabsProps) {
  const showLegend = useMediaQuery({ minWidth: 1200 });
  const showAxisBottom = useMediaQuery({ minWidth: 930 });
  const showAxisLeft = useMediaQuery({ minHeight: 500 });
  return (
    <>
      <div className="visualization-tab-content">
        {activeVisualization === "stream" ? (
          <Stream
            showLegend={showLegend}
            showAxisBottom={showAxisBottom}
            showAxisLeft={showAxisLeft}
            {...streamProps}
          />
        ) : activeVisualization === "line" ? (
          <Line
            showLegend={showLegend}
            showAxisBottom={showAxisBottom}
            showAxisLeft={showAxisLeft}
            {...lineProps}
          />
        ) : (
          activeVisualization === "bar" && (
            <Bar
              showLegend={showLegend}
              showAxisBottom={showAxisBottom}
              showAxisLeft={showAxisLeft}
              {...barProps}
            />
          )
        )}
      </div>
      <div className="visualization-tab-item">
        <button
          className={activeVisualization === "stream" ? "active" : ""}
          onClick={() => setActiveVisualization?.("stream")}
        >
          <StreamChartIcon />
          Stream
        </button>
        <button
          className={activeVisualization === "line" ? "active" : ""}
          onClick={() => setActiveVisualization?.("line")}
        >
          <LineChartIcon />
          Line
        </button>
        <button
          className={activeVisualization === "bar" ? "active" : ""}
          onClick={() => setActiveVisualization?.("bar")}
        >
          <BarChartIcon />
          Bar
        </button>
      </div>
    </>
  );
}
