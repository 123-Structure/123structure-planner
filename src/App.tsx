import { MantineProvider } from "@mantine/core";
import "./App.css";
import Planner from "./components/planner/Planner";
import ReadExcelFile from "./components/ReadExcelFile";
import theme from "./utils/style/MantineTheme";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      {/* {[...Array(10)].map(() => (
            <LibelleCard />
          ))} */}
      <Planner />
      {/* <ReadExcelFile /> */}
    </MantineProvider>
  );
}

export default App;
