import { Tabs } from "@mantine/core";
import React from "react";



const Agence = () => {
  return (
    <Tabs
      color="yellow"
      orientation="vertical"
      defaultValue="agenceConstructeur0"
    >
      <Tabs.List>
        {Array.from({ length: 10 }).map((el, index) => (
          <Tabs.Tab
            key={`agenceConstructeur${index}`}
            value={`agenceConstructeur${index}`}
          >
            {`Agence Constructeur ${index}`}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {Array.from({ length: 10 }).map((el, index) => (
        <Tabs.Panel
          key={`constructeur${index}`}
          value={`agenceConstructeur${index}`}
        >
          {`Agence Constructeur ${index} content`}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default Agence;
