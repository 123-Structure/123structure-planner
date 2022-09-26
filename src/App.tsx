import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "./App.css";
import Planner from "./components/Planner/Planner";
import ReadExcelFile from "./components/DataGrid/ReadExcelFile";
import theme from "./assets/style/MantineTheme";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider>
        <Planner />
        {/* <ReadExcelFile /> */}
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
