import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "./App.css";
import Planner from "./components/Planner/Planner";
import ReadExcelFile from "./components/DataGrid/ReadExcelFile";
import theme from "./assets/style/MantineTheme";
import ProjectProvider from "./context/ProjectContext";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider>
        <ProjectProvider>
          <Planner />
          {/* <ReadExcelFile /> */}
        </ProjectProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
