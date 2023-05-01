import { useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CloseButton from "react-bootstrap/CloseButton";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import FilterableDropdown from "../components/FilterableDropdown";
import VisualizationTabs from "../components/VisualizationTabs";
import { StreamDataPropsWithAxisLegends } from "../components/Stream";
import { LineSvgPropsWithAxisLegends } from "../components/Line";
import { BarDataPropsWithAxisLegends } from "../components/Bar";
import "./Population.css";

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

export type PopulationContext = {
  selectedCountries: Country[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  activePopulationVisualization: string;
  setActivePopulationVisualization: React.Dispatch<
    React.SetStateAction<string>
  >;
  populationStreamProps: StreamDataPropsWithAxisLegends;
  setPopulationStreamProps: React.Dispatch<
    React.SetStateAction<StreamDataPropsWithAxisLegends>
  >;
  populationLineProps: LineSvgPropsWithAxisLegends;
  setPopulationLineProps: React.Dispatch<
    React.SetStateAction<LineSvgPropsWithAxisLegends>
  >;
  populationBarProps: BarDataPropsWithAxisLegends;
  setPopulationBarProps: React.Dispatch<
    React.SetStateAction<BarDataPropsWithAxisLegends>
  >;
};

export interface Country {
  code: string;
  name: string;
  emoji: string;
}

interface PopulationDatum {
  [count: string]: string | number;
}

function Population() {
  const {
    selectedCountries,
    setSelectedCountries,
    activePopulationVisualization: activeVisualization,
    setActivePopulationVisualization: setActiveVisualization,
    populationStreamProps: streamProps,
    setPopulationStreamProps: setStreamProps,
    populationLineProps: lineProps,
    setPopulationLineProps: setLineProps,
    populationBarProps: barProps,
    setPopulationBarProps: setBarProps,
  } = useOutletContext<PopulationContext>();
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    onCompleted: (data) => {
      if (selectedCountries.length == 0) {
        const countries: Country[] = data?.countries;
        if (countries && countries.length > 0) {
          const initialCountry =
            countries[Math.floor(Math.random() * countries.length)];
          handleCountrySelection(
            initialCountry.code,
            initialCountry.name + " " + initialCountry.emoji
          );
        }
      }
    },
  });
  const [getCountryPopulations, countryPopulationsQueryResult] = useLazyQuery(
    GET_COUNTRY_POPULATIONS
  );

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

  function removeCountry(country: Country) {
    setStreamProps((streamProps: StreamDataPropsWithAxisLegends) => {
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

    setLineProps((lineProps: LineSvgPropsWithAxisLegends) => {
      lineProps.data = lineProps.data.filter(
        (serie) => serie.id != country.name
      );
      return lineProps;
    });

    setBarProps((barProps: BarDataPropsWithAxisLegends) => {
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
    <div className="population">
      <Container>
        <Row>
          <FilterableDropdown
            variant="outline-primary"
            buttonTitle="Add a country"
            items={data?.countries.map((element: Country) => ({
              key: element.code,
              value: element.name + " " + element.emoji,
            }))}
            onItemSelection={handleCountrySelection}
          />
        </Row>
        <Row>
          <Stack direction="horizontal">
            {selectedCountries?.map((element) => (
              <Badge key={element.code} bg="secondary">
                <div className="country-badge-content">
                  {element.name + " " + element.emoji}
                  <CloseButton
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
        activeVisualization={activeVisualization}
        setActiveVisualization={setActiveVisualization}
        streamProps={streamProps}
        lineProps={lineProps}
        barProps={barProps}
      />
    </div>
  );
}

export default Population;
