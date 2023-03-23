import {
  ActionIcon,
  Badge,
  Group,
  Modal,
  Radio,
  Select,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconCirclePlus, IconUser, IconX } from "@tabler/icons";
import { useState } from "react";
import { IContact } from "../../../../../data/interfaces/IContact";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import { TContactCategories } from "../../../../../data/types/TContactCategories";
import CustomButton from "../../../../utils/CustomButton";
import CustomTitle from "../../../../utils/CustomTitle";
import Contact from "../../utils/Contact";
import validator from "validator";
import { isPhoneFormat } from "../../../../../utils/validateInput";
import { useCustomer } from "../../../../../hooks/Customer/useCustomer";
import { useUpdateCustomer } from "../../../../../hooks/Customer/useUpdateCustomer";
import { useAuth } from "../../../../../hooks/Auth/useAuth";
import { useUserData } from "../../../../../hooks/Auth/useUserData";

interface ICustomerContactProps {
  contact: IContact[];
  customer: ICustomer;
  editMode: boolean;
}

const CustomerContact = (props: ICustomerContactProps) => {
  const [openNewContact, setOpenNewContact] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const customer = useCustomer();
  const setCustomer = useUpdateCustomer();
  const { auth } = useAuth();
  const userData = useUserData();

  //generates random id;
  const guid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  };

  const handleCloseModal = () => {
    setOpenNewContact(false);
    setFirstName("");
    setLastName("");
    setGender("");
    setCategory("");
    setEmail("");
    setPhone1("");
    setPhone2("");

    setGenderError("");
    setFirstNameError("");
    setLastNameError("");
    setCategoryError("");
  };

  const handleValideClick = async () => {
    if (auth.user) {
      if (
        gender !== "" &&
        firstName !== "" &&
        lastName !== "" &&
        category !== ""
      ) {
        if (customer !== undefined) {
          const changedCustomer = customer;

          const newContact: IContact = {
            _id: guid(),
            firstName: firstName,
            lastName: lastName,
            gender: gender as "M." | "Mme",
            category: category as TContactCategories,
            email: email === "-" || email === "" ? "-" : email,
            phone1: phone1 === "-" || phone1 === "" ? "-" : phone1,
            phone2: phone2 === "-" || phone2 === "" ? "-" : phone2,
          };

          changedCustomer.contact.push(newContact);

          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/customers/${
              changedCustomer._id as string
            }`,
            {
              method: "PATCH",
              body: JSON.stringify({ contact: changedCustomer.contact }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.user.token}`,
              },
            }
          );

          const data = await response.json();

          if (!response.ok) {
            showNotification({
              title: "⛔ Une erreur est survenue",
              message: data.error,
              color: "red",
            });
          }

          setCustomer(changedCustomer);

          showNotification({
            title: `✅ Nouveau contact sauvegardé`,
            message: `Nouveau contact ajouté à ${props.customer.name}`,
            color: "green",
          });
          handleCloseModal();
        }
      } else {
        gender === ""
          ? setGenderError("Information manquante")
          : setGenderError("");
        firstName === ""
          ? setFirstNameError("Information manquante")
          : setFirstNameError("");
        lastName === ""
          ? setLastNameError("Information manquante")
          : setLastNameError("");
        category === ""
          ? setCategoryError("Information manquante")
          : setCategoryError("");
        showNotification({
          title: `⛔ Erreur à corriger`,
          message: `Un ou plusieurs champs de saisie requiert votre attention`,
          color: "red",
        });
      }
    } else {
      showNotification({
        title: "🔒 Authentification requise",
        message: "L'utilisateur n'est pas connecté",
        color: "red",
      });
    }
  };

  const handleCancelClick = () => {
    showNotification({
      title: `⛔ Nouveau contact non sauvegardé`,
      message: `L'ajout d'un nouveau contact pour ${props.customer.name} est annulé`,
      color: "red",
    });
    handleCloseModal();
  };

  return (
    <>
      <div className="customerTitle">
        <CustomTitle
          flexStart={true}
          icon={<IconUser size={24} />}
          title={"Interlocuteurs :"}
        />
        {customer?.commercial.includes(
          userData?.email.split("@")[0] as string
        ) ? (
          <ActionIcon color={"yellow"} onClick={() => setOpenNewContact(true)}>
            <IconCirclePlus size={20} color="black" />
          </ActionIcon>
        ) : (
          <></>
        )}
      </div>
      <div className="contactContainer">
        {customer !== undefined ? (
          customer.contact.map((currentContact, index) => (
            <Contact
              editMode={props.editMode}
              key={index}
              customer={props.customer}
              currentContact={currentContact}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <Modal
        fullScreen={smallScreen}
        centered
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        opened={openNewContact}
        onClose={handleCancelClick}
        padding={"xl"}
        title={
          <div className="contactModalTitle">
            <CustomTitle
              flexStart={true}
              icon={<IconUser size={24} />}
              title={"Nouveau contact"}
            />
          </div>
        }
      >
        <div className="contactCustomerNameBadge">
          <Badge color="dark" variant="filled">
            {props.customer.name}
          </Badge>
        </div>
        <div className="contactIdentityContainer">
          <Radio.Group
            withAsterisk
            name="favoriteFramework"
            label="M. / Mme"
            value={gender}
            onChange={(val) => setGender(val as "M." | "Mme")}
            error={genderError}
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
            withAsterisk
            label={"Prénom"}
            value={firstName}
            onChange={(event) => {
              setFirstName(event.currentTarget.value);
            }}
            error={firstNameError}
          />
          <TextInput
            withAsterisk
            label={"Nom"}
            value={lastName}
            onChange={(event) => {
              setLastName(event.currentTarget.value);
            }}
            error={lastNameError}
          />
          <Select
            withAsterisk
            label={"Poste"}
            data={[
              "Direction",
              "Commerce",
              "Conduite de travaux",
              "Assistance technique",
              "Secrétariat",
              "Autre",
            ]}
            value={category}
            onChange={(val) => setCategory(val as string)}
            error={categoryError}
          />
          <TextInput
            label={"Email"}
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
            }}
            error={
              validator.isEmail(email) || email.length <= 5
                ? ""
                : "Format d'email invalide"
            }
          />
          <TextInput
            label={"Téléphone 1"}
            value={phone1}
            onChange={(event) => {
              setPhone1(event.currentTarget.value);
            }}
            error={
              isPhoneFormat(phone1) || phone1.length <= 1
                ? ""
                : "Format de numéro de téléphone invalide"
            }
          />
          <TextInput
            label={"Téléphone 2"}
            value={phone2}
            onChange={(event) => {
              setPhone2(event.currentTarget.value);
            }}
            error={
              isPhoneFormat(phone2) || phone2.length <= 1
                ? ""
                : "Format de numéro de téléphone invalide"
            }
          />
        </div>
        <div className="newContactButtonContainer">
          <CustomButton
            handleClick={handleValideClick}
            icon={<IconCheck />}
            label={"Valider"}
            color={"green"}
            extraStyle={{
              color: "black",
            }}
          />
          <CustomButton
            handleClick={handleCancelClick}
            icon={<IconX />}
            label={"Annuler"}
            color={"red"}
            extraStyle={{
              color: "black",
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default CustomerContact;
