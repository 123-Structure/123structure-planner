import { IRessource } from "../../../../data/interfaces/IRessource";
import Correction from "./Correction";
import Invoicing from "./Invoicing";
import MustBeFix from "./MustBeFix";
import Ressource from "./Ressource";
import Week from "./Week";

interface IRowProps {
  id: string;
  ressource: IRessource;
}

const Row = (props: IRowProps) => {
  return (
    <div className="row">
      <Ressource ressource={props.ressource} />
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
