import { MantineProvider } from "@mantine/core";
import "./App.css";
import ReadExcelFile from "./components/ReadExcelFile";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          brand: [
            "#FFF9DB",
            "#FFF3BF",
            "#FFEC99",
            "#FFE066",
            "#FFD43B",
            "#FCC419",
            "#FAB005",
            "#F59F00",
            "#F08C00",
            "#E67700",
          ],
        },
        primaryColor: "brand",
      }}
    >
      <ReadExcelFile />
    </MantineProvider>
  );
}

export default App;
