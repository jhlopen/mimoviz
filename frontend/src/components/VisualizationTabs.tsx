import {
  TabContainer,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "react-bootstrap";

export default function VisualizationTabs() {
  return (
    <TabContainer id="visualization-tabs" defaultActiveKey="stream">
      <Row>
        <TabContent>
          <TabPane eventKey="stream"></TabPane>
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
