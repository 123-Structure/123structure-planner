import { Card } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconAddressBook,
  IconMail,
  IconMap2,
  IconPhone,
  IconUser,
} from "@tabler/icons";
import React, { useState } from "react";
import {
  useCustomer,
  useUpdateCustomer,
} from "../../../../../context/CustomerContext";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import {
  isCPFormat,
  isEmailFormat,
  isPhoneFormat,
} from "../../../../../utils/validateInput";
import CustomButton from "../../../../utils/CustomButton";
import CustomTitle from "../../../../utils/CustomTitle";
import EditModeToggle from "../../../../utils/EditModeToggle";
import CustomerItem from "./CustomerItem";

interface ICustomerIdentityProps {
  customer: ICustomer;
}

const CustomerIdentity = (props: ICustomerIdentityProps) => {
  const [editCustomerIdentity, setEditCustomerIdentity] = useState(false);
  const [address, setAddress] = useState(props.customer.address);
  const [cp, setCp] = useState(props.customer.cp);
  const [city, setCity] = useState(props.customer.city);
  const [email, setEmail] = useState(props.customer.email);
  const [phone, setPhone] = useState(props.customer.phone);

  const customers = useCustomer();
  const setCustomers = useUpdateCustomer();

  const openURL = (url: string) => {
    window.open(url, "_blank");
  };

  const sendEmailOrCallPhone = (id: string) => {
    const anchor = document.querySelector(id) as HTMLAnchorElement;
    if (anchor !== null) {
      anchor.click();
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
    changedCustomer[0].address = address;
    changedCustomer[0].cp = cp;
    changedCustomer[0].city = city;
    changedCustomer[0].email = email;
    changedCustomer[0].phone = phone;
    setCustomers(newCustomer);
    showNotification({
      title: `✅ Fiche client sauvegardé`,
      message: `La fiche client ${props.customer.name} est mise à jour`,
      color: "green",
    });
    setEditCustomerIdentity(false);
  };

  const handleCancelClick = () => {
    setAddress(props.customer.address);
    setCp(props.customer.cp);
    setCity(props.customer.city);
    setEmail(props.customer.email);
    setPhone(props.customer.phone);
    showNotification({
      title: `⛔ Fiche client non sauvegardé`,
      message: `Les modifications pour ${props.customer.name} sont annulées`,
      color: "red",
    });
    setEditCustomerIdentity(false);
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="customerIdentity"
    >
      <div className="customerIdentityTitle">
        <CustomTitle
          flexStart={true}
          icon={<IconAddressBook size={24} />}
          title={props.customer.name}
        />
        <EditModeToggle
          disabled={
            !isCPFormat(cp) || !isEmailFormat(email) || !isPhoneFormat(phone)
          }
          editMode={editCustomerIdentity}
          editLabel=""
          validateLabel=""
          cancelLabel=""
          handleEditClick={() => setEditCustomerIdentity(true)}
          handleValideClick={handleValideClick}
          handleCancelClick={handleCancelClick}
        />
      </div>
      <div className="customerIdentityContainer">
        <div>
          <img
            className="customerLogo"
            src={props.customer.logo}
            alt={props.customer.name}
          />
        </div>
        <div
          className="customerItemContainer"
          style={{
            paddingLeft: "8px",
          }}
        >
          <CustomerItem
            editMode={editCustomerIdentity}
            label={[address, cp, city]}
            updateLabel={[setAddress, setCp, setCity]}
            icon={<IconMap2 size={24} color="black" />}
            color="yellow"
            handleClick={() =>
              openURL(
                `https://www.google.fr/maps/search/${props.customer.address}, ${props.customer.cp} ${props.customer.city}`
              )
            }
            errorMessage={[
              isCPFormat(cp) ? "" : ".",
              isCPFormat(cp) ? "" : "Code postale de 5 chiffres",
              isCPFormat(cp) ? "" : ".",
            ]}
          />
          <CustomerItem
            editMode={editCustomerIdentity}
            label={[email]}
            updateLabel={[setEmail]}
            icon={<IconMail size={24} color="black" />}
            color="yellow"
            handleClick={() =>
              sendEmailOrCallPhone(
                `#sendEmail_${props.customer.name
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}`
              )
            }
            errorMessage={[
              isEmailFormat(email) ? "" : "Format d'email invalide",
            ]}
          />
          <a
            className="sendEmail"
            id={`sendEmail_${props.customer.name
              .replaceAll(" ", "_")
              .replaceAll(".", "")}`}
            href={`mailto:${props.customer.email}`}
          />

          <CustomerItem
            editMode={editCustomerIdentity}
            label={[phone]}
            updateLabel={[setPhone]}
            icon={<IconPhone size={24} color="black" />}
            color="yellow"
            handleClick={() =>
              sendEmailOrCallPhone(
                `#callPhone_${props.customer.name
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}`
              )
            }
            errorMessage={[
              isPhoneFormat(phone)
                ? ""
                : "Format de numéro de téléphone invalide",
            ]}
          />
          <a
            className="callPhone"
            id={`callPhone_${props.customer.name
              .replaceAll(" ", "_")
              .replaceAll(".", "")}`}
            href={`tel:${props.customer.phone
              .replaceAll(" ", "")
              .replaceAll(".", "")}`}
          />
        </div>
      </div>
      <h3>Interlocuteurs :</h3>
      <div className="contactContainer">
        {props.customer.contact.map((contact, index) => (
          <CustomButton
            key={index}
            handleClick={() => console.log("test")}
            icon={<IconUser />}
            label={`${contact.firstName} ${contact.lastName}`}
            extraStyle={{
              width: "fit-content",
            }}
          />
        ))}
      </div>
    </Card>
  );
};

export default CustomerIdentity;
