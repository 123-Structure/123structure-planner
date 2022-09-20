import { MantineProvider } from "@mantine/core";
import "./App.css";
import LibelleCard from "./components/dataGrid/ProjectCard/ProjectCard";
import ReadExcelFile from "./components/ReadExcelFile";
import theme from "./utils/style/MantineTheme";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <div
        style={{
          backgroundColor: "red",
          height: "100%",
          display: "flex",
        }}
      >
        {[...Array(11)].map(() => (
          <div
            style={{
              width: window.screen.width / 11,
              backgroundColor: `rgb(${Math.random() * 255},${
                Math.random() * 255
              },${Math.random() * 255})`,
              height: "100%",
            }}
          >
            <LibelleCard />
            <LibelleCard />
            <LibelleCard />
            <LibelleCard />
            <LibelleCard />
            <LibelleCard />
            <LibelleCard />
            <LibelleCard />
            <LibelleCard />
            <LibelleCard />
          </div>
        ))}
      </div>

      {/* <ReadExcelFile /> */}
    </MantineProvider>
  );
}

export default App;
