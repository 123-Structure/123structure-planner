import "../../assets/style/Planner.css";
import Row from "./components/grid/Row";
import { RessourceData } from "../../data/constants/RessourceData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MustBeAssign from "./components/grid/MustBeAssign";
import Title from "./components/grid/Title";
import NewEntry from "./components/grid/NewEntry";

const Planner = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid">
        <MustBeAssign />
        <Title />
        <NewEntry />
        {RessourceData.map((ressource, index) => (
          <Row
            key={index}
            id={`${ressource.firstName[0]}.${ressource.lastName}`}
            ressource={`${ressource.firstName} ${ressource.lastName}`}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Planner;
