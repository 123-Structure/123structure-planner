import { Badge, Button, Menu, Modal } from "@mantine/core";
import { IconAddressBook, IconMail, IconPhone, IconUser } from "@tabler/icons";
import React, { useState } from "react";
import { IContact } from "../../../../data/interfaces/IContact";
import "../../../../assets/style/Contact.css";
import CustomTitle from "../../../utils/CustomTitle";
import CustomerItem from "./CustomerItem";
import CustomButton from "../../../utils/CustomButton";

interface IContactProps {
  color?: string;
  extraStyle?: React.CSSProperties;
  customerName: string;
  contact: IContact;
}

const Contact = (props: IContactProps) => {
  const [openContact, setOpenContact] = useState(false);

  const sendEmailOrCallPhone = (id: string) => {
    const anchor = document.querySelector(id) as HTMLAnchorElement;
    if (anchor !== null) {
      anchor.click();
    }
  };

  return (
    <>
      <div className="contactContentModal">
        <Modal
          fullScreen
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={openContact}
          onClose={() => setOpenContact(false)}
          padding={"xl"}
          title={
            <CustomTitle
              icon={<IconUser size={32} />}
              title={`${props.contact.gender} ${props.contact.firstName} ${props.contact.lastName}`}
            />
          }
        >
          <div className="contactContentContainer">
            <CustomerItem
              color="yellow"
              value={[props.customerName]}
              icon={<IconAddressBook size={24} color="black" />}
            />
            <CustomerItem
              color="yellow"
              value={[props.contact.email]}
              icon={<IconMail size={24} color="black" />}
              handleClick={() =>
                sendEmailOrCallPhone(
                  `#sendEmail_${props.contact.firstName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}_${props.contact.lastName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}`
                )
              }
            />
            <CustomerItem
              color="yellow"
              value={[props.contact.phone]}
              icon={<IconPhone size={24} color="black" />}
              handleClick={() =>
                sendEmailOrCallPhone(
                  `#callPhone_${props.contact.firstName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}_${props.contact.lastName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}`
                )
              }
            />
          </div>
        </Modal>

        <CustomButton
          handleClick={() => setOpenContact(true)}
          icon={<IconUser />}
          label={`${props.contact.gender} ${props.contact.firstName} ${props.contact.lastName}`}
        />
      </div>

      <Menu withArrow trigger="hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Button
            className="contactContentMenu"
            color={props.color}
            style={{
              ...props.extraStyle,
              color:
                props.color != undefined && props.color !== "yellow"
                  ? "white"
                  : "black",
            }}
          >
            <div style={{ marginRight: "8px" }}>
              <IconUser />
            </div>
            {`${props.contact.gender} ${props.contact.firstName} ${props.contact.lastName}`}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Coordonnées</Menu.Label>
          <Menu.Item icon={<IconAddressBook size={14} />}>
            {props.customerName}
          </Menu.Item>
          <Menu.Item
            icon={<IconMail size={14} />}
            onClick={() =>
              sendEmailOrCallPhone(
                `#sendEmail_${props.contact.firstName
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}_${props.contact.lastName
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}`
              )
            }
          >
            {props.contact.email}
          </Menu.Item>
          <Menu.Item
            icon={<IconPhone size={14} />}
            onClick={() =>
              sendEmailOrCallPhone(
                `#callPhone_${props.contact.firstName
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}_${props.contact.lastName
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}`
              )
            }
          >
            {props.contact.phone}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <a
        className="sendEmail"
        id={`sendEmail_${props.contact.firstName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}_${props.contact.lastName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}`}
        href={`mailto:${props.contact.email}`}
      />

      <a
        className="callPhone"
        id={`callPhone_${props.contact.firstName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}_${props.contact.lastName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}`}
        href={`tel:${props.contact.phone
          .replaceAll(" ", "")
          .replaceAll(".", "")}`}
      />
    </>
  );
};

export default Contact;
