import { Select, SelectItem, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { useCustomer } from "../../../../context/CustomerContext";
import { CustomerCategoryList } from "../../../../data/constants/CustomerCategoryList";
import Customer from "../Customer/Customer";

const MobileCustomerMenu = () => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(
    "Constructeur"
  );
  const [currentCustomerList, setCurrentCustomerList] = useState<string | null>(
    ""
  );
  const [currentAgence, setCurrentAgence] = useState<string | null>("");

  const customers = useCustomer();
  const theme = useMantineTheme();

  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.lg}px)`);

  const groupList = [] as (string | null)[];

  const getCategories = () => {
    return CustomerCategoryList.reduce((acc, category: string | SelectItem) => {
      const item = { value: category, label: category } as SelectItem;
      acc.push(item);
      return acc;
    }, [] as (string | SelectItem)[]);
  };

  const getCustomerList = () => {
    return customers
      .filter((customer) => customer.category === currentCategory)
      .reduce((acc, customer) => {
        const value = customer.group === "" ? customer.name : customer.group;

        if (customer.group !== "") {
          groupList.push(customer.group);
        }

        if (!acc.includes(value)) {
          acc.push(value);
        }
        return acc;
      }, [] as string[]);
  };

  const getAgenceList = () => {
    return customers
      .filter(
        (customer) =>
          customer.category === currentCategory &&
          customer.group === currentCustomerList
      )
      .map((customer) => customer.name);
  };

  const handleCategoryChange = (val: string | null) => {
    setCurrentCategory(val);
    setCurrentCustomerList("");
  };

  const handleCustomerListChange = (val: string | null) => {
    setCurrentCustomerList(val);
    setCurrentAgence("");
  };

  const handleAgenceListChange = (val: string | null) => {
    setCurrentAgence(val);
  };

  const getCustomer = () => {
    if (currentAgence !== "") {
      return customers.filter(
        (customer) =>
          currentCategory === currentCategory &&
          customer.group === currentCustomerList &&
          customer.name === currentAgence
      )[0];
    } else {
      return customers.filter(
        (customer) =>
          currentCategory === currentCategory &&
          customer.name === currentCustomerList
      )[0];
    }
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
          value={currentCategory}
          onChange={(val) => {
            handleCategoryChange(val);
          }}
        />
        <Select
          className="mobileCustomerMenuSelect"
          label="Client"
          placeholder="Client"
          data={getCustomerList()}
          value={currentCustomerList}
          onChange={(val) => {
            handleCustomerListChange(val);
          }}
        />
        {groupList.includes(currentCustomerList) ? (
          <Select
            className="mobileCustomerMenuSelect"
            label="Agence"
            placeholder="Agence"
            data={getAgenceList()}
            value={currentAgence}
            onChange={(val) => handleAgenceListChange(val)}
          />
        ) : (
          <></>
        )}
      </div>
      {getCustomer() !== undefined ? (
        <Customer
          customer={
            customers.filter(
              (customer) =>
                customer.category === currentCategory &&
                (customer.name === currentCustomerList ||
                  customer.name === currentAgence)
            )[0]
          }
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MobileCustomerMenu;
