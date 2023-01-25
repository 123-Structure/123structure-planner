import { Tabs, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { ICustomer } from "../../../data/interfaces/ICustomer";
import Customer from "./Customer/Customer";

interface IAgenceListProps {
  color: string;
  customers: ICustomer[];
}

const AgenceList = (props: IAgenceListProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(
    props.customers[0].name
  );
  const theme = useMantineTheme();

  return (
    <Tabs
      color={props.color}
      orientation="vertical"
      value={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.List>
        {props.customers.map((customer) => (
          <Tabs.Tab
            key={customer.name}
            style={{
              backgroundColor:
                activeTab === customer.name ? theme.colors[props.color][1] : "",
              fontWeight: activeTab === customer.name ? "bold" : "",
            }}
            value={customer.name}
          >
            {customer.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {props.customers.map((customer) => (
        <Tabs.Panel key={customer.name} value={customer.name}>
          <Customer color={props.color} customer={customer} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default AgenceList;
