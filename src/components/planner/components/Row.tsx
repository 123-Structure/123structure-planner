import { useMantineTheme } from "@mantine/core";
import { useDrop } from "react-dnd";
import theme from "../../../assets/style/MantineTheme";
import { ItemTypes } from "../../../data/constants/ItemTypes";
import { IProject } from "../../../data/interfaces/IProject";
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
      <div
        className="invoicing"
        style={{
          backgroundColor: theme.colors.lime[1],
        }}
      ></div>
      <div
        className="correction"
        style={{
          backgroundColor: theme.colors.blue[1],
        }}
      ></div>
      <div
        className="mustBeFix"
        style={{
          backgroundColor: theme.colors.red[1],
        }}
      ></div>
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
