import { Tabs, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { useCustomer } from "../../../../context/CustomerContext";
import { ICustomer } from "../../../../data/interfaces/ICustomer";

interface IConstructeur {
  color: string;
}

const Constructeur = (props: IConstructeur) => {
  const [activeTab, setActiveTab] = useState<string | null>("Constructeur");
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
            customer.category === "Constructeur" && customer.group !== ""
        )
        .map((customer) => (
          <Tabs.Panel key={customer.group} value={customer.group}>
            {customer.name}
          </Tabs.Panel>
        ))}
    </Tabs>
  );
};

export default Constructeur;
