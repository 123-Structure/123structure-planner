import { Card } from "@mantine/core";
import {
  IconCalendarTime,
  IconCash,
  IconCashOff,
  IconCreditCard,
} from "@tabler/icons";
import React, { useState } from "react";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import CustomTitle from "../../../../utils/CustomTitle";
import EditModeToggle from "../../../../utils/EditModeToggle";
import CustomerItem from "./CustomerItem";

interface ICustomerPaymentProps {
  customer: ICustomer;
}

const CustomerPayment = (props: ICustomerPaymentProps) => {
  const [editCustomerPayment, setEditCustomerPayment] = useState(false);

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="customerPayment">
      <div className="customerItemContainer">
        <div className="customerItemTitle">
          <CustomerItem
            editMode={editCustomerPayment}
            label={["Délai de paiement :"]}
            icon={<IconCalendarTime size={24} color="black" />}
            color="yellow"
          />
          <p>{props.customer.paymentDeadline}</p>
        </div>
        <div className="customerItemTitle">
          <CustomerItem
            editMode={editCustomerPayment}
            label={["Mode de paiement :"]}
            icon={<IconCreditCard size={24} color="black" />}
            color="yellow"
          />
          <p>{props.customer.paymentType}</p>
        </div>
        <div className="customerItemTitle">
          <CustomerItem
            editMode={editCustomerPayment}
            color={
              props.customer.paymentStatus === "A"
                ? "green"
                : props.customer.paymentStatus === "B"
                ? "orange"
                : "red"
            }
            label={["Statut de paiement :"]}
            icon={
              props.customer.paymentStatus === "C" ? (
                <IconCashOff size={24} color="black" />
              ) : (
                <IconCash size={24} color="black" />
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
