import { Card, FileInput, MultiSelect, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconCalendar,
  IconCurrencyEuro,
  IconHomeCheck,
  IconTargetArrow,
  IconUser,
  IconUsers,
} from "@tabler/icons";
import { useState } from "react";
import { IAppointment } from "../../../../../data/interfaces/IAppointment";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import { useAuth } from "../../../../../hooks/Auth/useAuth";
import { useCustomer } from "../../../../../hooks/Customer/useCustomer";
import { useUpdateCustomer } from "../../../../../hooks/Customer/useUpdateCustomer";
import { useRessources } from "../../../../../hooks/Ressources/useRessources";
import CustomButton from "../../../../utils/CustomButton";
import CustomDivider from "../../../../utils/CustomDivider";
import CustomTitle from "../../../../utils/CustomTitle";
import EditModeToggle from "../../../../utils/EditModeToggle";
import { HandleUploadFile } from "../../../../utils/HandleUploadFile";
import CustomerItem from "../../utils/CustomerItem";

interface ICustomerRelationshipProps {
  customer: ICustomer;
}

const CustomerRelationship = (props: ICustomerRelationshipProps) => {
  const getPriceListURL = () => {
    const binaryString = window.atob(props.customer.priceList.split(",")[1]);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const arrayBuffer = bytes.buffer;

    // Créer un objet blob à partir de l'ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });

    // Créer un objet URL à partir du blob
    const pdfUrl = URL.createObjectURL(blob);
    return pdfUrl;
  };

  const getCurrentGoal = () => {
    const currentYear = props.customer.projectGoal.filter(
      (projectGoal) => projectGoal.year === new Date().getFullYear()
    )[0];

    return currentYear !== undefined ? currentYear.goal : 0;
  };

  const getPreviousYearGoal = () => {
    const previousYear = props.customer.projectGoal.filter(
      (projectGoal) => projectGoal.year === new Date().getFullYear() - 1
    )[0];

    return previousYear !== undefined ? previousYear.goal : 0;
  };

  const [editCustomerRelationship, setEditCustomerRelationship] =
    useState(false);
  const [currentProjectGoal, setCurrentProjectGoal] = useState(
    getCurrentGoal()
  );
  const [previousYearProjectGoal, setPreviousYearProjectGoal] = useState(
    getPreviousYearGoal()
  );

  const [priceList, setPriceList] = useState(props.customer.priceList);
  const [priceListFile, setPriceListFile] = useState<File | null>(null);

  const currentProjectInvoiced = 0;
  const previousYearProjectInvoiced = 0;

  const ressources = useRessources();

  const customer = useCustomer();
  const setCustomer = useUpdateCustomer();
  const { auth } = useAuth();

  const [commercial, setCommercial] = useState(
    ressources
      .filter((ressource) => props.customer.commercial.includes(ressource._id))
      .map((commercial) => `${commercial.firstName} ${commercial.lastName}`)
  );

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const openURL = (url: string) => {
    window.open(url, "_blank");
  };

  const compareDates = (a: IAppointment, b: IAppointment) => {
    new Date(b.date).getTime();

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  };

  const getLastAppointment = () => {
    if (props.customer.appointment.length > 0) {
      const appointment = props.customer.appointment.sort(compareDates)[0];

      return `${appointment.title} (${new Date(
        appointment.date
      ).toLocaleDateString("fr")})`;
    } else {
      return "-";
    }
  };

  const handleValideClick = async () => {
    if (auth.user) {
      if (customer !== undefined) {
        const changedCustomer = customer;

        changedCustomer.commercial = ressources
          .filter((ressource) =>
            commercial.includes(`${ressource.firstName} ${ressource.lastName}`)
          )
          .map((commercial) => commercial._id);

        if (
          changedCustomer.projectGoal.filter(
            (projectGoal) => projectGoal.year === new Date().getFullYear()
          )[0] !== undefined
        ) {
          changedCustomer.projectGoal.filter(
            (projectGoal) => projectGoal.year === new Date().getFullYear()
          )[0].goal = currentProjectGoal;
        }

        if (
          changedCustomer.projectGoal.filter(
            (projectGoal) => projectGoal.year === new Date().getFullYear() - 1
          )[0] !== undefined
        ) {
          changedCustomer.projectGoal.filter(
            (projectGoal) => projectGoal.year === new Date().getFullYear() - 1
          )[0].goal = previousYearProjectGoal;
        }

        if (changedCustomer.projectGoal.length === 0) {
          changedCustomer.projectGoal = [
            {
              year: new Date().getFullYear() - 1,
              goal: previousYearProjectGoal,
            },
            {
              year: new Date().getFullYear(),
              goal: currentProjectGoal,
            },
          ];
        }

        changedCustomer.priceList = priceList;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/customers/${
            changedCustomer._id as string
          }`,
          {
            method: "PATCH",
            body: JSON.stringify({
              commercial: changedCustomer.commercial,
              projectGoal: changedCustomer.projectGoal,
              priceList: priceList,
            }),
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
        setPriceListFile(null);

        showNotification({
          title: `✅ Fiche client sauvegardée`,
          message: `La fiche client ${props.customer.name} est mise à jour`,
          color: "green",
        });
        setEditCustomerRelationship(false);
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
    setCommercial(
      ressources
        .filter((ressource) => {
          props.customer.commercial.includes(ressource._id);
        })
        .map((commercial) => `${commercial.firstName} ${commercial.lastName}`)
    );

    setCurrentProjectGoal(
      props.customer.projectGoal.filter(
        (projectGoal) => projectGoal.year === new Date().getFullYear()
      )[0].goal
    );

    setPreviousYearProjectGoal(
      props.customer.projectGoal.filter(
        (projectGoal) => projectGoal.year === new Date().getFullYear() - 1
      )[0].goal
    );

    setPriceList(props.customer.priceList);
    setPriceListFile(null);

    showNotification({
      title: `⛔ Fiche client non sauvegardée`,
      message: `Les modifications pour ${props.customer.name} sont annulées`,
      color: "red",
    });
    setEditCustomerRelationship(false);
  };

  const selectValue = (
    editMode: boolean,
    currentValue: string[],
    label: string[],
    defaultValue: string[]
  ) => {
    if (editMode) {
      const acc = [] as string[];
      label.map((label) =>
        currentValue.includes(label) ? acc.push(`${label}*`) : acc.push(label)
      );
      return acc;
    } else {
      return smallScreen ? [""] : defaultValue;
    }
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="customerRelationship"
    >
      <div className="customerTitle">
        <CustomTitle
          flexStart={true}
          icon={<IconUsers size={24} />}
          title="Relation commerciale"
        />
        <EditModeToggle
          disabled={false}
          editMode={editCustomerRelationship}
          editLabel=""
          validateLabel=""
          cancelLabel=""
          handleEditClick={() => setEditCustomerRelationship(true)}
          handleValideClick={handleValideClick}
          handleCancelClick={handleCancelClick}
        />
      </div>
      <div className="customerItemContainer">
        <div className="customerItemTitle">
          <CustomerItem
            editMode={editCustomerRelationship}
            inputType={"multiselect"}
            value={selectValue(
              editCustomerRelationship,
              commercial,
              ressources
                .filter((commercial) => commercial.role.includes("Commercial"))
                .map(
                  (ressource) => `${ressource.firstName} ${ressource.lastName}`
                ),
              ["Commercial référent :"]
            )}
            updateValue={[setCommercial]}
            icon={<IconUser size={24} color="black" />}
            color="yellow"
          />
          <p>
            {editCustomerRelationship
              ? ""
              : commercial.map(
                  (commercial, index) =>
                    `${index > 0 ? " - " : ""}${commercial}`
                )}
          </p>
        </div>
        <div className="customerItemTitle">
          <CustomerItem
            value={["Dernière visite :"]}
            icon={<IconCalendar size={24} color="black" />}
            color="yellow"
          />
          <p>{getLastAppointment()}</p>
        </div>
        <div className="customerProjectGoalContainer">
          <div className="customerItemTitle">
            <CustomerItem
              editMode={editCustomerRelationship}
              inputType={"number"}
              value={[
                editCustomerRelationship
                  ? previousYearProjectGoal
                  : `Objectif ${new Date().getFullYear() - 1} :`,
              ]}
              updateValue={[setPreviousYearProjectGoal]}
              icon={<IconTargetArrow size={24} color="black" />}
              color="yellow"
            />
            <p>
              {editCustomerRelationship
                ? `(${new Date().getFullYear() - 1})`
                : previousYearProjectGoal}
            </p>
          </div>
          <div className="customerItemTitle">
            <CustomerItem
              editMode={editCustomerRelationship}
              inputType={"number"}
              value={[
                editCustomerRelationship
                  ? currentProjectGoal
                  : `Objectif ${new Date().getFullYear()} :`,
              ]}
              updateValue={[setCurrentProjectGoal]}
              icon={<IconTargetArrow size={24} color="black" />}
              color="yellow"
            />
            <p>
              {editCustomerRelationship
                ? `(${new Date().getFullYear()})`
                : currentProjectGoal}
            </p>
          </div>
          <div className="customerItemTitle">
            <CustomerItem
              inputType={"number"}
              value={[`Production ${new Date().getFullYear() - 1} :`]}
              icon={
                <IconHomeCheck
                  size={24}
                  color={previousYearProjectInvoiced === 0 ? "white" : "black"}
                />
              }
              color={
                previousYearProjectInvoiced === 0
                  ? "gray"
                  : (previousYearProjectInvoiced / previousYearProjectGoal) *
                      100 <
                    80
                  ? "red"
                  : (previousYearProjectInvoiced / previousYearProjectGoal) *
                      100 >=
                      80 &&
                    (previousYearProjectInvoiced / previousYearProjectGoal) *
                      100 <
                      100
                  ? "orange"
                  : "green"
              }
            />
            <p className="customerProductionContainer">
              <span
                style={{
                  color:
                    previousYearProjectInvoiced === 0
                      ? "gray"
                      : (previousYearProjectInvoiced /
                          previousYearProjectGoal) *
                          100 <
                        80
                      ? theme.colors.red[6]
                      : (previousYearProjectInvoiced /
                          previousYearProjectGoal) *
                          100 >=
                          80 &&
                        (previousYearProjectInvoiced /
                          previousYearProjectGoal) *
                          100 <
                          100
                      ? theme.colors.orange[6]
                      : theme.colors.green[6],
                }}
              >
                {previousYearProjectInvoiced}
              </span>
              {`/${previousYearProjectGoal}`}
            </p>
          </div>
          <div className="customerItemTitle">
            <CustomerItem
              inputType={"number"}
              value={[`Production ${new Date().getFullYear()} :`]}
              icon={
                <IconHomeCheck
                  size={24}
                  color={currentProjectInvoiced === 0 ? "white" : "black"}
                />
              }
              color={
                currentProjectInvoiced === 0
                  ? "gray"
                  : (currentProjectInvoiced / currentProjectGoal) * 100 < 80
                  ? "red"
                  : (currentProjectInvoiced / currentProjectGoal) * 100 >= 80 &&
                    (currentProjectInvoiced / currentProjectGoal) * 100 < 100
                  ? "orange"
                  : "green"
              }
            />
            <p className="customerProductionContainer">
              <span
                style={{
                  color:
                    currentProjectInvoiced === 0
                      ? "gray"
                      : (currentProjectInvoiced / currentProjectGoal) * 100 < 80
                      ? theme.colors.red[6]
                      : (currentProjectInvoiced / currentProjectGoal) * 100 >=
                          80 &&
                        (currentProjectInvoiced / currentProjectGoal) * 100 <
                          100
                      ? theme.colors.orange[6]
                      : theme.colors.green[6],
                }}
              >
                {currentProjectInvoiced}
              </span>
              {`/${currentProjectGoal}`}
            </p>
          </div>
        </div>
      </div>
      <CustomDivider />
      {editCustomerRelationship ? (
        <FileInput
          label="Grille de prix"
          placeholder="grille_tarifaire.pdf"
          icon={<IconCurrencyEuro size={14} />}
          accept=".pdf"
          value={priceListFile}
          onChange={(file) =>
            HandleUploadFile(file, setPriceListFile, setPriceList)
          }
        />
      ) : (
        <CustomButton
          handleClick={() => openURL(getPriceListURL())}
          icon={<IconCurrencyEuro />}
          label={"Grille tarifaire"}
          extraStyle={{
            width: "fit-content",
          }}
          disabled={priceList === ""}
        />
      )}
    </Card>
  );
};

export default CustomerRelationship;
