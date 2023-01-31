import { ActionIcon, TextInput } from "@mantine/core";
import React, { ReactNode } from "react";
import "../../../../../assets/style/CustomerItem.css";

interface ICustomerItemProps {
  color: string;
  label: (string | number)[];
  updateLabel?: React.Dispatch<React.SetStateAction<string>>[];
  icon: React.ReactNode;
  handleClick?: () => void;
  editMode: boolean;
  errorMessage?: string[];
}

const CustomerItem = (props: ICustomerItemProps) => {
  const input = () => {
    return props.label.map((label, index) => (
      <TextInput
        key={index}
        className="customerItemInput"
        value={label}
        onChange={(event) => {
          if (props.updateLabel !== undefined) {
            props.updateLabel[index](event.currentTarget.value);
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
