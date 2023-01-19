import { Card, MultiSelect } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import {
  useCustomer,
  useUpdateCustomer,
} from "../../../../../context/CustomerContext";
import {
  useRessources,
  useUpdateRessources,
} from "../../../../../context/RessourceContext";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import { IRessource } from "../../../../../data/interfaces/IRessource";
import { TRole } from "../../../../../data/types/TRole";
import CustomerItem from "./CustomerItem";

interface ICustomerRelationshipProps {
  color: string;
  customer: ICustomer;
}

const CustomerRelationship = (props: ICustomerRelationshipProps) => {
  const ressources = useRessources();
  const customers = useCustomer();
  const setCustomers = useUpdateCustomer();

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

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="customerRelationship"
    >
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
        placeholder="Rôle non défini"
        onChange={(newCommercial) => handleCommercialChange(newCommercial)}
        searchable
        nothingFound="Aucun résultat"
        clearable
      />
    </Card>
  );
};

export default CustomerRelationship;
