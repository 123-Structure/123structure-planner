import {
  ActionIcon,
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
  IconUpload,
  IconUser,
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

  const handleUploadLogo = (file: File | null) => {
    setLogoFile(file);
    if (file !== null) {
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
          setLogo(fileReader.result as string);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
  };

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
        <MultiSelect
          withAsterisk
          searchable={!smallScreen}
          nothingFound="Aucun résultat"
          clearable
          label="Commercial référent"
          data={ressources
            .filter((ressource) => ressource.role.includes("Commercial"))
            .map((ressource) => `${ressource.firstName} ${ressource.lastName}`)}
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
        <FileInput
          label="Logo"
          placeholder="logo.png"
          icon={<IconUpload size={14} />}
          accept="image/png,image/jpeg"
          value={logoFile}
          onChange={(file) => handleUploadLogo(file)}
        />
        {logo !== "" ? (
          <img className="newCustomerLogo" src={logo} alt={"logo"} />
        ) : (
          <></>
        )}
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
