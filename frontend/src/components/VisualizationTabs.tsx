import {
  TabContainer,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "react-bootstrap";
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
          <TabPane eventKey="line"></TabPane>
          <TabPane eventKey="bar"></TabPane>
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
