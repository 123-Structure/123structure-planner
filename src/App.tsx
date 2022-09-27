import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "./App.css";
import Planner from "./components/Planner/Planner";
import theme from "./assets/style/MantineTheme";
import ProjectProvider from "./context/ProjectContext";
import AddProjectFromExcel from "./components/AddProjectFromExcel/AddProjectFromExcel";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider>
        <ProjectProvider>
          <AddProjectFromExcel />
          <Planner />
        </ProjectProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
