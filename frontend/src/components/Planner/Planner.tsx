import "../../assets/style/Planner.css";
import Row from "./components/Grid/Row";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import MustBeAssign from "./components/Grid/MustBeAssign";
import Title from "./components/Grid/Title";
import NewEntry from "./components/Grid/NewEntry";
import { useAuth } from "../../context/AuthContext";
import { useRessources } from "../../context/RessourceContext";
import { isTouchDevice } from "../../utils/isTouchDevice";

const Planner = () => {
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
          <div className="mustBeAssignTitle">
            <p>Dossier à attribuer</p>
          </div>
          <MustBeAssign />
          <Title />
          <NewEntry />
          {ressources
            .filter((ressource) => !ressource.role.includes("Administrateur"))
            .map((ressource, index) => (
              <Row key={index} id={`${ressource._id}`} ressource={ressource} />
            ))}
        </div>
      </DndProvider>
    );
  } else {
    return <></>;
  }
};

export default Planner;
