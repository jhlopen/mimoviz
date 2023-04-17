import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import { StreamDataPropsWithAxisLegends } from "./components/Stream";
import { LineSvgPropsWithAxisLegends } from "./components/Line";
import { BarDataPropsWithAxisLegends } from "./components/Bar";
import { Country } from "./pages/Population";
import "./AppLayout.css";

function AppLayout() {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [activePopulationVisualization, setActivePopulationVisualization] =
    useState<string>("stream");
  const [populationStreamProps, setPopulationStreamProps] =
    useState<StreamDataPropsWithAxisLegends>({
      data: [],
      keys: [],
      bottomAxisLegend: "Year",
      leftAxisLegend: "Population",
    });
  const [populationLineProps, setPopulationLineProps] =
    useState<LineSvgPropsWithAxisLegends>({
      data: [],
      bottomAxisLegend: "Year",
      leftAxisLegend: "Population",
    });
  const [populationBarProps, setPopulationBarProps] =
    useState<BarDataPropsWithAxisLegends>({
      data: [],
      keys: [],
      indexBy: "year",
      bottomAxisLegend: "Year",
      leftAxisLegend: "Population",
    });
  const [rollCount, setRollCount] = useState(0);
  const [activeRandomNumberVisualization, setActiveRandomNumberVisualization] =
    useState<string>("stream");
  const [randomNumberStreamProps, setRandomNumberStreamProps] =
    useState<StreamDataPropsWithAxisLegends>({
      data: [],
      keys: [],
      bottomAxisLegend: "Roll",
      leftAxisLegend: "Number",
    });
  const [randomNumberLineProps, setRandomNumberLineProps] =
    useState<LineSvgPropsWithAxisLegends>({
      data: [],
      bottomAxisLegend: "Roll",
      leftAxisLegend: "Number",
    });
  const [randomNumberBarProps, setRandomNumberBarProps] =
    useState<BarDataPropsWithAxisLegends>({
      data: [],
      keys: [],
      indexBy: "index",
      bottomAxisLegend: "Roll",
      leftAxisLegend: "Number",
    });

  return (
    <div className="app-layout">
      <header>
        <nav>
          <NavLink to="population">Population</NavLink>
          <NavLink to="random-number">Random Number</NavLink>
        </nav>
      </header>
      <main>
        <ApolloProvider client={client}>
          <Outlet
            context={{
              selectedCountries,
              setSelectedCountries,
              activePopulationVisualization,
              setActivePopulationVisualization,
              populationStreamProps,
              setPopulationStreamProps,
              populationLineProps,
              setPopulationLineProps,
              populationBarProps,
              setPopulationBarProps,
              rollCount,
              setRollCount,
              activeRandomNumberVisualization,
              setActiveRandomNumberVisualization,
              randomNumberStreamProps,
              setRandomNumberStreamProps,
              randomNumberLineProps,
              setRandomNumberLineProps,
              randomNumberBarProps,
              setRandomNumberBarProps,
            }}
          />
        </ApolloProvider>
      </main>
    </div>
  );
}

export default AppLayout;
