import { Card } from "@mantine/core";
import {
  IconCalendarTime,
  IconCash,
  IconCashOff,
  IconCreditCard,
} from "@tabler/icons";
import React from "react";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import CustomerItem from "./CustomerItem";

interface ICustomerPaymentProps {
  customer: ICustomer;
}

const CustomerPayment = (props: ICustomerPaymentProps) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="customerPayment">
      <div className="customerItemContainer">
        <div className="customerItemTitle">
          <CustomerItem
            isClickableItem={false}
            label={"Délai de paiement :"}
            icon={<IconCalendarTime size={24} color="black" />}
            color="yellow"
          />
          <p>{props.customer.paymentDeadline}</p>
        </div>
        <div className="customerItemTitle">
          <CustomerItem
            isClickableItem={false}
            label={"Mode de paiement :"}
            icon={<IconCreditCard size={24} color="black" />}
            color="yellow"
          />
          <p>{props.customer.paymentType}</p>
        </div>
        <div className="customerItemTitle">
          <CustomerItem
            isClickableItem={false}
            color={
              props.customer.paymentStatus === "A"
                ? "green"
                : props.customer.paymentStatus === "B"
                ? "orange"
                : "red"
            }
            label={"Statut de paiement :"}
            icon={
              props.customer.paymentStatus === "C" ? (
                <IconCashOff size={24} color="black" />
              ) : (
                <IconCash size={24} color="black"/>
              )
            }
          />
          <p>{props.customer.paymentStatus}</p>
        </div>
      </div>
    </Card>
  );
};

export default CustomerPayment;
