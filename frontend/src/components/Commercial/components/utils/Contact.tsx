import {
  Badge,
  Button,
  Menu,
  Modal,
  Radio,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAddressBook,
  IconHome2,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { IContact } from "../../../../data/interfaces/IContact";
import "../../../../assets/style/Contact.css";
import CustomTitle from "../../../utils/CustomTitle";
import CustomerItem from "./CustomerItem";
import CustomButton from "../../../utils/CustomButton";
import { useMediaQuery } from "@mantine/hooks";
import EditModeToggle from "../../../utils/EditModeToggle";
import {
  useCustomer,
  useUpdateCustomer,
} from "../../../../context/CustomerContext";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { showNotification } from "@mantine/notifications";
import { isEmailFormat, isPhoneFormat } from "../../../../utils/validateInput";

interface IContactProps {
  color?: string;
  extraStyle?: React.CSSProperties;
  editMode?: boolean;
  customer: ICustomer;
  currentContact: IContact;
}

const Contact = (props: IContactProps) => {
  const [editContact, setEditContact] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const [firstName, setFirstName] = useState(props.currentContact.firstName);
  const [lastName, setLastName] = useState(props.currentContact.lastName);
  const [gender, setGender] = useState(props.currentContact.gender);
  const [category, setCategory] = useState(props.currentContact.category);
  const [email, setEmail] = useState(props.currentContact.email);
  const [phone, setPhone] = useState(props.currentContact.phone);

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const customers = useCustomer();
  const setCustomers = useUpdateCustomer();

  const sendEmailOrCallPhone = (id: string) => {
    const anchor = document.querySelector(id) as HTMLAnchorElement;
    if (anchor !== null) {
      anchor.click();
    }
  };

  const selectValue = (
    editMode: boolean,
    currentValue: string | undefined,
    label: string[],
    defaultValue: string[]
  ) => {
    if (editMode) {
      return label.reduce((acc, l) => {
        l === currentValue ? acc.push(l + "*") : acc.push(l);
        return acc;
      }, [] as string[]);
    } else {
      return defaultValue;
    }
  };

  const handleValideClick = () => {
    const newCustomer = [...customers];
    const changedContact = newCustomer
      .filter((customer) => customer.name === props.customer.name)[0]
      .contact.filter(
        (contact) =>
          contact.category === props.currentContact.category &&
          contact.email === props.currentContact.email &&
          contact.phone === props.currentContact.phone
      );

    changedContact[0].firstName = firstName;
    changedContact[0].lastName = lastName;
    changedContact[0].gender = gender;
    changedContact[0].category = category;
    changedContact[0].email = email;
    changedContact[0].phone = phone;

    setCustomers(newCustomer);
    showNotification({
      title: `✅ Fiche client sauvegardée`,
      message: `La fiche client ${props.customer.name} est mise à jour`,
      color: "green",
    });
    setEditContact(false);
  };

  const handleCancelClick = () => {
    setCategory(props.currentContact.category);
    setEmail(props.currentContact.email);
    setPhone(props.currentContact.phone);

    showNotification({
      title: `⛔ Fiche client non sauvegardée`,
      message: `Les modifications pour ${props.customer.name} sont annulées`,
      color: "red",
    });
    setEditContact(false);
  };

  return (
    <>
      <div className="contactContentModal">
        <Modal
          fullScreen={smallScreen}
          centered
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={openContact}
          onClose={() => {
            setOpenContact(false);
            editContact ? handleCancelClick() : "";
          }}
          padding={"xl"}
          title={
            <div className="contactModalTitle">
              <CustomTitle
                flexStart={true}
                icon={<IconUser size={24} />}
                title={`${props.currentContact.gender} ${props.currentContact.firstName} ${props.currentContact.lastName}`}
              />
              <EditModeToggle
                disabled={!isEmailFormat(email) || !isPhoneFormat(phone)}
                editMode={editContact}
                editLabel=""
                validateLabel=""
                cancelLabel=""
                handleEditClick={() => setEditContact(true)}
                handleValideClick={handleValideClick}
                handleCancelClick={handleCancelClick}
              />
            </div>
          }
        >
          <div className="contactContentContainer">
            <div className="contactCustomerNameBadge">
              <Badge color="dark" variant="filled">
                {props.customer.name}
              </Badge>
            </div>
            {editContact ? (
              <div className="contactIdentityContainer">
                <Radio.Group
                  name="favoriteFramework"
                  label="M. / Mme"
                  value={gender}
                  onChange={(val) => setGender(val as "M." | "Mme")}
                >
                  <Radio
                    value="M."
                    label="
                    M."
                  />
                  <Radio value="Mme" label="Mme" />
                </Radio.Group>
                <TextInput
                  label={"Prénom"}
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.currentTarget.value);
                  }}
                />
                <TextInput
                  label={"Nom"}
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.currentTarget.value);
                  }}
                />
              </div>
            ) : (
              <></>
            )}

            {/* <CustomerItem
              color="yellow"
              value={[props.customer.name]}
              icon={<IconAddressBook size={24} color="black" />}
              extraStyle={{ fontWeight: "bold", fontStyle: "italic" }}
            /> */}
            <CustomerItem
              editMode={editContact}
              inputType="select"
              color="yellow"
              value={selectValue(
                editContact,
                category,
                [
                  "Direction",
                  "Commerce",
                  "Conduite de travaux",
                  "Assistance technique",
                  "Secrétariat",
                  "Autre",
                ],
                [category]
              )}
              updateValue={[setCategory]}
              icon={<IconHome2 size={24} color="black" />}
            />
            <CustomerItem
              editMode={editContact}
              inputType="text"
              color="yellow"
              value={[email]}
              updateValue={[setEmail]}
              icon={<IconMail size={24} color="black" />}
              handleClick={() =>
                sendEmailOrCallPhone(
                  `#sendEmail_${props.currentContact.firstName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}_${props.currentContact.lastName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}`
                )
              }
              errorMessage={[
                isEmailFormat(email) ? "" : "Format d'email invalide",
              ]}
            />
            <CustomerItem
              editMode={editContact}
              inputType="text"
              color="yellow"
              value={[phone]}
              updateValue={[setPhone]}
              icon={<IconPhone size={24} color="black" />}
              handleClick={() =>
                sendEmailOrCallPhone(
                  `#callPhone_${props.currentContact.firstName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}_${props.currentContact.lastName
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
          </div>
        </Modal>

        <CustomButton
          handleClick={() => setOpenContact(true)}
          icon={<IconUser />}
          label={`${props.currentContact.gender} ${props.currentContact.firstName} ${props.currentContact.lastName}`}
        />
      </div>

      {/* <Menu withArrow trigger="hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Button
            className="contactContentMenu"
            color={props.color}
            style={{
              ...props.extraStyle,
              display: smallScreen || props.editMode ? "none" : "block",
              color:
                props.color != undefined && props.color !== "yellow"
                  ? "white"
                  : "black",
            }}
          >
            <div style={{ marginRight: "8px" }}>
              <IconUser />
            </div>
            {`${props.currentContact.gender} ${props.currentContact.firstName} ${props.currentContact.lastName}`}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Coordonnées</Menu.Label>
          <Menu.Item icon={<IconAddressBook size={14} />}>
            {props.customerName}
          </Menu.Item>
          <Menu.Item icon={<IconHome2 size={14} />}>
            {props.currentContact.category}
          </Menu.Item>
          <Menu.Item
            icon={<IconMail size={14} />}
            onClick={() =>
              sendEmailOrCallPhone(
                `#sendEmail_${props.currentContact.firstName
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}_${props.currentContact.lastName
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}`
              )
            }
          >
            {props.currentContact.email}
          </Menu.Item>
          <Menu.Item
            icon={<IconPhone size={14} />}
            onClick={() =>
              sendEmailOrCallPhone(
                `#callPhone_${props.currentContact.firstName
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}_${props.currentContact.lastName
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}`
              )
            }
          >
            {props.currentContact.phone}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu> */}

      <a
        className="sendEmail"
        id={`sendEmail_${props.currentContact.firstName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}_${props.currentContact.lastName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}`}
        href={`mailto:${props.currentContact.email}`}
      />

      <a
        className="callPhone"
        id={`callPhone_${props.currentContact.firstName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}_${props.currentContact.lastName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}`}
        href={`tel:${props.currentContact.phone
          .replaceAll(" ", "")
          .replaceAll(".", "")}`}
      />
    </>
  );
};

export default Contact;
