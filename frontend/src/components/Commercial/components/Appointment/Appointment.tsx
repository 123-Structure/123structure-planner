import { Accordion } from "@mantine/core";
import React, { useState } from "react";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import TextEditor from "./components/TextEditor";

interface IAppointment {
  customer: ICustomer;
}

const Appointment = (props: IAppointment) => {
  return (
    <Accordion className="customerAppointmentAccordion">
      {props.customer.appointment.map((appointment, key) => (
        <Accordion.Item
          key={`${appointment.title} (${appointment.date.toLocaleDateString(
            "fr"
          )})`.replace(" ", "_")}
          value={`${appointment.title} (${appointment.date.toLocaleDateString(
            "fr"
          )})`}
        >
          <Accordion.Control>
            {`${appointment.title} (${appointment.date.toLocaleDateString(
              "fr"
            )})`}
          </Accordion.Control>
          <Accordion.Panel>
            <TextEditor
              _id={key}
              customer={props.customer}
              appointment={appointment}
            />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Appointment;
