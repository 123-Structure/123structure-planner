import ProjectCard from "./projectCard/ProjectCard";
import "./Planner.css";
import Row from "./projectCard/Row";
import { RessourceList } from "../../utils/RessourceData";

const Planner = () => {
  return (
    <div className="grid">
      <div className="mustBeAssign">
        {[...Array(42)].map(() => (
          <ProjectCard />
        ))}
      </div>
      <div className="title">
        <p>Ressource</p>
        <p>Nouvelle Entrée</p>
        <p>Facturation</p>
        <p>Correction</p>
        <p>Reprise</p>
        <p>S00 - 00/00/00 au 00/00/00</p>
        <p>S00 - 00/00/00 au 00/00/00</p>
        <p>S00 - 00/00/00 au 00/00/00</p>
        <p>S00 - 00/00/00 au 00/00/00</p>
        <p>S00 - 00/00/00 au 00/00/00</p>
        <p>S00 - 00/00/00 au 00/00/00</p>
      </div>
      {RessourceList.map((ressource, index) => (
        <Row
          key={index}
          ressource={`${ressource.firstName} ${ressource.lastName}`}
        />
      ))}
    </div>
  );
};

export default Planner;
