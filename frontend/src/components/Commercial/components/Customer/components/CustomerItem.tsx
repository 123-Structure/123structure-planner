import { ActionIcon } from "@mantine/core";
import React from "react";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";

interface ICustomerItemProps {
  color: string;
  label: string;
  icon: React.ReactNode;
  isClickableItem?: boolean;
  handleClick?: () => void;
}

const CustomerItem = (props: ICustomerItemProps) => {
  return (
    <p
      className={`customerItem ${
        props.isClickableItem === true ? "customerClickableItem" : ""
      }`}
      onClick={props.handleClick}
    >
      <ActionIcon
        size="xl"
        variant="filled"
        color={props.color}
      >
        {props.icon}
      </ActionIcon>
      {props.label}
    </p>
  );
};

export default CustomerItem;
