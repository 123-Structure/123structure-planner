import { Card, MultiSelect, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconCalendar,
  IconCurrencyEuro,
  IconHomeCheck,
  IconTargetArrow,
  IconUser,
  IconUsers,
} from "@tabler/icons";
import React, { useState } from "react";
import {
  useCustomer,
  useUpdateCustomer,
} from "../../../../../context/CustomerContext";
import { useRessources } from "../../../../../context/RessourceContext";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import CustomButton from "../../../../utils/CustomButton";
import CustomDivider from "../../../../utils/CustomDivider";
import CustomTitle from "../../../../utils/CustomTitle";
import EditModeToggle from "../../../../utils/EditModeToggle";
import CustomerItem from "../../utils/CustomerItem";

interface ICustomerRelationshipProps {
  customer: ICustomer;
}

const CustomerRelationship = (props: ICustomerRelationshipProps) => {
  const ressources = useRessources();
  const customers = useCustomer();
  const setCustomers = useUpdateCustomer();

  const getPriceListURL = () => {
    const binaryString = window.atob(props.customer.priceList.split(",")[1]);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const arrayBuffer = bytes.buffer;

    // Créer un objet blob à partir de l'ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });

    // Créer un objet URL à partir du blob
    const pdfUrl = URL.createObjectURL(blob);
    return pdfUrl;
  };

  const getCurrentGoal = () => {
    const currentYear = props.customer.projectGoal.filter(
      (projectGoal) => projectGoal.year === new Date().getFullYear()
    )[0];

    return currentYear !== undefined ? currentYear.goal : 0;
  };

  const getPreviousYearGoal = () => {
    const previousYear = props.customer.projectGoal.filter(
      (projectGoal) => projectGoal.year === new Date().getFullYear() - 1
    )[0];

    return previousYear !== undefined ? previousYear.goal : 0;
  };

  const [editCustomerRelationship, setEditCustomerRelationship] =
    useState(false);
  const [currentProjectGoal, setCurrentProjectGoal] = useState(
    getCurrentGoal()
  );
  const [previousYearGoal, setPreviousYearGoal] = useState(
    getPreviousYearGoal()
  );
  const [commercial, setCommercial] = useState(
    props.customer.commercial.map(
      (commercial) => `${commercial.firstName} ${commercial.lastName}`
    )
  );

  const currentProjectInvoiced = 100;
  const previousYearProjectInvoiced = 100;

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

  const openURL = (url: string) => {
    window.open(url, "_blank");
  };

  const getLastAppointment = () => {
    if (props.customer.appointment.length > 0) {
      const appointment =
        props.customer.appointment[props.customer.appointment.length - 1];

      return `${appointment.title} (${appointment.date.toLocaleDateString(
        "fr"
      )})`;
    } else {
      return "-";
    }
  };

  const handleValideClick = () => {
    const newCustomer = [...customers];
    const changedCustomer = newCustomer.filter(
      (customer) =>
        customer.category === props.customer.category &&
        customer.group === props.customer.group &&
        customer.name === props.customer.name
    );

    changedCustomer[0].commercial = ressources.filter((ressource) =>
      commercial.includes(`${ressource.firstName} ${ressource.lastName}`)
    );

    changedCustomer[0].projectGoal.filter(
      (projectGoal) => projectGoal.year === new Date().getFullYear()
    )[0].goal = currentProjectGoal;

    changedCustomer[0].projectGoal.filter(
      (projectGoal) => projectGoal.year === new Date().getFullYear() - 1
    )[0].goal = previousYearGoal;

    setCustomers(newCustomer);
    showNotification({
      title: `✅ Fiche client sauvegardée`,
      message: `La fiche client ${props.customer.name} est mise à jour`,
      color: "green",
    });
    setEditCustomerRelationship(false);
  };

  const handleCancelClick = () => {
    setCommercial(
      props.customer.commercial.map(
        (commercial) => `${commercial.firstName} ${commercial.lastName}`
      )
    );

    setCurrentProjectGoal(
      props.customer.projectGoal.filter(
        (projectGoal) => projectGoal.year === new Date().getFullYear()
      )[0].goal
    );

    setPreviousYearGoal(
      props.customer.projectGoal.filter(
        (projectGoal) => projectGoal.year === new Date().getFullYear() - 1
      )[0].goal
    );

    showNotification({
      title: `⛔ Fiche client non sauvegardée`,
      message: `Les modifications pour ${props.customer.name} sont annulées`,
      color: "red",
    });
    setEditCustomerRelationship(false);
  };

  const selectValue = (
    editMode: boolean,
    currentValue: string[],
    label: string[],
    defaultValue: string[]
  ) => {
    if (editMode) {
      const acc = [] as string[];
      label.map((label) =>
        currentValue.includes(label) ? acc.push(`${label}*`) : acc.push(label)
      );
      return acc;
    } else {
      return smallScreen ? [""] : defaultValue;
    }
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="customerRelationship"
    >
      <div className="customerTitle">
        <CustomTitle
          flexStart={true}
          icon={<IconUsers size={24} />}
          title="Relation commerciale"
        />
        <EditModeToggle
          disabled={false}
          editMode={editCustomerRelationship}
          editLabel=""
          validateLabel=""
          cancelLabel=""
          handleEditClick={() => setEditCustomerRelationship(true)}
          handleValideClick={handleValideClick}
          handleCancelClick={handleCancelClick}
        />
      </div>
      <div className="customerItemContainer">
        <div className="customerItemTitle">
          <CustomerItem
            editMode={editCustomerRelationship}
            inputType={"multiselect"}
            value={selectValue(
              editCustomerRelationship,
              commercial,
              ressources
                .filter((commercial) => commercial.role.includes("Commercial"))
                .map(
                  (ressource) => `${ressource.firstName} ${ressource.lastName}`
                ),
              ["Commercial référent :"]
            )}
            updateValue={[setCommercial]}
            icon={<IconUser size={24} color="black" />}
            color="yellow"
          />
          <p>
            {editCustomerRelationship
              ? ""
              : props.customer.commercial.map(
                  (commercial, index) =>
                    `${index > 0 ? " - " : ""}${commercial.firstName} ${
                      commercial.lastName
                    }`
                )}
          </p>
        </div>
        <div className="customerItemTitle">
          <CustomerItem
            value={["Dernière visite :"]}
            icon={<IconCalendar size={24} color="black" />}
            color="yellow"
          />
          <p>{getLastAppointment()}</p>
        </div>
        <div className="customerProjectGoalContainer">
          <div className="customerItemTitle">
            <CustomerItem
              editMode={editCustomerRelationship}
              inputType={"number"}
              value={[
                editCustomerRelationship
                  ? previousYearGoal
                  : `Objectif ${new Date().getFullYear() - 1} :`,
              ]}
              updateValue={[setPreviousYearGoal]}
              icon={<IconTargetArrow size={24} color="black" />}
              color="yellow"
            />
            <p>
              {editCustomerRelationship
                ? `(${new Date().getFullYear() - 1})`
                : previousYearGoal}
            </p>
          </div>
          <div className="customerItemTitle">
            <CustomerItem
              editMode={editCustomerRelationship}
              inputType={"number"}
              value={[
                editCustomerRelationship
                  ? currentProjectGoal
                  : `Objectif ${new Date().getFullYear()} :`,
              ]}
              updateValue={[setCurrentProjectGoal]}
              icon={<IconTargetArrow size={24} color="black" />}
              color="yellow"
            />
            <p>
              {editCustomerRelationship
                ? `(${new Date().getFullYear()})`
                : currentProjectGoal}
            </p>
          </div>
          <div className="customerItemTitle">
            <CustomerItem
              inputType={"number"}
              value={[`Production ${new Date().getFullYear() - 1} :`]}
              icon={<IconHomeCheck size={24} color="black" />}
              color={
                (previousYearProjectInvoiced / previousYearGoal) * 100 < 80
                  ? "red"
                  : (previousYearProjectInvoiced / previousYearGoal) * 100 >=
                      80 &&
                    (previousYearProjectInvoiced / previousYearGoal) * 100 < 100
                  ? "orange"
                  : "green"
              }
            />
            <p className="customerProductionContainer">
              <span
                style={{
                  color:
                    (previousYearProjectInvoiced / previousYearGoal) * 100 < 80
                      ? theme.colors.red[6]
                      : (previousYearProjectInvoiced / previousYearGoal) *
                          100 >=
                          80 &&
                        (previousYearProjectInvoiced / previousYearGoal) * 100 <
                          100
                      ? theme.colors.orange[6]
                      : theme.colors.green[6],
                }}
              >
                {previousYearProjectInvoiced}
              </span>
              {`/${previousYearGoal}`}
            </p>
          </div>
          <div className="customerItemTitle">
            <CustomerItem
              inputType={"number"}
              value={[`Production ${new Date().getFullYear()} :`]}
              icon={<IconHomeCheck size={24} color="black" />}
              color={
                (currentProjectInvoiced / currentProjectGoal) * 100 < 80
                  ? "red"
                  : (currentProjectInvoiced / currentProjectGoal) * 100 >= 80 &&
                    (currentProjectInvoiced / currentProjectGoal) * 100 < 100
                  ? "orange"
                  : "green"
              }
            />
            <p className="customerProductionContainer">
              <span
                style={{
                  color:
                    (currentProjectInvoiced / currentProjectGoal) * 100 < 80
                      ? theme.colors.red[6]
                      : (currentProjectInvoiced / currentProjectGoal) * 100 >=
                          80 &&
                        (currentProjectInvoiced / currentProjectGoal) * 100 <
                          100
                      ? theme.colors.orange[6]
                      : theme.colors.green[6],
                }}
              >
                {currentProjectInvoiced}
              </span>
              {`/${currentProjectGoal}`}
            </p>
          </div>
        </div>
      </div>
      <CustomDivider />
      <CustomButton
        handleClick={() => openURL(getPriceListURL())}
        icon={<IconCurrencyEuro />}
        label={"Grille tarifaire"}
        extraStyle={{
          width: "fit-content",
        }}
      />
    </Card>
  );
};

export default CustomerRelationship;
