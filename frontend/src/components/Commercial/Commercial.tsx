import { Tabs } from "@mantine/core";
import { useState } from "react";
import { useRessources } from "../../context/RessourceContext";
import { companyColor } from "../../utils/companyColor";
import CustomerCategories from "./components/CustomerCategories";
import "../../assets/style/Commercial.css";

const Commercial = () => {
  const [activeTab, setActiveTab] = useState<string | null>("g.barais");
  const ressources = useRessources();

  return (
    <Tabs
      color={companyColor(
        ressources.filter((ressource) => ressource._id === activeTab)[0].company
      )}
      variant="pills"
      value={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.List>
        {ressources
          .filter((ressource) => ressource.role.includes("Commercial"))
          .map((ressource) => (
            <Tabs.Tab
              className="commercialTab"
              key={ressource._id}
              value={ressource._id}
              style={{
                color:
                  activeTab === ressource._id && ressource.company === "Clisson"
                    ? "black"
                    : "",
              }}
            >{`${ressource.firstName} ${ressource.lastName}`}</Tabs.Tab>
          ))}
      </Tabs.List>
      {ressources
        .filter((ressource) => ressource.role.includes("Commercial"))
        .map((ressource) => (
          <Tabs.Panel key={ressource._id} value={ressource._id}>
            <CustomerCategories
              color={companyColor(
                ressources.filter((ressource) => ressource._id === activeTab)[0]
                  .company
              )}
            />
          </Tabs.Panel>
        ))}
    </Tabs>
  );
};

export default Commercial;
