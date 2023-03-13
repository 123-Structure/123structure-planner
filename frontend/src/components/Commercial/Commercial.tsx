import { Tabs, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRessources } from "../../context/RessourceContext";
import CustomerCategories from "./components/Menu/CustomerCategories";
import "../../assets/style/Commercial.css";
import { useMediaQuery } from "@mantine/hooks";
import MobileCustomerMenu from "./components/Menu/MobileCustomerMenu";
import NewCustomer from "./components/Menu/NewCustomer";
import { IconUser } from "@tabler/icons";
import {
  useCustomerRoutes,
  useUpdateCustomerRoutes,
} from "../../context/CustomerRoutes";
import { changeFavicon, changeTabTitle } from "../../utils/tabsUtils";

const Commercial = () => {
  const [activeTab, setActiveTab] = useState<string | null>("");

  const ressources = useRessources();
  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

  const handleCommercialChange = (commercial: string) => {
    setActiveTab(commercial);
    setCustomerRoutes({
      commercial: commercial as string,
      category: "",
      customer: "",
      agency: "",
      appointment: "",
    });
  };

  console.log(customerRoutes);

  useEffect(() => {
    if (activeTab !== "") {
      const commercial = ressources.filter(
        (ressource) => ressource._id === activeTab
      )[0];
      changeFavicon("👷");
      changeTabTitle(
        `123 Structure - ${commercial.firstName} ${commercial.lastName}`
      );
    }
  }, [activeTab]);

  return (
    <>
      <Tabs
        color="yellow"
        variant="pills"
        value={activeTab}
        onTabChange={(val: string) => handleCommercialChange(val)}
        className="commercialContainer"
      >
        <Tabs.List className="commercialList">
          {ressources
            .filter((ressource) => ressource.role.includes("Commercial"))
            .map((ressource) => (
              <Tabs.Tab
                className={`commercialTab ${ressource._id}_Tab`}
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
        {activeTab !== "" ? <MobileCustomerMenu /> : <></>}
      </Tabs>
    </>
  );
};

export default Commercial;
