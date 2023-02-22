import { Accordion, Indicator, Select, SelectItem } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendarEvent } from "@tabler/icons";
import React, { useState } from "react";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { TAppointmentTitle } from "../../../../data/types/TApppointmentTitle";
import "dayjs/locale/fr";
import "../../../../assets/style/Appointment.css";
import Appointment from "./components/Appointment";
import { IAppointment } from "../../../../data/interfaces/IAppointment";

interface IAppointmentList {
  customer: ICustomer;
  accordionValue: string | null;
  setAccordionValue: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppointmentList = (props: IAppointmentList) => {
  const [editAppointment, setEditAppointment] = useState(false);

  const [appointmentTitle, setAppointmentTitle] = useState<
    string | TAppointmentTitle | null
  >("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());

  const getData = () => {
    const appointmentTitle = [
      "RDV Démarchage",
      "RDV Technique",
      "RDV Courtoisie",
    ];

    return appointmentTitle.reduce((acc, title: string | SelectItem) => {
      const item = {
        value: title,
        label: title,
      } as SelectItem;
      acc.push(item);
      return acc;
    }, [] as (string | SelectItem)[]);
  };

  const compareDates = (a: IAppointment, b: IAppointment) =>
    b.date.getTime() - a.date.getTime();

  return (
    <Accordion
      className="customerAppointmentAccordion"
      value={props.accordionValue}
      onChange={editAppointment ? () => "" : props.setAccordionValue}
    >
      {props.customer.appointment
        .sort(compareDates)
        .map((appointment, index) => (
          <Accordion.Item
            key={`${appointment.title} (${appointment.date.toLocaleDateString(
              "fr"
            )})`.replace(" ", "_")}
            value={`${appointment.title} (${appointment.date.toLocaleDateString(
              "fr"
            )})`}
          >
            <Accordion.Control icon={<IconCalendarEvent size={24} />}>
              {editAppointment &&
              `${appointment.title} (${appointment.date.toLocaleDateString(
                "fr"
              )})` === props.accordionValue ? (
                <div className="editAppointmentTitle">
                  <Select
                    className="editAppointmentTitleInput"
                    data={getData()}
                    value={
                      `${
                        appointment.title
                      } (${appointment.date.toLocaleDateString("fr")})` ===
                      props.accordionValue
                        ? appointmentTitle
                        : appointment.title
                    }
                    onChange={(val) => {
                      setAppointmentTitle(val);
                    }}
                  />
                  <DatePicker
                    className="editAppointmentTitleInput"
                    allowFreeInput
                    dropdownPosition={undefined}
                    locale="fr"
                    excludeDate={(date) =>
                      date.getDay() === 0 || date.getDay() === 6
                    }
                    inputFormat="DD/MM/YYYY"
                    defaultValue={appointment.date}
                    onChange={(val: Date) => setAppointmentDate(val)}
                    renderDay={(date) => {
                      const day = date.toLocaleDateString("fr");
                      const today = new Date().toLocaleDateString("fr");
                      return (
                        <Indicator
                          size={6}
                          color="red"
                          offset={8}
                          disabled={day !== today}
                        >
                          <div>{date.getDate()}</div>
                        </Indicator>
                      );
                    }}
                  />
                </div>
              ) : (
                `${appointment.title} (${appointment.date.toLocaleDateString(
                  "fr"
                )})`.toUpperCase()
              )}
            </Accordion.Control>
            <Accordion.Panel>
              <Appointment
                _id={index}
                customer={props.customer}
                appointment={appointment}
                editAppointment={editAppointment}
                setEditAppointment={setEditAppointment}
                appointmentTitle={appointmentTitle}
                setAppointmentTitle={setAppointmentTitle}
                appointmentDate={appointmentDate}
                setAppointmentDate={setAppointmentDate}
                setAccordionValue={props.setAccordionValue}
              />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
    </Accordion>
  );
};

export default AppointmentList;
