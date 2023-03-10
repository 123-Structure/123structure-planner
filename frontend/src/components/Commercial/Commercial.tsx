import { Tabs, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useRessources } from "../../context/RessourceContext";
import CustomerCategories from "./components/Menu/CustomerCategories";
import "../../assets/style/Commercial.css";
import { useMediaQuery } from "@mantine/hooks";
import MobileCustomerMenu from "./components/Menu/MobileCustomerMenu";
import NewCustomer from "./components/Menu/NewCustomer";
import { IconUser } from "@tabler/icons";

const Commercial = () => {
  const [activeTab, setActiveTab] = useState<string | null>("g.barais");

  const ressources = useRessources();
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

  return (
    <>
      <Tabs
        color="yellow"
        variant="pills"
        value={activeTab}
        onTabChange={setActiveTab}
        className="commercialContainer"
      >
        <Tabs.List className="commercialList">
          {ressources
            .filter((ressource) => ressource.role.includes("Commercial"))
            .map((ressource) => (
              <Tabs.Tab
                className="commercialTab"
                key={ressource._id}
                value={ressource._id}
                style={{
                  color: activeTab === ressource._id ? "black" : "",
                }}
                icon={<IconUser size="1rem" />}
              >{`${ressource.firstName} ${ressource.lastName}`}</Tabs.Tab>
            ))}
          <NewCustomer />
        </Tabs.List>
        {ressources
          .filter((ressource) => ressource.role.includes("Commercial"))
          .map((ressource) => (
            <Tabs.Panel
              key={ressource._id}
              value={ressource._id}
              style={{
                display: smallScreen
                  ? "none"
                  : activeTab === ressource._id
                  ? "block"
                  : "",
              }}
            >
              <CustomerCategories />
            </Tabs.Panel>
          ))}
        <MobileCustomerMenu />
      </Tabs>
    </>
  );
};

export default Commercial;
