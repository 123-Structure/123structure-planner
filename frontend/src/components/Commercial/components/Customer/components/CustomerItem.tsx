import { ActionIcon, NumberInput, TextInput } from "@mantine/core";
import React, { ReactNode } from "react";
import "../../../../../assets/style/CustomerItem.css";
import { TProjectGoal } from "../../../../../data/types/TProjectGoal";

interface ICustomerItemProps {
  color: string;
  label: (string | number)[];
  updateLabel?: (
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>
  )[];
  icon: React.ReactNode;
  handleClick?: () => void;
  editMode?: boolean;
  inputType?: "text" | "number";
  errorMessage?: string[];
}

const CustomerItem = (props: ICustomerItemProps) => {
  const input = () => {
    if (props.inputType === "text") {
      return props.label.map((label, index) => (
        <TextInput
          key={index}
          className="customerItemInput"
          value={label}
          onChange={(event) => {
            if (props.updateLabel !== undefined) {
              props.updateLabel[index](event.currentTarget.value as any);
            }
          }}
          error={
            props.errorMessage !== undefined
              ? props.errorMessage[index] !== ""
                ? props.errorMessage[index]
                : false
              : false
          }
        />
      ));
    }
    if (props.inputType === "number") {
      return props.label.map((label, index) => (
        <NumberInput
          key={index}
          className="honoraireMontantDevis"
          defaultValue={label as number}
          step={10}
          precision={0}
          min={0}
          value={label as number}
          onChange={(val: number) => {
            if (props.updateLabel !== undefined) {
              props.updateLabel[index](val as any);
            }
          }}
        />
      ));
    }
  };

  return (
    <div
      className={`customerItem ${
        props.handleClick !== undefined && !props.editMode
          ? "customerClickableItem"
          : ""
      }`}
      onClick={
        props.handleClick !== undefined && !props.editMode
          ? props.handleClick
          : () => ""
      }
    >
      <ActionIcon size="xl" variant="filled" color={props.color}>
        {props.icon}
      </ActionIcon>
      {props.editMode ? input() : <p>{props.label.join(" ")}</p>}
    </div>
  );
};

export default CustomerItem;
