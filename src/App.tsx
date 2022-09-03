import { MantineProvider } from "@mantine/core";
import "./App.css";
import ReadExcelFile from "./components/ReadExcelFile";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ReadExcelFile />
    </MantineProvider>
  );
}

export default App;
