import React from "react";

interface ICustomCardProps {
  img: string;
}

const CustomCard = (props: ICustomCardProps) => {
  return (
    <div className="card-demo" style={{ marginBottom: "2rem" }}>
      <div
        className="card__body shadow--md"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img src={props.img} alt="Commercial" />
      </div>
    </div>
  );
};

export default CustomCard;
