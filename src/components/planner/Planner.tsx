import ProjectCard from "./projectCard/ProjectCard";
import "./Planner.css";

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
      {[...Array(42)].map(() => (
        <div className="row">
          <div className="ressource">
            <p>Baptiste LECHAT</p>
          </div>
          <div className="newEntry"></div>
          <div className="invocing"></div>
          <div className="correction"></div>
          <div className="mustBeFix"></div>
          <div className="week" id="w1">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
          <div className="week" id="w2">
            <ProjectCard />
            <ProjectCard />
          </div>
          <div className="week" id="w3">
            <ProjectCard />
            <ProjectCard />
          </div>
          <div className="week" id="w4">
            <ProjectCard />
            <ProjectCard />
          </div>
          <div className="week" id="w5">
            <ProjectCard />
            <ProjectCard />
          </div>
          <div className="week" id="w6">
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Planner;
