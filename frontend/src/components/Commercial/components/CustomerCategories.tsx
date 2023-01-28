import { Tabs, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import CustomerList from "./CustomerList";

const CustomerCategories = () => {
  const [activeTab, setActiveTab] = useState<string | null>("Constructeur");

  const theme = useMantineTheme();

  const categories = [
    "Constructeur",
    "Négoce",
    "Maitre d'Oeuvre",
    "Maçon",
    "Charpentier",
  ];

  const getDisplay = () => {
    const element = document.querySelector(
      ".customerCategories"
    ) as HTMLDivElement;
    if (element !== null) {
      console.log(element.style.display);
    }
  };

  getDisplay();

  return (
    <>
      <Tabs orientation="vertical" value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          {categories.map((category) => (
            <Tabs.Tab
              key={category}
              style={{
                backgroundColor:
                  activeTab === category ? theme.colors.yellow[1] : "",
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
            <CustomerList category={category} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
};

export default CustomerCategories;
