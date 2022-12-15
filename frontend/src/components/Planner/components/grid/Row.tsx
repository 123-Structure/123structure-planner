import { IRessource } from "../../../../data/interfaces/IRessource";
import Correction from "./Correction";
import Invoicing from "./Invoicing";
import LoadRate from "./LoadRate";
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
      <div className="loadRate">
        <LoadRate rowId={props.id} id={"loadRate1"} />
        <LoadRate rowId={props.id} id={"loadRate2"} />
        <LoadRate rowId={props.id} id={"loadRate3"} />
        <LoadRate rowId={props.id} id={"loadRate4"} />
        <LoadRate rowId={props.id} id={"loadRate5"} />
        <LoadRate rowId={props.id} id={"loadRate6"} />
      </div>
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
