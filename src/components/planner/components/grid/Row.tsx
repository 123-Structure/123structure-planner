import { useMantineTheme } from "@mantine/core";
import { TRole } from "../../../../data/types/TRole";
import Correction from "./Correction";
import Invoicing from "./Invoicing";
import MustBeFix from "./MustBeFix";
import Week from "./Week";

interface IRowProps {
  id: string;
  ressource: string;
  role: TRole[];
}

const Row = (props: IRowProps) => {
  const theme = useMantineTheme();

  return (
    <div className="row">
      <div
        className="ressource"
        style={{
          backgroundColor: theme.colors.gray[2],
        }}
      >
        <p
          style={{
            color: props.role?.includes("Ingénieur") ? "red" : "black",
          }}
        >
          {props.ressource}
        </p>
      </div>
      <Invoicing rowId={props.id} />
      <Correction rowId={props.id} />
      <MustBeFix rowId={props.id} />
      <Week rowId={props.id} id={"w1"} />
      <Week rowId={props.id} id={"w2"} />
      <Week rowId={props.id} id={"w3"} />
      <Week rowId={props.id} id={"w4"} />
      <Week rowId={props.id} id={"w5"} />
      <Week rowId={props.id} id={"w6"} />
    </div>
  );
};

export default Row;
