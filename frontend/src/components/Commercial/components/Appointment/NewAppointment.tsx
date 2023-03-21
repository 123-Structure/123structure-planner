import {
  Indicator,
  Modal,
  MultiSelect,
  Select,
  SelectItem,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconAddressBook,
  IconCheck,
  IconCirclePlus,
  IconMap2,
  IconX,
} from "@tabler/icons";
import { useState } from "react";
import CustomButton from "../../../utils/CustomButton";
import CustomTitle from "../../../utils/CustomTitle";
import "../../../../assets/style/newCustomer.css";
import { isCPFormat } from "../../../../utils/validateInput";
import { showNotification } from "@mantine/notifications";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { DatePickerInput } from "@mantine/dates";
import { IAppointment } from "../../../../data/interfaces/IAppointment";
import { TAppointmentTitle } from "../../../../data/types/TApppointmentTitle";
import { useCustomerRoutes } from "../../../../hooks/CustomerRoutes/useCustomerRoutes";
import { useUpdateCustomerRoutes } from "../../../../hooks/CustomerRoutes/useUpdateCustomerRoutes";
import { useCustomer } from "../../../../hooks/Customer/useCustomer";
import { useUpdateCustomer } from "../../../../hooks/Customer/useUpdateCustomer";

interface INewAppointmentProps {
  customer: ICustomer;
}

const NewAppointment = (props: INewAppointmentProps) => {
  const [openNewAppointment, setOpenNewAppointment] = useState(false);

  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [address, setAddress] = useState<string>("");
  const [cp, setCp] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [appointmentContact, setAppointmentContact] = useState<string[]>([]);

  const [errorAppointmentTitle, setErrorAppointmentTitle] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorCp, setErrorCp] = useState("");
  const [errorCity, setErrorCity] = useState("");

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();

  const customer = useCustomer();
  const setCustomer = useUpdateCustomer();

  const handleCloseModal = () => {
    setOpenNewAppointment(false);
    setAppointmentTitle("");
    setAppointmentDate(new Date());
    setAddress("");
    setCp("");
    setCity("");
    setAppointmentContact([]);
  };

  const handleValideClick = async () => {
    if (
      appointmentTitle !== "" &&
      address !== "" &&
      isCPFormat(cp) &&
      city !== ""
    ) {
      if (customer !== undefined) {
        const changedCustomer = customer;
        const newAppointment: IAppointment = {
          date: appointmentDate,
          contact: changedCustomer.contact
            .filter((contact) =>
              appointmentContact.includes(
                `${contact.firstName} ${contact.lastName}`
              )
            )
            .map((contact) => contact._id) as string[],
          location: {
            address: address,
            cp: cp,
            city: city,
          },
          title: appointmentTitle as TAppointmentTitle,
          content: "",
        };

        changedCustomer.appointment.push(newAppointment);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/customers/${
            changedCustomer._id as string
          }`,
          {
            method: "PATCH",
            body: JSON.stringify({ appointment: changedCustomer.appointment }),
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

        setCustomer(changedCustomer);

        showNotification({
          title: `✅ Nouveau rendez-vous sauvegardé`,
          message: `Nouveau rendez-vous ajouté pour ${props.customer.name}`,
          color: "green",
        });
        setCustomerRoutes({
          ...customerRoutes,
          appointment: `${appointmentTitle} (${appointmentDate.toLocaleDateString(
            "fr"
          )})`,
        });
        handleCloseModal();
      }
    } else {
      appointmentTitle === ""
        ? setErrorAppointmentTitle("Information manquante")
        : setErrorAppointmentTitle("");
      address === ""
        ? setErrorAddress("Information manquante")
        : setErrorAddress("");
      !isCPFormat(cp)
        ? setErrorCp("Code postale de 5 chiffres")
        : setErrorCp("");
      city === "" ? setErrorCity("Information manquante") : setErrorCity("");
      showNotification({
        title: `⛔ Erreur à corriger`,
        message: `Un ou plusieurs champs de saisie requiert votre attention`,
        color: "red",
      });
    }
  };

  const handleCancelClick = () => {
    showNotification({
      title: `⛔ Nouveau rendez-vous non sauvegardé`,
      message: `Création d'un nouveau rendez-vous annulé`,
      color: "red",
    });
    handleCloseModal();
  };

  const getAppointmentTitleList = () => {
    const appointmentTitle = [
      "RDV Démarchage",
      "RDV Technique",
      "RDV Courtoisie",
      "Autre",
    ];

    return appointmentTitle.reduce((acc, title: string | SelectItem) => {
      const item = {
        value: title,
        label: title,
      } as SelectItem;
      acc.push(item);
      return acc;
    }, [] as (string | SelectItem)[]);
  };

  const setCustomerAddress = () => {
    setAddress(props.customer.location.address);
    setCp(props.customer.location.cp);
    setCity(props.customer.location.city);
  };

  return (
    <>
      <CustomButton
        handleClick={() => setOpenNewAppointment(true)}
        icon={<IconCirclePlus />}
        label={"Nouveau rendez-vous"}
        extraStyle={{
          color: "black",
          margin: "16px",
        }}
      />
      <Modal
        fullScreen={smallScreen}
        centered
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        opened={openNewAppointment}
        onClose={handleCancelClick}
        padding={"xl"}
        size="lg"
        title={
          <div className="contactModalTitle">
            <CustomTitle
              flexStart={true}
              icon={<IconAddressBook size={24} />}
              title={"Nouveau rendez-vous"}
            />
          </div>
        }
      >
        <div>
          <Select
            withAsterisk
            searchable
            label="Type de rendez-vous"
            data={getAppointmentTitleList()}
            value={appointmentTitle}
            onChange={(val) => {
              setAppointmentTitle(val as string);
            }}
            error={errorAppointmentTitle}
          />
          <DatePickerInput
            label="Date de rendez-vous"
            className="editAppointmentTitleInput"
            locale="fr"
            excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
            valueFormat="DD/MM/YYYY"
            defaultValue={new Date()}
            onChange={(val: Date) => setAppointmentDate(val)}
            renderDay={(date) => {
              const day = date.toLocaleDateString("fr");
              const today = new Date().toLocaleDateString("fr");
              return (
                <Indicator
                  size={6}
                  color="red"
                  offset={-2}
                  disabled={day !== today}
                >
                  <div>{date.getDate()}</div>
                </Indicator>
              );
            }}
          />
          <MultiSelect
            searchable={!smallScreen}
            nothingFound="Aucun résultat"
            clearable
            label="Contact"
            data={props.customer.contact.map(
              (contact) => `${contact.firstName} ${contact.lastName}`
            )}
            value={appointmentContact}
            onChange={(val) => {
              setAppointmentContact(val);
            }}
          />
          <CustomButton
            handleClick={setCustomerAddress}
            icon={<IconMap2 />}
            label={`Adresse de ${props.customer.name}`}
            color={"yellow"}
            extraStyle={{
              marginTop: "16px",
              marginBottom: "8px",
              color: "black",
            }}
          />
          <TextInput
            withAsterisk
            label={"Adresse"}
            value={address}
            onChange={(event) => {
              setAddress(event.currentTarget.value);
            }}
            error={errorAddress}
          />
          <TextInput
            withAsterisk
            label={"Code Postal"}
            value={cp}
            onChange={(event) => {
              setCp(event.currentTarget.value);
            }}
            error={errorCp}
          />
          <TextInput
            withAsterisk
            label={"Ville"}
            value={city}
            onChange={(event) => {
              setCity(event.currentTarget.value);
            }}
            error={errorCity}
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

export default NewAppointment;
