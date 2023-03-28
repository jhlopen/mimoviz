import { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CloseButton from "react-bootstrap/CloseButton";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import FilterableDropdown from "./FilterableDropdown";
import VisualizationTabs from "./VisualizationTabs";
import { StreamDataPropsWithAxisLegends, StreamDatum } from "./Stream";
import { LineSvgPropsWithAxisLegends } from "./Line";
import { BarDataPropsWithAxisLegends } from "./Bar";

const GET_COUNTRIES = gql`
  query COUNTRIES {
    countries {
      code
      name
      emoji
    }
  }
`;

const GET_COUNTRY_POPULATIONS = gql`
  query COUNTRY_POPULATIONS($code: String!) {
    country(code: $code) {
      name
      populations {
        year
        count
      }
    }
  }
`;

interface CountryBase {
  code: string;
  name: string;
  emoji: string;
}

interface PopulationDatum {
  [count: string]: string | number;
}

export default function PopulationPane() {
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    onCompleted: (data) => {
      const countries: CountryBase[] = data?.countries;
      if (countries && countries.length > 0) {
        handleCountrySelection(
          countries[0].code,
          countries[0].name + " " + countries[0].emoji
        );
      }
    },
  });
  const [getCountryPopulations, countryPopulationsQueryResult] = useLazyQuery(
    GET_COUNTRY_POPULATIONS
  );
  const [selectedCountries, setSelectedCountries] = useState<CountryBase[]>([]);
  const [streamProps, setStreamProps] =
    useState<StreamDataPropsWithAxisLegends>({
      data: [],
      keys: [],
      bottomAxisLegend: "Year",
      leftAxisLegend: "Population",
    });
  const [lineProps, setLineProps] = useState<LineSvgPropsWithAxisLegends>({
    data: [],
    bottomAxisLegend: "Year",
    leftAxisLegend: "Population",
  });
  const [barProps, setBarProps] = useState<BarDataPropsWithAxisLegends>({
    data: [],
    keys: [],
    indexBy: "year",
    bottomAxisLegend: "Year",
    leftAxisLegend: "Population",
  });
  const [activeKey, setActiveKey] = useState<string>("stream");

  if (loading || countryPopulationsQueryResult.loading) {
    return <Spinner animation="border" variant="secondary" />;
  }

  if (error) {
    console.error(error);
    return <h2>Failed to load.</h2>;
  }

  function handleCountrySelection(key: string, value: string) {
    if (!streamProps.keys.includes(key)) {
      const countryName = value.slice(0, -5);
      setSelectedCountries((selectedCountries) => [
        ...selectedCountries,
        { code: key, name: countryName, emoji: value.slice(-4) },
      ]);
      getCountryPopulations({
        variables: { code: key },
        onCompleted: (data) => {
          const populations: PopulationDatum[] = data?.country?.populations;
          // Process data for stream chart
          if (streamProps.data.length > 0) {
            for (let index = 0; index < streamProps.data.length; index++) {
              streamProps.data[index][key] = populations[index].count;
            }
          } else {
            streamProps.data = populations.map((element) => ({
              [key]: element.count,
            }));
          }

          // Process data for line chart
          lineProps.data.push({
            id: data?.country?.name,
            data: populations.map((element) => ({
              x: element.year,
              y: element.count,
            })),
          });

          // Process data for bar chart
          if (barProps.data.length > 0) {
            for (let index = 0; index < barProps.data.length; index++) {
              barProps.data[index][countryName] = populations[index].count;
            }
          } else {
            barProps.data = populations.map((element) => ({
              year: element.year,
              [countryName]: element.count,
            }));
          }

          barProps.keys?.push(countryName);
          streamProps.keys.push(key);
        },
        onError: (error) => console.log(error),
      });
    }
  }

  function removeCountry(country: CountryBase) {
    setStreamProps((streamProps) => {
      streamProps.keys = streamProps.keys.filter(
        (streamKey) => streamKey != country.code
      );
      if (streamProps.keys.length) {
        streamProps.data.forEach((element) => delete element[country.code]);
      } else {
        streamProps.data = [];
      }
      return streamProps;
    });

    setLineProps((lineProps) => {
      lineProps.data = lineProps.data.filter(
        (serie) => serie.id != country.name
      );
      return lineProps;
    });

    setBarProps((barProps) => {
      barProps.keys = barProps.keys?.filter(
        (streamKey) => streamKey != country.name
      );
      if (barProps.keys?.length) {
        barProps.data.forEach((element) => delete element[country.name]);
      } else {
        barProps.data = [];
      }
      return barProps;
    });

    setSelectedCountries((selectedCountries) =>
      selectedCountries.filter((selectedCountry) => selectedCountry != country)
    );
  }

  return (
    <div>
      <Container>
        <Row className="pt-3">
          <Col style={{ display: "flex", justifyContent: "left" }}>
            <FilterableDropdown
              buttonTitle="Add a country"
              items={data?.countries.map((element: CountryBase) => ({
                key: element.code,
                value: element.name + " " + element.emoji,
              }))}
              onItemSelection={handleCountrySelection}
            />
          </Col>
        </Row>
        <Row className="pt-3">
          <Stack
            direction="horizontal"
            gap={2}
            style={{
              display: "flex",
              justifyContent: "left",
              flexFlow: "row wrap",
            }}
          >
            {selectedCountries?.map((element) => (
              <Badge key={element.code} bg="secondary">
                <div>
                  {element.name + " " + element.emoji}
                  <CloseButton
                    className="ms-1"
                    variant="white"
                    onClick={() => removeCountry(element)}
                  />
                </div>
              </Badge>
            ))}
          </Stack>
        </Row>
      </Container>
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
