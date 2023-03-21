import "../../assets/style/Planner.css";
import Row from "./components/Grid/Row";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import MustBeAssign from "./components/Grid/MustBeAssign";
import Title from "./components/Grid/Title";
import NewEntry from "./components/Grid/NewEntry";
import { isTouchDevice } from "../../utils/isTouchDevice";
import { useMantineTheme } from "@mantine/core";
import { useRessources } from "../../hooks/Ressources/useRessources";
import { useAuth } from "../../hooks/Auth/useAuth";

const Planner = () => {
  const theme = useMantineTheme();
  const auth = useAuth();
  const ressources = useRessources();

  if (!auth) {
    return (
      <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
        <div
          className="grid"
          style={{
            gridTemplateRows: `50px 328px 50px repeat(${
              ressources.filter(
                (ressource) =>
                  ressource.role.sort()[0] !== "Administrateur" ||
                  ressource.role.length > 1
              ).length
            }, minmax(66px, auto))`,
          }}
        >
          <div
            className="mustBeAssignTitle"
            style={{
              backgroundColor: theme.colors.yellow[5],
            }}
          >
            <p>Dossier à attribuer</p>
          </div>
          <MustBeAssign />
          <Title />
          <NewEntry />
          {ressources
            .filter(
              (ressource) =>
                !ressource.role.includes("Administrateur") &&
                !ressource.role.includes("Commercial")
            )
            .map((ressource, index) => (
              <Row
                key={index}
                id={ressource.email.split("@")[0]}
                ressource={ressource}
              />
            ))}
        </div>
      </DndProvider>
    );
  } else {
    return <></>;
  }
};

export default Planner;
