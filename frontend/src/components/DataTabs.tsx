import { Tabs, Tab } from "react-bootstrap";
import VisualizationTabs from "./VisualizationTabs";

export default function DataTabs() {
  return (
    <Tabs id="data-tabs" defaultActiveKey="population-data-tab">
      <Tab eventKey="population-data-tab" title="Population">
        <VisualizationTabs />
      </Tab>
      <Tab eventKey="random-number-data-tab" title="Random Number">
        <VisualizationTabs />
      </Tab>
    </Tabs>
  );
}
