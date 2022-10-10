import "../../assets/style/Planner.css";
import Row from "./components/grid/Row";
import { RessourceData } from "../../data/constants/RessourceData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MustBeAssign from "./components/grid/MustBeAssign";
import Title from "./components/grid/Title";
import NewEntry from "./components/grid/NewEntry";
import { useAuth } from "../../context/AuthContext";

const Planner = () => {
  const auth = useAuth();

  if (!auth) {
    return (
      <DndProvider backend={HTML5Backend}>
        <div
          className="grid"
          style={{
            gridTemplateRows: `328px 50px repeat(${RessourceData.filter(
              (ressource) => ressource.role !== "Administrateur"
            ).length}, minmax(66px, auto))`,
          }}
        >
          <MustBeAssign />
          <Title />
          <NewEntry />
          {RessourceData.filter(
            (ressource) => ressource.role !== "Administrateur"
          ).map((ressource, index) => (
            <Row
              key={index}
              id={`${ressource.firstName[0]}.${ressource.lastName}`}
              ressource={`${ressource.firstName} ${ressource.lastName}`}
              role={ressource.role}
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
