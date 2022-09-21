import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../utils/constant/ItemTypes";
import { useState } from "react";
import { IProject } from "../../../utils/interface/IProject";

interface IRowPropos {
  ressource: string;
}

const Row = (props: IRowPropos) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className="row">
      <div className="ressource">
        <p>{props.ressource}</p>
      </div>
      <div
        ref={drop}
        style={{
          filter: isOver ? "brightness(0.75)" : "",
        }}
        className="newEntry"
      ></div>
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
