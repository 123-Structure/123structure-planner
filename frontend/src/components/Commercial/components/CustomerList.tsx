import { Tabs, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { useCustomer } from "../../../context/CustomerContext";
import Customer from "./Customer/Customer";
import AgenceList from "./AgenceList";

interface ICustomerListProps {
  category: string;
}

const CustomerList = (props: ICustomerListProps) => {
  const [activeTab, setActiveTab] = useState<string | null>("");
  const theme = useMantineTheme();
  const customers = useCustomer();

  return (
    <Tabs orientation="vertical" value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List>
        {customers
          .filter((customer) => customer.category === props.category)
          .reduce((acc, customer) => {
            const value =
              customer.group === "" ? customer.name : customer.group;

            if (!acc.includes(value)) {
              acc.push(value);
            }
            return acc;
          }, [] as string[])
          .map((customer) => (
            <Tabs.Tab
              key={customer}
              style={{
                backgroundColor:
                  activeTab === customer ? theme.colors.yellow[1] : "",
                fontWeight: activeTab === customer ? "bold" : "",
              }}
              value={customer}
            >
              {customer}
            </Tabs.Tab>
          ))}
      </Tabs.List>

      {customers
        .filter(
          (customer) =>
            customer.category === props.category && customer.group === ""
        )
        .reduce((acc, customer) => {
          const value = customer.group === "" ? customer.name : customer.group;

          if (!acc.includes(value)) {
            acc.push(value);
          }
          return acc;
        }, [] as string[])
        .map((customer) => (
          <Tabs.Panel key={customer} value={customer}>
            <Customer
              customer={customers.filter((c) => c.name === customer)[0]}
            />
          </Tabs.Panel>
        ))}

      {customers
        .filter(
          (customer) =>
            customer.category === props.category && customer.group !== ""
        )
        .reduce((acc, customer) => {
          const value = customer.group === "" ? customer.name : customer.group;

          if (!acc.includes(value)) {
            acc.push(value);
          }
          return acc;
        }, [] as string[])
        .map((customer) => (
          <Tabs.Panel key={customer} value={customer}>
            <AgenceList
              customers={customers.filter((c) => c.group === customer)}
            />
          </Tabs.Panel>
        ))}
    </Tabs>
  );
};

export default CustomerList;
