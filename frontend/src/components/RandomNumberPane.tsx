import { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import VisualizationTabs from "./VisualizationTabs";
import { StreamDataPropsWithAxisLegends } from "./Stream";
import { LineSvgPropsWithAxisLegends } from "./Line";
import { BarDataPropsWithAxisLegends } from "./Bar";

const GET_RANDOM_NUMBERS = gql`
  query RANDOM_NUMBERS($count: Int!) {
    randomNumbers(count: $count) {
      value
    }
  }
`;

export default function RandomNumberPane() {
  const initialQueryResult = useQuery(GET_RANDOM_NUMBERS, {
    variables: { fetchPolicy: "no-cache", count: 100 },
    onCompleted: (data) => handleQueryCompletion(data),
  });
  const [getRandomNumbers, { loading, error, data }] =
    useLazyQuery(GET_RANDOM_NUMBERS);
  const [streamProps, setStreamProps] =
    useState<StreamDataPropsWithAxisLegends>({
      data: [],
      keys: [],
      bottomAxisLegend: "Roll",
      leftAxisLegend: "Number",
    });
  const [lineProps, setLineProps] = useState<LineSvgPropsWithAxisLegends>({
    data: [],
    bottomAxisLegend: "Roll",
    leftAxisLegend: "Number",
  });
  const [barProps, setBarProps] = useState<BarDataPropsWithAxisLegends>({
    data: [],
    keys: [],
    indexBy: "index",
    bottomAxisLegend: "Roll",
    leftAxisLegend: "Number",
  });
  const [activeKey, setActiveKey] = useState<string>("stream");
  const [rollCount, setRollCount] = useState(0);

  if (loading || initialQueryResult.loading) {
    return <Spinner animation="border" variant="secondary" />;
  }

  if (error || initialQueryResult.error) {
    console.error(error);
    return <h2>Failed to load.</h2>;
  }

  function handleClick() {
    getRandomNumbers({
      variables: {
        fetchPolicy: "no-cache",
        count: Math.ceil(Math.random() * 100),
      },
      onCompleted: (data) => {
        handleQueryCompletion(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  function handleQueryCompletion(data: any) {
    const rollName = `#${rollCount}`;
    const randomNumbers: { value: number }[] = data?.randomNumbers;
    // Process data for stream chart
    streamProps.data = randomNumbers.map((element) => ({
      [rollName]: element.value,
    }));
    streamProps.keys = [rollName];

    // Process data for line chart
    lineProps.data.length = 0;
    lineProps.data.push({
      id: rollName,
      data: randomNumbers.map((element, index) => ({
        x: index,
        y: element.value,
      })),
    });

    // Process data for bar chart
    barProps.data = randomNumbers.map((element, index) => ({
      index: index,
      [rollName]: element.value,
    }));
    barProps.keys = [rollName];

    setRollCount(rollCount + 1);
  }

  return (
    <div>
      <Button
        variant="primary"
        onClick={handleClick}
        style={{ display: "flex", justifyContent: "left" }}
        className="mx-3 my-3"
      >
        Generate
      </Button>

      <VisualizationTabs
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        streamProps={streamProps}
        lineProps={lineProps}
        barProps={barProps}
      />
    </div>
  );
}
