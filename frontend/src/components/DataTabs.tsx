import { Tabs, Tab } from "react-bootstrap";

export default function DataTabs() {
  return (
    <Tabs id="data-tabs" defaultActiveKey="population-data-tab">
      <Tab eventKey="population-data-tab" title="Population" />
      <Tab eventKey="random-number-data-tab" title="Random Number" />
    </Tabs>
  );
}
