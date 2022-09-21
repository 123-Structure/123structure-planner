import ProjectCard from "./ProjectCard";

interface IRowPropos {
  ressource: string;
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
      <div className="week" id="w1"></div>
      <div className="week" id="w2"></div>
      <div className="week" id="w3"></div>
      <div className="week" id="w4"></div>
      <div className="week" id="w5"></div>
      <div className="week" id="w6"></div>
    </div>
  );
};

export default Row;
