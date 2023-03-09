import { ICustomer } from "../../../data/interfaces/ICustomer";

export const handleSubtitle = (
  customer: ICustomer | undefined,
  type: string
) => {
  if (customer !== undefined) {
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
      return `${customer?.name} - N° de téléphone principal`;
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

    if (type.includes("appointment") && type.includes("title")) {
      const appointmentIndex = parseInt(type.split(".")[1]);
      const appointmentDate = customer
        ? `${new Date(
            customer.appointment[appointmentIndex].date
          ).toLocaleDateString("fr")}`
        : "";
      return `${customer?.name} - ${appointmentDate}`;
    }

    return type;
  }
};
