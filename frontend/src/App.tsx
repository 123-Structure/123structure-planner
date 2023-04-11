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
import { useEffect } from "react";
import { useLogout } from "./hooks/Auth/useLogout";
import { useAuth } from "./hooks/Auth/useAuth";

function App() {
  const { logout } = useLogout();

  // Handle Close tab or Navigator
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      logout();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function resetTimer() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const btnList = document.querySelectorAll("button");
        btnList.forEach((btn) => {
          if (btn.innerHTML.includes("Se Déconnecter")) {
            btn.click();
          }
        });
      }, 30 * 60 * 1000);
    }

    function handleUserAction() {
      resetTimer();
      // ajoutez ici toutes les autres actions que l'utilisateur peut effectuer dans votre application
    }

    // ajoutez des écouteurs d'événements pour les actions de l'utilisateur
    document.addEventListener("mousemove", handleUserAction);
    document.addEventListener("mousedown", handleUserAction);
    document.addEventListener("keydown", handleUserAction);
    document.addEventListener("touchmove", handleUserAction);

    window.onscroll = () => {
      resetTimer();
    };

    // initialise le minuteur
    resetTimer();

    // nettoyage des écouteurs d'événements lors du démontage du composant
    return () => {
      document.removeEventListener("mousemove", handleUserAction);
      document.removeEventListener("mousedown", handleUserAction);
      document.removeEventListener("keydown", handleUserAction);
      document.removeEventListener("touchmove", handleUserAction);
      clearTimeout(timeoutId);
    };
  }, []);

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
