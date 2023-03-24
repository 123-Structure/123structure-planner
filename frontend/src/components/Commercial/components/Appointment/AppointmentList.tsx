import { Accordion, Indicator, Select, SelectItem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendarEvent } from "@tabler/icons";
import React, { useState } from "react";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { TAppointmentTitle } from "../../../../data/types/TApppointmentTitle";
import "dayjs/locale/fr";
import "../../../../assets/style/Appointment.css";
import Appointment from "./components/Appointment";
import { IAppointment } from "../../../../data/interfaces/IAppointment";
import { useCustomerRoutes } from "../../../../hooks/CustomerRoutes/useCustomerRoutes";
import { useUpdateCustomerRoutes } from "../../../../hooks/CustomerRoutes/useUpdateCustomerRoutes";

interface IAppointmentList {
  customer: ICustomer;
}

const AppointmentList = (props: IAppointmentList) => {
  const [editAppointment, setEditAppointment] = useState(false);

  const [appointmentTitle, setAppointmentTitle] = useState<
    string | TAppointmentTitle | null
  >("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());

  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();

  const getData = () => {
    const appointmentTitle = [
      "RDV Démarchage",
      "RDV Technique",
      "RDV Courtoisie",
      "Autre",
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

  const compareDates = (a: IAppointment, b: IAppointment) => {
    new Date(b.date).getTime();

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  };

  return (
    <Accordion
      className="customerAppointmentAccordion"
      value={customerRoutes.appointment}
      onChange={(val: string) =>
        editAppointment
          ? () => ""
          : setCustomerRoutes({ ...customerRoutes, appointment: val })
      }
    >
      {props.customer.appointment
        .sort(compareDates)
        .map((appointment, index) => (
          <Accordion.Item
            key={`${appointment.title} (${new Date(
              appointment.date
            ).toLocaleDateString("fr")})`.replace(" ", "_")}
            value={`${appointment.title} (${new Date(
              appointment.date
            ).toLocaleDateString("fr")})`}
          >
            <Accordion.Control icon={<IconCalendarEvent size={24} />}>
              {editAppointment &&
              `${appointment.title} (${new Date(
                appointment.date
              ).toLocaleDateString("fr")})` === customerRoutes.appointment ? (
                <div className="editAppointmentTitle">
                  <Select
                    className="editAppointmentTitleInput"
                    data={getData()}
                    value={
                      `${appointment.title} (${new Date(
                        appointment.date
                      ).toLocaleDateString("fr")})` ===
                      customerRoutes.appointment
                        ? appointmentTitle
                        : appointment.title
                    }
                    onChange={(val) => {
                      setAppointmentTitle(val);
                    }}
                  />
                  <DatePickerInput
                    className="editAppointmentTitleInput"
                    locale="fr"
                    excludeDate={(date) =>
                      date.getDay() === 0 || date.getDay() === 6
                    }
                    valueFormat="DD/MM/YYYY"
                    defaultValue={new Date(appointment.date)}
                    onChange={(val: Date) => setAppointmentDate(val)}
                    renderDay={(date) => {
                      const day = date.toLocaleDateString("fr");
                      const today = new Date().toLocaleDateString("fr");
                      return (
                        <Indicator
                          size={6}
                          color="red"
                          offset={-2}
                          disabled={day !== today}
                        >
                          <div>{date.getDate()}</div>
                        </Indicator>
                      );
                    }}
                  />
                </div>
              ) : (
                `${appointment.title} (${new Date(
                  appointment.date
                ).toLocaleDateString("fr")})`.toUpperCase()
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
              />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
    </Accordion>
  );
};

export default AppointmentList;
