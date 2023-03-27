import { Tabs, Tab } from "react-bootstrap";
import PopulationPane from "./PopulationPane";
import RandomNumberPane from "./RandomNumberPane";

export default function DataTabs() {
  return (
    <Tabs id="data-tabs" defaultActiveKey="population-data-tab">
      <Tab eventKey="population-data-tab" title="Population">
        <PopulationPane />
      </Tab>
      <Tab eventKey="random-number-data-tab" title="Random Number">
        <RandomNumberPane />
      </Tab>
    </Tabs>
  );
}
