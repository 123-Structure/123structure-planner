import { useMantineTheme } from "@mantine/core";
import { IProject } from "../../../data/interfaces/IProject";
import Correction from "./Correction";
import Invoicing from "./Invoicing";
import MustBeFix from "./MustBeFix";
import Week from "./Week";

interface IRowPropos {
  id: string;
  ressource: string;
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}

const Row = (props: IRowPropos) => {
  const theme = useMantineTheme();

  return (
    <div className="row">
      <div
        className="ressource"
        style={{
          backgroundColor: theme.colors.gray[2],
        }}
      >
        <p>{props.ressource}</p>
      </div>
      <Invoicing
        rowId={props.id}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <Correction
        rowId={props.id}
        projects={props.projects}
        setProjects={props.setProjects}
      />
      <MustBeFix
        rowId={props.id}
        projects={props.projects}
        setProjects={props.setProjects}
      />
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
