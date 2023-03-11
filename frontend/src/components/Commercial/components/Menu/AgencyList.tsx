import { Tabs, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import {
  useCustomer,
  useUpdateCustomer,
} from "../../../../context/CustomerContext";
import {
  useCustomerRoutes,
  useUpdateCustomerRoutes,
} from "../../../../context/CustomerRoutes";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { IDataAPICategory } from "../../../../data/interfaces/IDataAPICategory";
import { changeFavicon, changeTabTitle } from "../../../../utils/tabsUtils";
import Customer from "../Customer/Customer";

interface IAgenceListProps {
  customersList: IDataAPICategory[];
}

const AgencyList = (props: IAgenceListProps) => {
  const theme = useMantineTheme();
  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();
  const customer = useCustomer();
  const setCustomer = useUpdateCustomer();

  const fetchCustomer = async (val: string) => {
    const customer = props.customersList.filter(
      (customer) => customer.name === val
    )[0];

    const APIBaseUrl = import.meta.env.VITE_API_URL;

    if (customer !== undefined) {
      const response = await fetch(
        `${APIBaseUrl}/api/customers/${customer._id}`,
        {
          method: "GET",
        }
      );
      const data = (await response.json()) as ICustomer;
      setCustomer(data);
    }
  };

  return (
    <Tabs
      orientation="vertical"
      value={customerRoutes.agency}
      onTabChange={(val: string) => {
        fetchCustomer(val);
        changeFavicon("👷");
        changeTabTitle(`123 Structure - ${val}`);
        setCustomerRoutes({
          ...customerRoutes,
          agency: val,
        });
      }}
    >
      <Tabs.List>
        {props.customersList.map((customer) => (
          <Tabs.Tab
            key={customer.name}
            style={{
              backgroundColor:
                customerRoutes.agency === customer.name
                  ? theme.colors.yellow[1]
                  : "",
              fontWeight: customerRoutes.agency === customer.name ? "bold" : "",
            }}
            value={customer.name}
          >
            {customer.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {customer !== undefined ? (
        <Tabs.Panel key={customer._id} value={customer.name}>
          <Customer customer={customer} />
        </Tabs.Panel>
      ) : (
        <></>
      )}
    </Tabs>
  );
};

export default AgencyList;
