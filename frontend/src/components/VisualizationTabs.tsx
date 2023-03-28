import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Stream, { StreamDataPropsWithAxisLegends } from "./Stream";
import Line, { LineSvgPropsWithAxisLegends } from "./Line";
import Bar, { BarDataPropsWithAxisLegends } from "./Bar";
import { ReactComponent as StreamChartIcon } from "../assets/trending-up.svg";
import { ReactComponent as LineChartIcon } from "../assets/activity.svg";
import { ReactComponent as BarChartIcon } from "../assets/bar-chart-2.svg";

interface VisualizationTabsProps {
  activeKey?: string;
  setActiveKey?: (activeKey: string) => void;
  streamProps: StreamDataPropsWithAxisLegends;
  lineProps: LineSvgPropsWithAxisLegends;
  barProps: BarDataPropsWithAxisLegends;
}

export default function VisualizationTabs({
  activeKey,
  setActiveKey,
  streamProps,
  lineProps,
  barProps,
}: VisualizationTabsProps) {
  return (
    <Tab.Container
      id="visualization-tabs"
      defaultActiveKey="stream"
      activeKey={activeKey}
    >
      <Row>
        <Tab.Content>
          <Tab.Pane
            id="stream-tab-pane"
            eventKey="stream"
            style={{ height: "500px" }}
          >
            <Stream {...streamProps} />
          </Tab.Pane>
          <Tab.Pane
            id="line-tab-pane"
            eventKey="line"
            style={{ height: "500px" }}
          >
            <Line {...lineProps} />
          </Tab.Pane>
          <Tab.Pane
            id="bar-tab-pane"
            eventKey="bar"
            style={{ height: "500px" }}
          >
            <Bar {...barProps} />
          </Tab.Pane>
        </Tab.Content>
      </Row>
      <Row>
        <Nav
          variant="pills"
          onSelect={(eventKey) => eventKey && setActiveKey?.(eventKey)}
        >
          <Nav.Item>
            <Nav.Link id="stream-nav-link" eventKey="stream">
              <StreamChartIcon /> Stream
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link id="line-nav-link" eventKey="line">
              <LineChartIcon /> Line
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link id="bar-nav-link" eventKey="bar">
              <BarChartIcon /> Bar
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
    </Tab.Container>
  );
}
