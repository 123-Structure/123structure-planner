import {
  FileInput,
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
  IconCurrencyEuro,
  IconEyeCheck,
  IconFileUpload,
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
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logo, setLogo] = useState("");
  const [priceListFile, setPriceListFile] = useState<File | null>(null);
  const [pdfViewerURL, setPdfViewerURL] = useState("");
  const [priceList, setPriceList] = useState("");

  const [errorCustomerName, setErrorCustomerName] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorCp, setErrorCp] = useState("");
  const [errorCity, setErrorCity] = useState("");

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const ressources = useRessources();
  const customers = useCustomer();
  const setCustomers = useUpdateCustomer();

  const [group, setGroup] = useState(
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

  const getCategories = () => {
    return CustomerCategoryList.reduce((acc, category: string | SelectItem) => {
      const item = { value: category, label: category } as SelectItem;
      acc.push(item);
      return acc;
    }, [] as (string | SelectItem)[]);
  };

  const handleValideClick = () => {
    setOpenNewCustomer(false);
  };

  const handleCancelClick = () => {
    setOpenNewCustomer(false);
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
    setGroup(
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
        onClose={() => setOpenNewCustomer(false)}
        padding={"xl"}
        size="xl"
        title={
          <div className="contactModalTitle">
            <CustomTitle
              flexStart={true}
              icon={<IconAddressBook size={24} />}
              title={"Nouveau contact"}
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
            />
            <Select
              label="Groupe"
              data={group}
              searchable
              creatable
              getCreateLabel={(query) => `+ Ajouter ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setGroup((current) => [...current, item]);
                return item;
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
            />
            <TextInput
              label={"Téléphone"}
              value={phone}
              onChange={(event) => {
                setPhone(event.currentTarget.value);
              }}
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
          <div>
            
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
