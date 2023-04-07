import { Select, SelectItem, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { CustomerCategoryList } from "../../../../data/constants/CustomerCategoryList";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { IDataAPICategory } from "../../../../data/interfaces/IDataAPICategory";
import { useCustomer } from "../../../../hooks/Customer/useCustomer";
import { useUpdateCustomer } from "../../../../hooks/Customer/useUpdateCustomer";
import { useCustomerRoutes } from "../../../../hooks/CustomerRoutes/useCustomerRoutes";
import { useUpdateCustomerRoutes } from "../../../../hooks/CustomerRoutes/useUpdateCustomerRoutes";
import BuildingPermitBro from "../../../../assets/img/Building permit-bro.svg";
import Customer from "../Customer/Customer";
import { showNotification } from "@mantine/notifications";
import { useAuth } from "../../../../hooks/Auth/useAuth";
import { APIBaseUrl } from "../../../../data/constants/APIBaseUrl";
import { useLogout } from "../../../../hooks/Auth/useLogout";

const MobileCustomerMenu = () => {
  const [customersList, setCustomersList] = useState<IDataAPICategory[]>([]);
  const [customerGroup, setCustomerGroup] = useState<IDataAPICategory[]>();

  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();
  const customer = useCustomer();
  const setCustomer = useUpdateCustomer();
  const { auth } = useAuth();
  const { logout } = useLogout();

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

  const fetchCustomersList = async (
    commercial: string | null,
    category: string | null
  ) => {
    if (auth.user) {
      const response = await fetch(
        `${APIBaseUrl}/api/customers/category/${commercial}/${category}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );

      if (response.status === 401) {
        logout();
        showNotification({
          title: "🔒 Authentification requise",
          message: "Session expirée",
          color: "red",
        });
      } else {
        const data = (await response.json()) as IDataAPICategory[];
        setCustomersList(data);
      }
    }
  };

  const fetchCustomer = async (val: string | null) => {
    if (auth.user) {
      const customer = customersList.filter(
        (customer) => customer.name === val
      )[0];

      if (customer !== undefined) {
        const response = await fetch(
          `${APIBaseUrl}/api/customers/${customer._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        );

        if (response.status === 401) {
          logout();
          showNotification({
            title: "🔒 Authentification requise",
            message: "Session expirée",
            color: "red",
          });
        } else {
          const data = (await response.json()) as ICustomer;
          setCustomer(data);
          setCustomerGroup(undefined);
          setCustomerRoutes({
            ...customerRoutes,
            customer: val as string,
          });
        }
      } else {
        const response = await fetch(
          `${APIBaseUrl}/api/customers/group/${customerRoutes.commercial}/${customerRoutes.category}/${val}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        );

        if (response.status === 401) {
          logout();
          showNotification({
            title: "🔒 Authentification requise",
            message: "Session expirée",
            color: "red",
          });
        } else {
          const data = (await response.json()) as IDataAPICategory[];
          setCustomer(undefined);
          setCustomerGroup(data);
          setCustomerRoutes({
            ...customerRoutes,
            customer: val as string,
            agency: " ",
          });
        }
      }
    }
  };

  const fetchAgency = async (val: string | null) => {
    if (auth.user) {
      const customer = customersList.filter(
        (customer) => customer.name === val
      )[0];

      if (customer !== undefined) {
        const response = await fetch(
          `${APIBaseUrl}/api/customers/${customer._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        );

        if (response.status === 401) {
          logout();
          showNotification({
            title: "🔒 Authentification requise",
            message: "Session expirée",
            color: "red",
          });
        } else {
          const data = (await response.json()) as ICustomer;
          setCustomer(data);
        }
      }
    }
  };

  const getCategories = () => {
    return CustomerCategoryList.reduce((acc, category: string | SelectItem) => {
      const item = { value: category, label: category } as SelectItem;
      acc.push(item);
      return acc;
    }, [] as (string | SelectItem)[]);
  };

  const getCustomerList = () => {
    return customersList.reduce((acc, customer) => {
      const value = customer.group === "" ? customer.name : customer.group;

      if (!acc.includes(value)) {
        acc.push(value);
      }
      return acc;
    }, [] as (string | SelectItem)[]);
  };

  const getAgenceList = () => {
    return customersList
      .filter((customer) => customer.group === customerRoutes.customer)
      .map((customer) => customer.name);
  };

  const handleCategoryChange = (val: string | null) => {
    setCustomer(undefined);
    fetchCustomersList(customerRoutes.commercial, val);
    setCustomerRoutes({
      ...customerRoutes,
      category: val as string,
      customer: "",
      agency: "",
      appointment: "",
    });
  };

  const handleCustomerListChange = (val: string | null) => {
    fetchCustomer(val);
  };

  const handleAgenceListChange = (val: string | null) => {
    fetchAgency(val);
    setCustomerRoutes({
      ...customerRoutes,
      agency: val as string,
    });
  };

  return (
    <div className="mobileCustomerMenu">
      <div
        className="mobileCustomerMenuSelectContainer"
        style={{ display: smallScreen ? "flex" : "none" }}
      >
        <Select
          className="mobileCustomerMenuSelect"
          label="Catégorie"
          placeholder="Catégorie de client"
          data={getCategories()}
          value={customerRoutes.category}
          onChange={(val) => {
            handleCategoryChange(val);
          }}
        />
        {customerRoutes.category !== "" && getCustomerList().length > 0 ? (
          <Select
            className="mobileCustomerMenuSelect"
            label="Client"
            placeholder="Client"
            data={getCustomerList()}
            value={customerRoutes.customer}
            onChange={(val) => {
              handleCustomerListChange(val);
            }}
          />
        ) : customerRoutes.category !== "" && getCustomerList().length === 0 ? (
          <div
            className={`customerListEmptyResult ${
              smallScreen ? "mobileCustomerListEmptyResult" : ""
            }`}
          >
            <img src={BuildingPermitBro} alt="building permit" />
            <p>Aucun client pour cette catégorie</p>
          </div>
        ) : (
          <></>
        )}
        {customerRoutes.agency !== "" ? (
          customerGroup
            ?.map((customer) => customer.group)
            .includes(customerRoutes.customer) ? (
            <Select
              className="mobileCustomerMenuSelect"
              label="Agence"
              placeholder="Agence"
              data={getAgenceList()}
              value={customerRoutes.agency}
              onChange={(val) => handleAgenceListChange(val)}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      {smallScreen && customer !== undefined ? (
        <Customer customer={customer} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MobileCustomerMenu;
