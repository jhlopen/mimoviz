import { Tabs, Tab } from "react-bootstrap";
import PopulationPane from "./PopulationPane";
import VisualizationTabs from "./VisualizationTabs";

export default function DataTabs() {
  return (
    <Tabs id="data-tabs" defaultActiveKey="population-data-tab">
      <Tab eventKey="population-data-tab" title="Population">
        <PopulationPane />
      </Tab>
      <Tab eventKey="random-number-data-tab" title="Random Number">
        <VisualizationTabs
          streamProps={{
            data: [
              { a: 1, b: 1, c: 1 },
              { a: 1, b: 2, c: 3 },
              { a: 3, b: 2, c: 1 },
            ],
            keys: ["a", "b", "c"],
            bottomAxisLegend: "X",
            leftAxisLegend: "Y",
          }}
          lineProps={{
            data: [
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
            ],
            bottomAxisLegend: "X",
            leftAxisLegend: "Y",
          }}
          barProps={{
            data: [
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
            ],
            keys: ["a", "b", "c"],
            indexBy: "x",
            bottomAxisLegend: "X",
            leftAxisLegend: "Y",
          }}
        />
      </Tab>
    </Tabs>
  );
}
