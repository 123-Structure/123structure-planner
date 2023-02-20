import {
  FileInput,
  Modal,
  MultiSelect,
  NumberInput,
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
  IconCurrencyEuro,
  IconEyeCheck,
  IconUpload,
  IconX,
} from "@tabler/icons";
import React, { useEffect, useState } from "react";
import {
  useCustomer,
  useUpdateCustomer,
} from "../../../../context/CustomerContext";
import { CustomerCategoryList } from "../../../../data/constants/CustomerCategoryList";
import CustomButton from "../../../utils/CustomButton";
import CustomTitle from "../../../utils/CustomTitle";
import "../../../../assets/style/newCustomer.css";
import { useRessources } from "../../../../context/RessourceContext";
import {
  isCPFormat,
  isEmailFormat,
  isPhoneFormat,
} from "../../../../utils/validateInput";
import { showNotification } from "@mantine/notifications";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { TCustomerCategory } from "../../../../data/types/TCustomerCategory";
import { TPaymentType } from "../../../../data/types/TPaymentType";

const NewCustomer = () => {
  const [openNewCustomer, setOpenNewCustomer] = useState(false);
  const [commercial, setCommercial] = useState<string[]>([]);
  const [customerCategory, setCustomerCategory] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [cp, setCp] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentDeadline, setPaymentDeadline] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [projectGoal, setProjectGoal] = useState(0);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logo, setLogo] = useState("");
  const [priceListFile, setPriceListFile] = useState<File | null>(null);
  const [pdfViewerURL, setPdfViewerURL] = useState("");
  const [priceList, setPriceList] = useState("");

  const [errorCommercial, setErrorCommercial] = useState("");
  const [errorCustomerCategory, setErrorCustomerCategory] = useState("");
  const [errorCustomerName, setErrorCustomerName] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorCp, setErrorCp] = useState("");
  const [errorCity, setErrorCity] = useState("");

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const ressources = useRessources();
  const customers = useCustomer();
  const setCustomers = useUpdateCustomer();

  const [groupList, setGroupList] = useState(
    customers
      .filter((customer) => customer.category === customerCategory)
      .reduce((acc, customer) => {
        const item = customer.group;
        if (!acc.includes(item) && item !== "") {
          acc.push(item);
        }
        return acc;
      }, [] as (string | SelectItem)[])
  );
  const [group, setGroup] = useState("");

  const getCategories = () => {
    return CustomerCategoryList.reduce((acc, category: string | SelectItem) => {
      const item = { value: category, label: category } as SelectItem;
      acc.push(item);
      return acc;
    }, [] as (string | SelectItem)[]);
  };

  const handleCloseModal = () => {
    setOpenNewCustomer(false);
    setCommercial([]);
    setCustomerCategory("");
    setCustomerName("");
    setAddress("");
    setCp("");
    setCity("");
    setEmail("");
    setPhone("");
    setPaymentDeadline("");
    setPaymentType("");
    setProjectGoal(0)
    setLogoFile(null);
    setLogo("");
    setPriceListFile(null);
    setPriceList("");
    setPdfViewerURL("");
    setGroupList(
      customers
        .filter((customer) => customer.category === customerCategory)
        .reduce((acc, customer) => {
          const item = customer.group;
          if (!acc.includes(item) && item !== "") {
            acc.push(item);
          }
          return acc;
        }, [] as (string | SelectItem)[])
    );
    setGroup("");

    setErrorCommercial("");
    setErrorCustomerCategory("");
    setErrorCustomerName("");
    setErrorAddress("");
    setErrorCp("");
    setErrorCity("");
  };

  const handleValideClick = () => {
    if (
      commercial.length > 0 &&
      customerCategory !== "" &&
      customerName !== "" &&
      address !== "" &&
      isCPFormat(cp) &&
      city !== "" &&
      (email.length > 0 ? isEmailFormat(email) : true) &&
      (phone.length > 0 ? isPhoneFormat(phone) : true)
    ) {
      const newCustomer = [...customers];
      const currentNewCustomer: ICustomer = {
        category: customerCategory as TCustomerCategory,
        group: group,
        name: customerName,
        location: {
          address: address,
          cp: cp,
          city: city,
        },
        email: email === "" ? "-" : email,
        phone: phone === "" ? "-" : phone,
        logo: logo,
        contact: [],
        priceList: priceList,
        commercial: ressources
          .filter((ressource) => ressource.role.includes("Commercial"))
          .filter((ressource) =>
            commercial.includes(`${ressource.firstName} ${ressource.lastName}`)
          ),
        appointment: [],
        projectGoal: [
          {
            year: new Date().getFullYear() - 1,
            goal: 0,
          },
          {
            year: new Date().getFullYear(),
            goal: projectGoal,
          },
        ],
        paymentDeadline: paymentDeadline as "30" | "45",
        paymentType: paymentType as TPaymentType,
        paymentStatus: "A",
      };
      newCustomer.push(currentNewCustomer);
      setCustomers(newCustomer);
      showNotification({
        title: `✅ Nouvelle fiche client sauvegardé`,
        message: `${customerName} ajouté à l'annuaire de client`,
        color: "green",
      });
      handleCloseModal();
    } else {
      commercial.length <= 0
        ? setErrorCommercial("Information manquante")
        : setErrorCommercial("");
      customerCategory === ""
        ? setErrorCustomerCategory("Information manquante")
        : setErrorCustomerCategory("");
      customerName === ""
        ? setErrorCustomerName("Information manquante")
        : setErrorCustomerName("");
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
      title: `⛔ Nouvelle fiche client non sauvegardé`,
      message: `Création d'une nouvelle fiche client annulé`,
      color: "red",
    });
    handleCloseModal();
  };

  const handleUploadFile = (
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setBinary: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFile(file);
    if (file !== null) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        if (base64String !== null) {
          setBinary(base64String);
        }
      };
    }
  };

  useEffect(() => {
    if (priceList !== "") {
      const binaryString = window.atob(priceList.split(",")[1]);
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
      setPdfViewerURL(pdfUrl);

      // Afficher le PDF dans l'élément d'embed
      const pdfViewer = document.getElementById("pdfViewer");
      if (pdfViewer !== null) {
        pdfViewer.setAttribute("src", pdfUrl);
      }
    }
  }, [priceList]);

  useEffect(() => {
    setGroupList(
      customers
        .filter((customer) => customer.category === customerCategory)
        .reduce((acc, customer) => {
          const item = customer.group;
          if (!acc.includes(item) && item !== "") {
            acc.push(item);
          }
          return acc;
        }, [] as (string | SelectItem)[])
    );
  }, [customerCategory]);

  return (
    <>
      <CustomButton
        handleClick={() => setOpenNewCustomer(true)}
        icon={<IconCirclePlus />}
        label={"Nouvelle fiche client"}
        extraStyle={{
          color: "black",
        }}
      />
      <Modal
        fullScreen={smallScreen}
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={openNewCustomer}
        onClose={handleCancelClick}
        padding={"xl"}
        size="75%"
        title={
          <div className="contactModalTitle">
            <CustomTitle
              flexStart={true}
              icon={<IconAddressBook size={24} />}
              title={"Nouvelle fiche client"}
            />
          </div>
        }
      >
        <div
          className={"newCustomerInputContainer"}
          style={{
            flexDirection: smallScreen ? "column" : "row",
            gap: smallScreen ? 0 : "16px",
          }}
        >
          <div className={"newCustomerInputContainerColumn"}>
            <MultiSelect
              withAsterisk
              searchable={!smallScreen}
              nothingFound="Aucun résultat"
              clearable
              label="Commercial référent"
              data={ressources
                .filter((ressource) => ressource.role.includes("Commercial"))
                .map(
                  (ressource) => `${ressource.firstName} ${ressource.lastName}`
                )}
              value={commercial}
              onChange={(val) => {
                setCommercial(val);
              }}
              error={errorCommercial}
            />
            <Select
              withAsterisk
              searchable
              label="Catégorie"
              data={getCategories()}
              value={customerCategory}
              onChange={(val) => {
                setCustomerCategory(val as string);
              }}
              error={errorCustomerCategory}
            />
            <Select
              label="Groupe"
              data={groupList}
              searchable
              creatable
              getCreateLabel={(query) => `+ Ajouter ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setGroupList((current) => [...current, item]);
                return item;
              }}
              value={group}
              onChange={(val) => {
                setGroup(val as string);
              }}
            />
            <TextInput
              withAsterisk
              label={"Dénomination"}
              value={customerName}
              onChange={(event) => {
                setCustomerName(event.currentTarget.value);
              }}
              error={errorCustomerName}
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
            <TextInput
              label={"Email"}
              value={email}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
              }}
              error={
                isEmailFormat(email) || email.length < 1
                  ? ""
                  : "Format d'email invalide"
              }
            />
            <TextInput
              label={"Téléphone"}
              value={phone}
              onChange={(event) => {
                setPhone(event.currentTarget.value);
              }}
              error={
                isPhoneFormat(phone) || phone.length < 1
                  ? ""
                  : "Format de numéro de téléphone invalide"
              }
            />
          </div>
          <div className={"newCustomerInputContainerColumn"}>
            <FileInput
              label="Logo"
              placeholder="logo.png"
              icon={<IconUpload size={14} />}
              accept="image/png,image/jpeg"
              value={logoFile}
              onChange={(file) => handleUploadFile(file, setLogoFile, setLogo)}
            />
            {logo !== "" && !smallScreen ? (
              <img className="newCustomerLogo" src={logo} alt={"logo"} />
            ) : (
              <></>
            )}
            <FileInput
              label="Grille de prix"
              placeholder="grille_tarifaire.pdf"
              icon={<IconCurrencyEuro size={14} />}
              accept=".pdf"
              value={priceListFile}
              onChange={(file) =>
                handleUploadFile(file, setPriceListFile, setPriceList)
              }
            />
            {priceList !== "" && !smallScreen ? (
              <>
                <CustomButton
                  handleClick={() => window.open(pdfViewerURL, "_blank")}
                  icon={<IconEyeCheck />}
                  label={"Afficher le pdf dans un nouvel onglet"}
                  color={"yellow"}
                  extraStyle={{
                    marginTop: "8px",
                    color: "black",
                  }}
                />
                <embed
                  id="pdfViewer"
                  type="application/pdf"
                  width="100%"
                  height="500"
                />
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={"newCustomerInputContainerColumn"}>
            <NumberInput
              label={`Objectif ${new Date().getFullYear()}`}
              defaultValue={0}
              step={10}
              precision={0}
              min={0}
              value={projectGoal}
              onChange={(val: number) => {
                setProjectGoal(val);
              }}
            />
            <Select
              label={"Délai de paiement"}
              data={["30", "45"]}
              value={paymentDeadline}
              onChange={(val) => {
                setPaymentDeadline(val as string);
              }}
            />
            <Select
              label={"Mode de paiement"}
              data={[
                "Chèque",
                "Virement",
                "Lettre de change relevé (LCR)",
                "Contrat cadre",
              ]}
              value={paymentType}
              onChange={(val) => {
                setPaymentType(val as string);
              }}
            />
          </div>
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

export default NewCustomer;
