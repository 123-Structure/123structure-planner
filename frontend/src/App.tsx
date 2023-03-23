import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "./App.css";
import theme from "./assets/style/MantineTheme";
import ProjectProvider from "./context/ProjectContext";
import Header from "./components/Header/Header";
import RessourceProvider from "./context/RessourceContext";
import AuthProvider from "./context/AuthContext";
import CustomerProvider from "./context/CustomerContext";
import CustomerRoutesProvider from "./context/CustomerRoutes";
import UserDataProvider from "./context/UserDataContext";
import Router from "./components/Router";
import RouterProvider from "./context/RouterContext";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <RouterProvider>
        <ProjectProvider>
          <CustomerProvider>
            <CustomerRoutesProvider>
              <RessourceProvider>
                <AuthProvider>
                  <UserDataProvider>
                    <Notifications />
                    <Header />
                    <Router />
                  </UserDataProvider>
                </AuthProvider>
              </RessourceProvider>
            </CustomerRoutesProvider>
          </CustomerProvider>
        </ProjectProvider>
      </RouterProvider>
    </MantineProvider>
  );
}

export default App;
