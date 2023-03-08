import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "./App.css";
import Planner from "./components/Planner/Planner";
import theme from "./assets/style/MantineTheme";
import ProjectProvider from "./context/ProjectContext";
import Header from "./components/Header/Header";
import RessourceProvider from "./context/RessourceContext";
import AuthProvider from "./context/AuthContext";
import Commercial from "./components/Commercial/Commercial";
import CustomerProvider from "./context/CustomerContext";
import CustomerRoutesProvider from "./context/CustomerRoutes";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <ProjectProvider>
        <CustomerProvider>
          <CustomerRoutesProvider>
            <RessourceProvider>
              <AuthProvider>
                <Notifications />
                <Header />
                {/* <Planner /> */}
                <Commercial />
              </AuthProvider>
            </RessourceProvider>
          </CustomerRoutesProvider>
        </CustomerProvider>
      </ProjectProvider>
    </MantineProvider>
  );
}

export default App;
