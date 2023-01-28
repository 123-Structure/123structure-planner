import React from "react";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import "../../../../assets/style/Customer.css";
import CustomerIdentity from "./components/CustomerIdentity";
import CustomerRelationship from "./components/CustomerRelationship";
import CustomerPayment from "./components/CustomerPayment";

interface ICustomerProps {
  color: string;
  customer: ICustomer;
}

const Customer = (props: ICustomerProps) => {
  return (
    <div className="customer">
      <CustomerIdentity color={props.color} customer={props.customer} />
      <CustomerRelationship color={props.color} customer={props.customer} />
      <CustomerPayment color={props.color} customer={props.customer} />
    </div>
  );
};

export default Customer;
