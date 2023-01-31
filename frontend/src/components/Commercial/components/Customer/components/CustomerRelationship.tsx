import { Card, MultiSelect, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconArrowRight,
  IconCalendar,
  IconCurrencyEuro,
  IconHomeDollar,
  IconTarget,
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
import CustomTitle from "../../../../utils/CustomTitle";
import EditModeToggle from "../../../../utils/EditModeToggle";
import CustomerItem from "./CustomerItem";

interface ICustomerRelationshipProps {
  customer: ICustomer;
}

const CustomerRelationship = (props: ICustomerRelationshipProps) => {
  const [editCustomerRelationship, setEditCustomerRelationship] =
    useState(false);

  const [projectGoal, setProjectGoal] = useState(props.customer.projectGoal);

  const ressources = useRessources();
  const customers = useCustomer();
  const setCustomers = useUpdateCustomer();

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

  const openURL = (url: string) => {
    window.open(url, "_blank");
  };

  const handleCommercialChange = (newCommercial: string[] | null) => {
    const newCustomers = [...customers];

    const changedCustomer = newCustomers.filter(
      (customer) => customer.name === props.customer.name
    );

    const newValue = ressources.filter((ressource) =>
      newCommercial?.includes(`${ressource.firstName} ${ressource.lastName}`)
    );

    changedCustomer[0].commercial = newValue;

    setCustomers(newCustomers);
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
    changedCustomer[0].projectGoal = projectGoal;

    setCustomers(newCustomer);
    showNotification({
      title: `✅ Fiche client sauvegardé`,
      message: `La fiche client ${props.customer.name} est mise à jour`,
      color: "green",
    });
    setEditCustomerRelationship(false);
  };

  const handleCancelClick = () => {
    setProjectGoal(props.customer.projectGoal);

    showNotification({
      title: `⛔ Fiche client non sauvegardé`,
      message: `Les modifications pour ${props.customer.name} sont annulées`,
      color: "red",
    });
    setEditCustomerRelationship(false);
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="customerRelationship"
    >
      <div className="customerIdentityTitle">
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
            editMode={false}
            label={smallScreen ? [""] : ["Commercial référent :"]}
            icon={<IconUser size={24} color="black" />}
            color="yellow"
          />
          <MultiSelect
            data={ressources
              .filter((ressource) => ressource.role.includes("Commercial"))
              .map(
                (commercial) => `${commercial.firstName} ${commercial.lastName}`
              )}
            value={props.customer.commercial.map(
              (commercial) => `${commercial.firstName} ${commercial.lastName}`
            )}
            variant="unstyled"
            placeholder="Commercial non défini"
            onChange={(newCommercial) => handleCommercialChange(newCommercial)}
            searchable={!smallScreen}
            nothingFound="Aucun résultat"
            clearable
          />
        </div>
        <div className="customerItemTitle">
          <CustomerItem
            editMode={false}
            label={["Dernière visite :"]}
            icon={<IconCalendar size={24} color="black" />}
            color="yellow"
          />
          <p>{getLastAppointment()}</p>
        </div>
        <div className="customerItemTitle">
          <CustomerItem
            editMode={editCustomerRelationship}
            label={[editCustomerRelationship ? projectGoal : "Objectif :"]}
            icon={<IconHomeDollar size={24} color="black" />}
            color="yellow"
          />
          {editCustomerRelationship ? (
            <p>Dossier(s)</p>
          ) : (
            <p>{props.customer.projectGoal} Dossier(s)</p>
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          borderTop: "2px dotted #dfe2e6",
          margin: "8px 0 8px 0",
        }}
      />
      <CustomButton
        handleClick={() => openURL(props.customer.priceList)}
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
