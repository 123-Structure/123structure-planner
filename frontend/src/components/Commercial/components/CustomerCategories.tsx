import { Tabs, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import CustomerList from "./CustomerList";

interface ICustomerCategoriesProps {
  color: string;
}

const CustomerCategories = (props: ICustomerCategoriesProps) => {
  const [activeTab, setActiveTab] = useState<string | null>("Constructeur");
  const theme = useMantineTheme();

  const categories = [
    "Constructeur",
    "Négoce",
    "Maitre d'Oeuvre",
    "Maçon",
    "Charpentier",
  ];

  return (
    <Tabs
      color={props.color}
      orientation="vertical"
      value={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.List>
        {categories.map((category) => (
          <Tabs.Tab
            key={category}
            style={{
              backgroundColor:
                activeTab === category ? theme.colors[props.color][1] : "",
              fontWeight: activeTab === category ? "bold" : "",
            }}
            value={category}
          >
            {category}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {categories.map((category) => (
        <Tabs.Panel key={category} value={category}>
          <CustomerList color={props.color} category={category} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default CustomerCategories;
