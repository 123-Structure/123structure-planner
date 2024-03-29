import { Badge, Card, Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconAddressBook, IconMail, IconMap2, IconPhone } from "@tabler/icons";
import { useEffect, useState } from "react";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import CustomDivider from "../../../../utils/CustomDivider";
import CustomTitle from "../../../../utils/CustomTitle";
import EditModeToggle from "../../../../utils/EditModeToggle";
import CustomerItem from "../../utils/CustomerItem";
import CustomerContact from "./CustomerContact";
import CabinBro from "../../../../../assets/img/Cabin-bro.svg";
import validator from "validator";
import { isPhoneFormat } from "../../../../../utils/validateInput";
import { useCustomer } from "../../../../../hooks/Customer/useCustomer";
import { useUpdateCustomer } from "../../../../../hooks/Customer/useUpdateCustomer";
import { useAuth } from "../../../../../hooks/Auth/useAuth";
import { useUserData } from "../../../../../hooks/Auth/useUserData";
import { APIBaseUrl } from "../../../../../data/constants/APIBaseUrl";
import { CustomerCategoryList } from "../../../../../data/constants/CustomerCategoryList";
import { useUpdateCustomerRoutes } from "../../../../../hooks/CustomerRoutes/useUpdateCustomerRoutes";
import { useCustomerRoutes } from "../../../../../hooks/CustomerRoutes/useCustomerRoutes";

interface ICustomerIdentityProps {
  customer: ICustomer;
}

const CustomerIdentity = (props: ICustomerIdentityProps) => {
  const [editCustomerIdentity, setEditCustomerIdentity] = useState(false);
  const [category, setCategory] = useState(props.customer.category);
  const [address, setAddress] = useState(props.customer.location.address);
  const [cp, setCp] = useState(props.customer.location.cp);
  const [city, setCity] = useState(props.customer.location.city);
  const [email, setEmail] = useState(props.customer.email);
  const [phone, setPhone] = useState(props.customer.phone);
  const [contact, setContact] = useState(props.customer.contact);

  const [logo, setLogo] = useState(props.customer.logo);

  const customer = useCustomer();
  const setCustomer = useUpdateCustomer();
  const { auth } = useAuth();
  const userData = useUserData();
  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();

  const openURL = (url: string) => {
    window.open(url, "_blank");
  };

  const sendEmailOrCallPhone = (id: string) => {
    const anchor = document.querySelector(id) as HTMLAnchorElement;
    if (anchor !== null) {
      anchor.click();
    }
  };

  const handleValideClick = async () => {
    if (auth.user) {
      if (customer !== undefined) {
        const changedCustomer = customer;

        changedCustomer.location.address = address;
        changedCustomer.location.cp = cp;
        changedCustomer.location.city = city;
        changedCustomer.email = email;
        changedCustomer.phone = phone;
        changedCustomer.contact = contact;
        changedCustomer.logo = logo;
        changedCustomer.category = category;

        const response = await fetch(
          `${APIBaseUrl}/api/customers/${changedCustomer._id as string}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              location: {
                address: address,
                cp: cp,
                city: city,
              },
              email: email,
              phone: phone,
              contact: contact,
              logo: logo,
              category: category,
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

        setCustomerRoutes({
          ...customerRoutes,
          category: category as string,
        });

        setCustomer(changedCustomer);

        showNotification({
          title: `✅ Fiche client sauvegardée`,
          message: `La fiche client ${props.customer.name} est mise à jour`,
          color: "green",
        });
        setEditCustomerIdentity(false);
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
    setAddress(props.customer.location.address);
    setCp(props.customer.location.cp);
    setCity(props.customer.location.city);
    setEmail(props.customer.email);
    setPhone(props.customer.phone);
    setContact(props.customer.contact);
    setLogo(props.customer.logo);
    showNotification({
      title: `⛔ Fiche client non sauvegardée`,
      message: `Les modifications pour ${props.customer.name} sont annulées`,
      color: "red",
    });
    setEditCustomerIdentity(false);
  };

  // const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) {
  //     return;
  //   }

  //   const file = e.target.files[0];

  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(file);
  //   fileReader.onload = () => {
  //     const base64String = fileReader.result as string;
  //     if (base64String !== null) {
  //       setLogo(base64String.split("data:image/png;base64,")[1]);
  //     }
  //   };
  // };

  useEffect(() => {
    setCategory(props.customer.category);
  }, [props.customer.category]);

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="customerIdentity"
    >
      <div className="customerTitle">
        <CustomTitle
          flexStart={true}
          icon={<IconAddressBook size={24} />}
          title={props.customer.name}
        />

        {customer?.commercial.includes(
          userData?.email.split("@")[0] as string
        ) || userData?.role.includes("Administrateur") ? (
          <EditModeToggle
            disabled={
              !validator.isPostalCode(cp, "FR") ||
              (!validator.isEmail(email) && email !== "-") ||
              !isPhoneFormat(phone)
            }
            editMode={editCustomerIdentity}
            editLabel=""
            validateLabel=""
            cancelLabel=""
            handleEditClick={() => setEditCustomerIdentity(true)}
            handleValideClick={handleValideClick}
            handleCancelClick={handleCancelClick}
          />
        ) : (
          <></>
        )}
      </div>
      {!editCustomerIdentity ? (
        <Badge color="dark" variant="filled">
          {props.customer.category}
        </Badge>
      ) : (
        <Select
          label={"Catégorie de client"}
          data={CustomerCategoryList}
          value={category}
          onChange={(val) => {
            setCategory(val as any);
          }}
        />
      )}
      <div className="customerIdentityContainer">
        <div
          // className={`customerLogoContainer ${
          //   editCustomerIdentity ? "editCustomerLogo" : ""
          // }`}
          // onClick={() =>
          //   editCustomerIdentity
          //     ? document
          //         .getElementById(`logoFileInput_${props.customer._id}`)
          //         ?.click()
          //     : null
          // }
          className="customerLogoContainer"
        >
          <img
            className="customerLogo"
            src={logo === "" ? CabinBro : "data:image/png;base64," + logo}
            alt={`Logo ${props.customer.name}`}
          />
          {/* <input
            type="file"
            className="logoFileInput"
            id={`logoFileInput_${props.customer._id}`}
            onChange={(e) => handleUploadFile(e)}
            accept="image/png"
          /> */}
        </div>
        <div
          className="customerItemContainer"
          style={{
            paddingLeft: "8px",
          }}
        >
          <CustomerItem
            editMode={editCustomerIdentity}
            inputType={"text"}
            label={["Adresse", "CP", "Ville"]}
            value={[address, cp, city]}
            updateValue={[setAddress, setCp, setCity]}
            icon={<IconMap2 size={24} color="black" />}
            color="yellow"
            handleClick={() =>
              openURL(
                `https://www.google.fr/maps/search/${props.customer.location.address}, ${props.customer.location.cp} ${props.customer.location.city}`
              )
            }
            errorMessage={[
              validator.isPostalCode(cp, "FR") ? "" : ".",
              validator.isPostalCode(cp, "FR")
                ? ""
                : "Code postale de 5 chiffres",
              validator.isPostalCode(cp, "FR") ? "" : ".",
            ]}
          />
          <CustomerItem
            editMode={editCustomerIdentity}
            inputType={"text"}
            value={[email]}
            updateValue={[setEmail]}
            icon={<IconMail size={24} color="black" />}
            color="yellow"
            handleClick={() =>
              sendEmailOrCallPhone(
                `#sendEmail_${props.customer.name
                  .replaceAll(" ", "_")
                  .replaceAll(".", "")}`
              )
            }
            errorMessage={[
              validator.isEmail(email) || email === "-"
                ? ""
                : "Format d'email invalide",
            ]}
          />
          <a
            className="sendEmail"
            id={`sendEmail_${props.customer.name
              .replaceAll(" ", "_")
              .replaceAll(".", "")}`}
            href={`mailto:${props.customer.email}`}
          />

          <CustomerItem
            editMode={editCustomerIdentity}
            inputType={"text"}
            value={[phone]}
            updateValue={[setPhone]}
            icon={<IconPhone size={24} color="black" />}
            color="yellow"
            handleClick={() =>
              sendEmailOrCallPhone(
                `#callPhone_${props.customer.name
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
      <CustomDivider />
      <CustomerContact
        contact={contact}
        customer={props.customer}
        editMode={editCustomerIdentity}
      />
    </Card>
  );
};

export default CustomerIdentity;
