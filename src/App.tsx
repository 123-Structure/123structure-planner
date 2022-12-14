import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "./App.css";
import Planner from "./components/_Planner/Planner";
import theme from "./assets/style/MantineTheme";
import ProjectProvider from "./context/ProjectContext";
import Header from "./components/Header/Header";
import RessourceProvider from "./context/RessourceContext";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider>
        <ProjectProvider>
          <RessourceProvider>
            <AuthProvider>
              <Header />
              <Planner />
            </AuthProvider>
          </RessourceProvider>
        </ProjectProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
