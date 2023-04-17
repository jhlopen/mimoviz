import { useOutletContext } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import VisualizationTabs from "../components/VisualizationTabs";
import { StreamDataPropsWithAxisLegends } from "../components/Stream";
import { LineSvgPropsWithAxisLegends } from "../components/Line";
import { BarDataPropsWithAxisLegends } from "../components/Bar";
import "./RandomNumber.css";

const GET_RANDOM_NUMBERS = gql`
  query RANDOM_NUMBERS($count: Int!) {
    randomNumbers(count: $count) {
      value
    }
  }
`;

export type RandomNumberContext = {
  rollCount: number;
  setRollCount: React.Dispatch<React.SetStateAction<number>>;
  activeRandomNumberVisualization: string;
  setActiveRandomNumberVisualization: React.Dispatch<
    React.SetStateAction<string>
  >;
  randomNumberStreamProps: StreamDataPropsWithAxisLegends;
  setRandomNumberStreamProps: React.Dispatch<
    React.SetStateAction<StreamDataPropsWithAxisLegends>
  >;
  randomNumberLineProps: LineSvgPropsWithAxisLegends;
  setRandomNumberLineProps: React.Dispatch<
    React.SetStateAction<LineSvgPropsWithAxisLegends>
  >;
  randomNumberBarProps: BarDataPropsWithAxisLegends;
  setRandomNumberBarProps: React.Dispatch<
    React.SetStateAction<BarDataPropsWithAxisLegends>
  >;
};

function RandomNumber() {
  const {
    rollCount,
    setRollCount,
    activeRandomNumberVisualization: activeVisualization,
    setActiveRandomNumberVisualization: setActiveVisualization,
    randomNumberStreamProps: streamProps,
    setRandomNumberStreamProps: setStreamProps,
    randomNumberLineProps: lineProps,
    setRandomNumberLineProps: setLineProps,
    randomNumberBarProps: barProps,
    setRandomNumberBarProps: setBarProps,
  } = useOutletContext<RandomNumberContext>();
  const initialQueryResult = useQuery(GET_RANDOM_NUMBERS, {
    variables: { fetchPolicy: "no-cache", count: 100 },
    onCompleted: (data) => handleQueryCompletion(data),
  });
  const [getRandomNumbers, { loading, error, data }] =
    useLazyQuery(GET_RANDOM_NUMBERS);

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
    <div className="random-number">
      <Button
        variant="primary"
        onClick={handleClick}
        style={{ display: "flex", justifyContent: "left" }}
        className="generate"
      >
        Generate
      </Button>

      <VisualizationTabs
        activeKey={activeVisualization}
        setActiveKey={setActiveVisualization}
        streamProps={streamProps}
        lineProps={lineProps}
        barProps={barProps}
      />
    </div>
  );
}

export default RandomNumber;
