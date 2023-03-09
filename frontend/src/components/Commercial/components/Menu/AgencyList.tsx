import { Tabs, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import {
  useCustomerRoutes,
  useUpdateCustomerRoutes,
} from "../../../../context/CustomerRoutes";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { changeFavicon, changeTabTitle } from "../../../../utils/tabsUtils";
import Customer from "../Customer/Customer";

interface IAgenceListProps {
  customers: ICustomer[];
}

const AgencyList = (props: IAgenceListProps) => {
  const theme = useMantineTheme();
  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();

  return (
    <Tabs
      orientation="vertical"
      value={customerRoutes.agency}
      onTabChange={(val: string) => {
        changeFavicon("👷");
        changeTabTitle(`123 Structure - ${val}`);
        setCustomerRoutes({
          ...customerRoutes,
          agency: val,
        });
      }}
    >
      <Tabs.List>
        {props.customers.map((customer) => (
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

      {props.customers.map((customer) => (
        <Tabs.Panel key={customer.name} value={customer.name}>
          <Customer customer={customer} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default AgencyList;
