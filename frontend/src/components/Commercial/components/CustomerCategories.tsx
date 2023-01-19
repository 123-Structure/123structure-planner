import { Tabs, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import Constructeur from "./Constructeur/Constructeur";

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

      <Tabs.Panel value="Constructeur">
        <Constructeur color={props.color} />
      </Tabs.Panel>

      <Tabs.Panel value="Négoce">Négoce tab content</Tabs.Panel>

      <Tabs.Panel value="Maitre d'Oeuvre">
        Maitre d'Oeuvre tab content
      </Tabs.Panel>

      <Tabs.Panel value="Maçon">Maçon tab content</Tabs.Panel>

      <Tabs.Panel value="Charpentier">Charpentier tab content</Tabs.Panel>
    </Tabs>
  );
};

export default CustomerCategories;
