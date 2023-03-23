import { Tabs, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import CustomerCategories from "./components/Menu/CustomerCategories";
import "../../assets/style/Commercial.css";
import { useMediaQuery } from "@mantine/hooks";
import MobileCustomerMenu from "./components/Menu/MobileCustomerMenu";
import NewCustomer from "./components/Menu/NewCustomer";
import { IconUser } from "@tabler/icons";
import { changeFavicon, changeTabTitle } from "../../utils/tabsUtils";
import { useCustomerRoutes } from "../../hooks/CustomerRoutes/useCustomerRoutes";
import { useUpdateCustomerRoutes } from "../../hooks/CustomerRoutes/useUpdateCustomerRoutes";
import { useUpdateCustomer } from "../../hooks/Customer/useUpdateCustomer";
import { useAuth } from "../../hooks/Auth/useAuth";
import WebsiteCreatorBro from "../../assets/img/Website Creator-bro.svg";
import { IApiUserList } from "../../data/interfaces/IApiUserList";
import { useUserData } from "../../hooks/Auth/useUserData";

const Commercial = () => {
  const [commercialList, setCommercialList] = useState<IApiUserList[]>();
  const [activeTab, setActiveTab] = useState<string | null>("");

  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();
  const setCustomer = useUpdateCustomer();
  const { auth } = useAuth();
  const userData = useUserData();

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

  useEffect(() => {
    const getUsersList = async () => {
      if (auth.user) {
        const APIBaseUrl = import.meta.env.VITE_API_URL;

        const response = await fetch(`${APIBaseUrl}/api/users/Commercial`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        });
        const data = await response.json();
        setCommercialList(data);
      }
    };
    getUsersList();
  }, [auth.user]);

  useEffect(() => {
    if (customerRoutes.commercial !== "") {
    }
    setActiveTab(customerRoutes.commercial);
  }, [customerRoutes.commercial]);

  useEffect(() => {
    if (activeTab !== "" && commercialList !== undefined) {
      const commercial = commercialList.filter(
        (commercial) => commercial.email.split("@")[0] === activeTab
      )[0];
      setCustomer(undefined);
      changeFavicon("👷");
      changeTabTitle(
        `123 Structure - ${commercial.firstName} ${commercial.lastName}`
      );
    }
  }, [activeTab]);

  return userData?.role.includes("Commercial") ? (
    <Tabs
      color="yellow"
      variant="pills"
      value={activeTab}
      onTabChange={(val: string) => handleCommercialChange(val)}
      className="commercialContainer"
    >
      <Tabs.List className="commercialList">
        {commercialList
          ?.sort((a, b) => {
            if (a.firstName < b.firstName) {
              return -1;
            }
            if (a.firstName > b.firstName) {
              return 1;
            }
            return 0;
          })
          .map((commercial) => (
            <Tabs.Tab
              className={`commercialTab ${commercial.email.split("@")[0]}_Tab`}
              key={commercial.email.split("@")[0]}
              value={commercial.email.split("@")[0]}
              style={{
                color:
                  activeTab === commercial.email.split("@")[0] ? "black" : "",
              }}
              icon={<IconUser size="1rem" />}
            >{`${commercial.firstName} ${commercial.lastName}`}</Tabs.Tab>
          ))}
        <NewCustomer />
      </Tabs.List>
      {commercialList?.map((commercial) => (
        <Tabs.Panel
          key={commercial.email.split("@")[0]}
          value={commercial.email.split("@")[0]}
          style={{
            display: smallScreen
              ? "none"
              : activeTab === commercial.email.split("@")[0]
              ? "block"
              : "",
          }}
        >
          <CustomerCategories />
        </Tabs.Panel>
      ))}
      {activeTab !== "" ? <MobileCustomerMenu /> : <></>}
    </Tabs>
  ) : (
    <img
      style={{
        width: smallScreen ? "100%" : "450px",
      }}
      src={WebsiteCreatorBro}
      alt="login"
    ></img>
  );
};

export default Commercial;
