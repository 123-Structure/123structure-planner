import { Card } from "@mantine/core";
import {
  IconAddressBook,
  IconCurrencyEuro,
  IconMail,
  IconMap2,
  IconPhone,
  IconUser,
} from "@tabler/icons";
import React from "react";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import CustomButton from "../../../../utils/CustomButton";
import CustomTitle from "../../../../utils/CustomTitle";
import CustomerItem from "./CustomerItem";

interface ICustomerIdentityProps {
  color: string;
  customer: ICustomer;
}

const CustomerIdentity = (props: ICustomerIdentityProps) => {
  const openURL = (url: string) => {
    window.open(url, "_blank");
  };

  const sendEmailorCallPhone = (id: string) => {
    const anchor = document.querySelector(id) as HTMLAnchorElement;
    if (anchor !== null) {
      anchor.click();
    }
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="customerIdentity"
    >
      <CustomTitle
        flexStart={true}
        icon={<IconAddressBook size={24} />}
        title={props.customer.name}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "8px",
        }}
      >
        <div>
          <img
            className="customerLogo"
            src={props.customer.logo}
            alt={props.customer.name}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            paddingLeft: "8px",
          }}
        >
          <CustomerItem
            isClickableItem={true}
            color={props.color}
            label={`${props.customer.address}, ${props.customer.cp} ${props.customer.city}`}
            icon={
              <IconMap2
                size={24}
                color={props.color === "yellow" ? "black" : "white"}
              />
            }
            handleClick={() =>
              openURL(
                `https://www.google.fr/maps/search/${props.customer.address}, ${props.customer.cp} ${props.customer.city}`
              )
            }
          />
          <CustomerItem
            isClickableItem={true}
            color={props.color}
            label={props.customer.email}
            icon={
              <IconMail
                size={24}
                color={props.color === "yellow" ? "black" : "white"}
              />
            }
            handleClick={() =>
              sendEmailorCallPhone(
                `#sendEmail_${props.customer.name
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}`
              )
            }
          />
          <a
            className="sendEmail"
            id={`sendEmail_${props.customer.name
              .replaceAll(" ", "_")
              .replaceAll(".", "")}`}
            href={`mailto:${props.customer.email}`}
          />

          <CustomerItem
            isClickableItem={true}
            color={props.color}
            label={props.customer.phone}
            icon={
              <IconPhone
                size={24}
                color={props.color === "yellow" ? "black" : "white"}
              />
            }
            handleClick={() =>
              sendEmailorCallPhone(
                `#callPhone_${props.customer.name
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}`
              )
            }
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
            color={props.color}
            label={`${contact.firstName} ${contact.lastName}`}
            extraStyle={{
              width: "fit-content",
            }}
          />
        ))}
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
        color={props.color}
        label={"Grille tarifaire"}
        extraStyle={{
          width: "fit-content",
        }}
      />
      {/* </div> */}
    </Card>
  );
};

export default CustomerIdentity;
