import {
  IconAddressBook,
  IconCalendarEvent,
  IconMail,
  IconMap2,
  IconPhone,
  IconSearch,
  IconUser,
} from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import { IDataFromAPI } from "../../../../../data/interfaces/IDataFromAPI";
import { Card } from "@mantine/core";

interface ISearchBarItemProps {
  action: IDataFromAPI;
  result: string;
}

const SearchBarItem = (props: ISearchBarItemProps) => {
  const [customer, setCustomer] = useState<ICustomer>();
  const [resultType, setResultType] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const handleGetCustomerById = async (id: string) => {
      const APIBaseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${APIBaseUrl}/api/customers/${id}`, {
        method: "GET",
      });
      const customer = (await response.json()) as ICustomer;
      setCustomer(customer);
    };

    const handleResultProperty = (result: string) => {
      const splitArray = result.split(": ");
      const property = splitArray[0];
      const value = splitArray.slice(1).join("");
      setResultType(property);
      setTitle(
        property.includes("appointment") && property.includes("content")
          ? "Compte-rendu de RDV"
          : value
      );
    };

    if (props.action.type === "customer") {
      handleGetCustomerById(props.action.id);
    }
    handleResultProperty(props.result);
  }, []);

  const handleIcon = (type: string) => {
    if (type === "category" || type === "group" || type === "name") {
      return <IconAddressBook size={"1.8rem"} />;
    }

    if (type.includes("location")) {
      return <IconMap2 size={"1.8rem"} />;
    }

    if (type.includes("email")) {
      return <IconMail size={"1.8rem"} />;
    }

    if (type.includes("phone")) {
      return <IconPhone size={"1.8rem"} />;
    }

    if (type.includes("contact") || type.includes("commercial")) {
      return <IconUser size={"1.8rem"} />;
    }

    if (type.includes("appointment")) {
      return <IconCalendarEvent size={"1.8rem"} />;
    }

    return <IconSearch size={"1.8rem"} />;
  };

  const handleSubtitle = (type: string) => {
    if (type === "category") {
      return `${customer?.name} - Catégorie de client`;
    }
    if (type === "group") {
      return `${customer?.name} - Groupe de client`;
    }
    if (type === "category" || type === "group" || type === "name") {
      return "Nom de client";
    }

    if (type.startsWith("location")) {
      return `${customer?.name} - Localisation`;
    }

    if (type.includes("location") && type.includes("appointment")) {
      return `${customer?.name} - Adresse d'un rendez-vous`;
    }

    if (type.startsWith("email")) {
      return `${customer?.name} - Email principal`;
    }

    if (type.includes("email") && type.includes("contact")) {
      const contactIndex = parseInt(type.split(".")[1]);
      const contactName = customer
        ? `${customer.contact[contactIndex].firstName} ${customer.contact[contactIndex].lastName}`
        : "";
      return `${customer?.name} - Email de ${contactName}`;
    }

    if (type.startsWith("phone")) {
      return `${customer?.name} - N°de téléphone principal`;
    }

    if (type.includes("phone") && type.includes("contact")) {
      const contactIndex = parseInt(type.split(".")[1]);
      const contactName = customer
        ? `${customer.contact[contactIndex].firstName} ${customer.contact[contactIndex].lastName}`
        : "";
      return `${customer?.name} - N° de téléphone de ${contactName}`;
    }

    if (type.includes("contact")) {
      return `${customer?.name} - Fiche de contact`;
    }

    if (type.includes("commercial")) {
      return `${customer?.name} - Commercial référent`;
    }

    if (type.includes("appointment") && type.includes("content")) {
      const appointmentIndex = parseInt(type.split(".")[1]);
      const appointmentName = customer
        ? `${customer.appointment[appointmentIndex].title} (${new Date(
            customer.appointment[appointmentIndex].date
          ).toLocaleDateString("fr")})`
        : "";
      return `${customer?.name} - ${appointmentName}`;
    }

    return type;
  };

  return (
    <Card
      className="searchBarItem"
      shadow="sm"
      p="md"
      radius="md"
      withBorder
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: "16px",
        cursor: "pointer",
      }}
    >
      {handleIcon(resultType)}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "16px",
        }}
      >
        <p
          style={{
            margin: 0,
          }}
        >
          {title}
        </p>
        <p
          style={{
            margin: 0,
            fontStyle: "italic",
            color: "gray",
          }}
        >
          {handleSubtitle(resultType)}
        </p>
      </div>
    </Card>
  );
};

export default SearchBarItem;
