import { ICustomer } from "../../../../data/interfaces/ICustomer";
import "../../../../assets/style/Customer.css";
import CustomerIdentity from "./components/CustomerIdentity";
import CustomerRelationship from "./components/CustomerRelationship";
import CustomerPayment from "./components/CustomerPayment";
import { Accordion } from "@mantine/core";
import { IconCash, IconUsers } from "@tabler/icons";
import NewAppointment from "../Appointment/NewAppointment";
import AppointmentList from "../Appointment/AppointmentList";
import { useEffect, useState } from "react";

interface ICustomerProps {
  customer: ICustomer;
}

const Customer = (props: ICustomerProps) => {

  return (
    <>
      <div className="customer">
        <CustomerIdentity customer={props.customer} />
        <CustomerRelationship customer={props.customer} />
        <CustomerPayment customer={props.customer} />
      </div>
      <NewAppointment customer={props.customer} />
      <Accordion className={"customerAccordion"}>
        <CustomerIdentity customer={props.customer} />

        <Accordion.Item value={`customerRelationship_${props.customer.name}`}>
          <Accordion.Control icon={<IconUsers size={24} />}>
            Relation commerciale
          </Accordion.Control>
          <Accordion.Panel className="customerAccordionContent">
            <CustomerRelationship customer={props.customer} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value={`customerPayment_${props.customer.name}`}>
          <Accordion.Control icon={<IconCash size={24} />}>
            Comptabilité
          </Accordion.Control>
          <Accordion.Panel className="customerAccordionContent">
            <CustomerPayment customer={props.customer} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <AppointmentList customer={props.customer} />
    </>
  );
};

export default Customer;
