import { LoadingOverlay, Tabs, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRessources } from "../../context/RessourceContext";
import CustomerCategories from "./components/Menu/CustomerCategories";
import "../../assets/style/Commercial.css";
import { useMediaQuery } from "@mantine/hooks";
import MobileCustomerMenu from "./components/Menu/MobileCustomerMenu";
import NewCustomer from "./components/Menu/NewCustomer";
import { useCustomers } from "../../context/CustomerContext";
import { changeFavicon, changeTabTitle } from "../../utils/tabsUtils";

const Commercial = () => {
  const [activeTab, setActiveTab] = useState<string | null>("");

  const ressources = useRessources();
  const { customers, updateCustomers } = useCustomers();
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

  useEffect(() => {
    const fetchCustomers = async () => {
      const APIBaseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${APIBaseUrl}/api/customers`, {
        method: "GET",
      });
      const data = await response.json();

      if (response.ok) {
        updateCustomers({ type: "SET_CUSTOMER", payload: data });
      }
    };
    fetchCustomers();
    changeFavicon("👷");
    changeTabTitle("123 Structure - Client");
  }, []);

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
