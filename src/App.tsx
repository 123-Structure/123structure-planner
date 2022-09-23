import { MantineProvider } from "@mantine/core";
import "./App.css";
import Planner from "./components/planner/Planner";
import ReadExcelFile from "./components/DataGrid/ReadExcelFile";
import theme from "./assets/style/MantineTheme";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Planner />
      {/* <ReadExcelFile /> */}
    </MantineProvider>
  );
}

export default App;
