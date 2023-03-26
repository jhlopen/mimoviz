import {
  TabContainer,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "react-bootstrap";
import Bar from "./Bar";
import Line from "./Line";
import Stream from "./Stream";

export default function VisualizationTabs() {
  return (
    <TabContainer id="visualization-tabs" defaultActiveKey="stream">
      <Row>
        <TabContent>
          <TabPane eventKey="stream" style={{ height: "500px" }}>
            <Stream
              data={[
                { a: 1, b: 1, c: 1 },
                { a: 1, b: 2, c: 3 },
                { a: 3, b: 2, c: 1 },
              ]}
              keys={["a", "b", "c"]}
              bottomAxisLegend="X"
              leftAxisLegend="Y"
            />
          </TabPane>
          <TabPane eventKey="line" style={{ height: "500px" }}>
            <Line
              data={[
                {
                  id: "a",
                  data: [
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 2, y: 3 },
                  ],
                },
                {
                  id: "b",
                  data: [
                    { x: 0, y: 1 },
                    { x: 1, y: 2 },
                    { x: 2, y: 2 },
                  ],
                },
                {
                  id: "c",
                  data: [
                    { x: 0, y: 1 },
                    { x: 1, y: 3 },
                    { x: 2, y: 1 },
                  ],
                },
              ]}
              bottomAxisLegend="X"
              leftAxisLegend="Y"
            />
          </TabPane>
          <TabPane eventKey="bar" style={{ height: "500px" }}>
            <Bar
              data={[
                {
                  x: 0,
                  a: 1,
                  b: 1,
                  c: 3,
                },
                {
                  x: 1,
                  a: 1,
                  b: 2,
                  c: 2,
                },
                {
                  x: 2,
                  a: 1,
                  b: 3,
                  c: 1,
                },
              ]}
              keys={["a", "b", "c"]}
              indexBy="x"
              bottomAxisLegend="X"
              leftAxisLegend="Y"
            />
          </TabPane>
        </TabContent>
      </Row>
      <Row>
        <Nav variant="pills">
          <NavItem>
            <NavLink eventKey="stream">Stream</NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="line">Line</NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="bar">Bar</NavLink>
          </NavItem>
        </Nav>
      </Row>
    </TabContainer>
  );
}
