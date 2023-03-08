import {
  Badge,
  Button,
  Group,
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
import React, { useState } from "react";
import { IContact } from "../../../../data/interfaces/IContact";
import "../../../../assets/style/Contact.css";
import CustomTitle from "../../../utils/CustomTitle";
import CustomerItem from "./CustomerItem";
import { useMediaQuery } from "@mantine/hooks";
import EditModeToggle from "../../../utils/EditModeToggle";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { showNotification } from "@mantine/notifications";
import { isEmailFormat, isPhoneFormat } from "../../../../utils/validateInput";
import { useCustomers } from "../../../../context/CustomerContext";

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
  const [phone1, setPhone1] = useState(props.currentContact.phone1);
  const [phone2, setPhone2] = useState(props.currentContact.phone2);

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const { customers, updateCustomers } = useCustomers();

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

  const handleValideClick = async () => {
    const changedCustomer = customers.customersList.filter(
      (customer) => customer.name === props.customer.name
    )[0];

    const changedContact = changedCustomer.contact.filter(
      (contact) =>
        contact.category === props.currentContact.category &&
        contact.email === props.currentContact.email &&
        contact.phone1 === props.currentContact.phone1 &&
        contact.phone2 === props.currentContact.phone2
    )[0];

    changedContact.firstName = firstName;
    changedContact.lastName = lastName;
    changedContact.gender = gender;
    changedContact.category = category;
    changedContact.email = email;
    changedContact.phone1 = phone1;
    changedContact.phone2 = phone2;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/customers/${
        changedCustomer._id as string
      }`,
      {
        method: "PATCH",
        body: JSON.stringify({ contact: changedCustomer.contact }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      showNotification({
        title: `⛔ Erreur serveur`,
        message: data.error,
        color: "red",
      });
    }

    updateCustomers({
      type: "UPDATE_CUSTOMER",
      payload: {
        id: changedCustomer._id as string,
        customer: changedCustomer,
      },
    });

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
    setPhone1(props.currentContact.phone1);
    setPhone2(props.currentContact.phone2);

    showNotification({
      title: `⛔ Fiche client non sauvegardée`,
      message: `Les modifications pour ${props.customer.name} sont annulées`,
      color: "red",
    });
    setEditContact(false);
  };

  return (
    <>
      <Modal
        fullScreen={smallScreen}
        centered
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
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
              disabled={
                !isEmailFormat(email) ||
                !isPhoneFormat(phone1) ||
                (!isPhoneFormat(phone2) && phone2 !== "") ||
                firstName.length < 1 ||
                lastName.length < 1
              }
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
                <Group>
                  <Radio
                    value="M."
                    label="
                    M."
                  />
                  <Radio value="Mme" label="Mme" />
                </Group>
              </Radio.Group>
              <TextInput
                label={"Prénom"}
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.currentTarget.value);
                }}
                error={firstName.length < 1 ? "Prénom manquant" : ""}
              />
              <TextInput
                label={"Nom"}
                value={lastName}
                onChange={(event) => {
                  setLastName(event.currentTarget.value);
                }}
                error={lastName.length < 1 ? "Nom manquant" : ""}
              />
            </div>
          ) : (
            <></>
          )}

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
          {(email !== "-" && email !== "") || editContact ? (
            <CustomerItem
              editMode={editContact}
              inputType="text"
              color="yellow"
              value={[email]}
              updateValue={[setEmail]}
              icon={<IconMail size={24} color="black" />}
              handleClick={() =>
                sendEmailOrCallPhone(
                  `#sendEmail_${firstName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}_${lastName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}`
                )
              }
              errorMessage={[
                isEmailFormat(email) ? "" : "Format d'email invalide",
              ]}
            />
          ) : (
            <></>
          )}
          {(phone1 !== "-" && phone1 !== "") || editContact ? (
            <CustomerItem
              editMode={editContact}
              inputType="text"
              color="yellow"
              value={[phone1]}
              updateValue={[setPhone1]}
              icon={<IconPhone size={24} color="black" />}
              handleClick={() =>
                sendEmailOrCallPhone(
                  `#callPhone_1${firstName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}_${lastName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}`
                )
              }
              errorMessage={[
                isPhoneFormat(phone1)
                  ? ""
                  : "Format de numéro de téléphone invalide",
              ]}
            />
          ) : (
            <></>
          )}
          {(phone2 !== "-" && phone2 !== "") || editContact ? (
            <CustomerItem
              editMode={editContact}
              inputType="text"
              color="yellow"
              value={[phone2]}
              updateValue={[setPhone2]}
              icon={<IconPhone size={24} color="black" />}
              handleClick={() =>
                sendEmailOrCallPhone(
                  `#callPhone_2${firstName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}_${lastName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}`
                )
              }
              errorMessage={[
                isPhoneFormat(phone2)
                  ? ""
                  : "Format de numéro de téléphone invalide",
              ]}
            />
          ) : (
            <></>
          )}
        </div>
      </Modal>
      <Menu withArrow trigger="hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Button
            className={`contactContentMenu contact_${props.customer.name.replaceAll(
              " ",
              "_"
            )}_${props.currentContact.firstName}_${
              props.currentContact.lastName
            }`}
            color={props.color}
            style={{
              ...props.extraStyle,
              color:
                props.color != undefined && props.color !== "yellow"
                  ? "white"
                  : "black",
            }}
            onClick={() => setOpenContact(true)}
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
            {props.customer.name}
          </Menu.Item>
          <Menu.Item icon={<IconHome2 size={14} />}>{category}</Menu.Item>
          {props.currentContact.email !== "-" &&
          props.currentContact.email !== "" ? (
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
          ) : (
            <></>
          )}
          {props.currentContact.phone1 !== "-" &&
          props.currentContact.phone1 !== "" ? (
            <Menu.Item
              icon={<IconPhone size={14} />}
              onClick={() =>
                sendEmailOrCallPhone(
                  `#callPhone_1${props.currentContact.firstName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}_${props.currentContact.lastName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}`
                )
              }
            >
              {props.currentContact.phone1}
            </Menu.Item>
          ) : (
            <></>
          )}
          {props.currentContact.phone2 !== "-" &&
          props.currentContact.phone2 !== "" ? (
            <Menu.Item
              icon={<IconPhone size={14} />}
              onClick={() =>
                sendEmailOrCallPhone(
                  `#callPhone_2${props.currentContact.firstName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}_${props.currentContact.lastName
                    .replaceAll(" ", "_")
                    .replaceAll(".", "")}`
                )
              }
            >
              {props.currentContact.phone2}
            </Menu.Item>
          ) : (
            <></>
          )}
        </Menu.Dropdown>
      </Menu>

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
        id={`callPhone_1${props.currentContact.firstName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}_${props.currentContact.lastName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}`}
        href={`tel:${props.currentContact.phone1
          .replaceAll(" ", "")
          .replaceAll(".", "")}`}
      />

      <a
        className="callPhone"
        id={`callPhone_2${props.currentContact.firstName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}_${props.currentContact.lastName
          .replaceAll(" ", "_")
          .replaceAll(".", "")}`}
        href={`tel:${props.currentContact.phone2
          .replaceAll(" ", "")
          .replaceAll(".", "")}`}
      />
    </>
  );
};

export default Contact;
