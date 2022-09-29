import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "./App.css";
import Planner from "./components/Planner/Planner";
import theme from "./assets/style/MantineTheme";
import ProjectProvider from "./context/ProjectContext";
import Header from "./components/Header/Header";
import AuthProvider, { useAuth, useUpdateAuth } from "./context/AuthContext";

function App() {
  const auth = useAuth();
  console.log(auth);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider>
        <ProjectProvider>
          <AuthProvider>
            <Header />
            {auth ? <Planner /> : <></>}
          </AuthProvider>
        </ProjectProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
