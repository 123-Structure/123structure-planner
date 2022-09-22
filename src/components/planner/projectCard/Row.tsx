import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../utils/constant/ItemTypes";
import { IProject } from "../../../utils/interface/IProject";
import Week from "../Week";

interface IRowPropos {
  id: string;
  ressource: string;
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}

const Row = (props: IRowPropos) => {
  return (
    <div className="row">
      <div className="ressource">
        <p>{props.ressource}</p>
      </div>
      <div className="invoicing"></div>
      <div className="correction"></div>
      <div className="mustBeFix"></div>
      <Week
        rowId={props.id}
        id={"w1"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <Week
        rowId={props.id}
        id={"w2"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <Week
        rowId={props.id}
        id={"w3"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <Week
        rowId={props.id}
        id={"w4"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <Week
        rowId={props.id}
        id={"w5"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <Week
        rowId={props.id}
        id={"w6"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
    </div>
  );
};

export default Row;
