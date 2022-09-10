import { MantineProvider } from "@mantine/core";
import "./App.css";
import ReadExcelFile from "./components/ReadExcelFile";
import theme from "./utils/style/MantineTheme";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <ReadExcelFile />
    </MantineProvider>
  );
}

export default App;
