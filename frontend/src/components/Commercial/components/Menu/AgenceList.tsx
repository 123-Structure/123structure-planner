import { Tabs, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { changeFavicon, changeTabTitle } from "../../../../utils/tabsUtils";
import Customer from "../Customer/Customer";

interface IAgenceListProps {
  customers: ICustomer[];
}

const AgenceList = (props: IAgenceListProps) => {
  const [activeTab, setActiveTab] = useState<string | null>("");
  const theme = useMantineTheme();

  return (
    <Tabs
      orientation="vertical"
      value={activeTab}
      onTabChange={(val) => {
        setActiveTab(val);
        changeFavicon("👷");
        changeTabTitle(`123 Structure - ${val}`);
      }}
    >
      <Tabs.List>
        {props.customers.map((customer) => (
          <Tabs.Tab
            key={customer.name}
            style={{
              backgroundColor:
                activeTab === customer.name ? theme.colors.yellow[1] : "",
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
          <Customer customer={customer} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default AgenceList;
