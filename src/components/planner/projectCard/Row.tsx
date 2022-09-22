import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../utils/constant/ItemTypes";
import { IProject } from "../../../utils/interface/IProject";
import Week from "../Week";

interface IRowPropos {
  rowId: string;
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
        rowId={props.rowId}
        id={"w1"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <Week
        rowId={props.rowId}
        id={"w2"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <Week
        rowId={props.rowId}
        id={"w3"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <Week
        rowId={props.rowId}
        id={"w4"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <Week
        rowId={props.rowId}
        id={"w5"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <Week
        rowId={props.rowId}
        id={"w6"}
        projects={props.projects}
        setProjects={props.setProjects}
      />
    </div>
  );
};

export default Row;
