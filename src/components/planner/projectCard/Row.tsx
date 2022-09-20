import ProjectCard from "./ProjectCard";

interface IRowPropos {
  ressource: string
}

const Row = (props: IRowPropos) => {
  return (
    <div className="row">
      <div className="ressource">
        <p>{props.ressource}</p>
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
  );
};

export default Row;
