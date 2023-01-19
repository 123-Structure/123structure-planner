import { Tabs, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { useCustomer } from "../../../../context/CustomerContext";
import Customer from "../Customer/Customer";
import Agence from "./Agence";

interface IConstructeur {
  color: string;
}

const Constructeur = (props: IConstructeur) => {
  const [activeTab, setActiveTab] = useState<string | null>(".G ARCHITECTURE");
  const theme = useMantineTheme();
  const customers = useCustomer();

  return (
    <Tabs
      color={props.color}
      orientation="vertical"
      value={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.List>
        {customers
          .filter((customer) => customer.category === "Constructeur")
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
                  activeTab === customer ? theme.colors[props.color][1] : "",
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
            customer.category === "Constructeur" && customer.group === ""
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
              color={props.color}
              customer={customers.filter((c) => c.name === customer)[0]}
            />
          </Tabs.Panel>
        ))}

      {customers
        .filter(
          (customer) =>
            customer.category === "Constructeur" && customer.group !== ""
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
            <Agence
              color={props.color}
              customers={customers.filter((c) => c.group === customer)}
            />
          </Tabs.Panel>
        ))}
    </Tabs>
  );
};

export default Constructeur;
