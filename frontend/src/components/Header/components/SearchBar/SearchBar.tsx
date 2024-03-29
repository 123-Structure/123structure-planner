import {
  Flex,
  Input,
  Kbd,
  Modal,
  Tabs,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { useEffect, useState } from "react";
import { ISearchDataFromAPI } from "../../../../data/interfaces/ISearchDataFromAPI";
import CustomTitle from "../../../utils/CustomTitle";
import SearchBarItem from "./components/SearchBarItem";
import ProfilingBro from "../../../../assets/img/Profiling-bro.svg";
import BrickLayerBro from "../../../../assets/img/Bricklayer-bro.svg";
import "../../../../assets/style/SearchBar.css";
import { changeFavicon, changeTabTitle } from "../../../../utils/tabsUtils";
import { useUpdateCustomerRoutes } from "../../../../hooks/CustomerRoutes/useUpdateCustomerRoutes";
import { useAuth } from "../../../../hooks/Auth/useAuth";
import { showNotification } from "@mantine/notifications";
import { APIBaseUrl } from "../../../../data/constants/APIBaseUrl";
import { useLogout } from "../../../../hooks/Auth/useLogout";

const SearchBar = () => {
  const [openSearchBarModal, setOpenSearchBarModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("quickSearch");
  const [query, setQuery] = useState("");
  const [actions, setActions] = useState<ISearchDataFromAPI[]>([]);

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const mediumScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const setCustomerRoutes = useUpdateCustomerRoutes();
  const { auth } = useAuth();
  const { logout } = useLogout();

  const handleCloseModal = () => {
    setOpenSearchBarModal(false);
    setActiveTab("quickSearch");
    setQuery("");
    setActions([]);
  };

  const handleSearchQuery = async (query: string) => {
    if (auth.user) {
      const response = await fetch(
        `${APIBaseUrl}/api/customers/search/${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );

      if (response.status === 401) {
        logout();
        showNotification({
          title: "🔒 Authentification requise",
          message: "Session expirée",
          color: "red",
        });
      } else {
        const data = (await response.json()) as ISearchDataFromAPI[];
        setActions(data);
      }
    }
  };

  const handleQueryChange = (query: string) => {
    setQuery(query);
    if (query.length >= 3) {
      handleSearchQuery(query);
    }
  };

  useEffect(() => {
    if (query.length < 3) {
      setActions([]);
    }
  }, [query]);

  return (
    <>
      <Input
        className={`searchBar ${mediumScreen ? "searchBar-medium" : ""} ${
          smallScreen ? "searchBar-mobile" : ""
        }`}
        value={""}
        icon={<IconSearch size="1rem" />}
        placeholder="Rechercher ..."
        styles={(theme) => ({
          input: {
            "&:focus-within": {
              borderColor: theme.colors.gray[4],
            },
          },
        })}
        onClick={() => {
          setCustomerRoutes({
            commercial: "",
            category: "",
            customer: "",
            agency: "",
            appointment: "",
          });
          setOpenSearchBarModal(true);
          changeFavicon("🔎");
          changeTabTitle(`123 Structure - Recherche`);
        }}
      />
      <Modal
        fullScreen={smallScreen}
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        opened={openSearchBarModal}
        onClose={handleCloseModal}
        padding={"xl"}
        size="lg"
        title={
          <div className="contactModalTitle">
            <CustomTitle
              flexStart={true}
              icon={<IconSearch size={24} />}
              title={"Recherche"}
            />
          </div>
        }
      >
        <Tabs value={activeTab} onTabChange={setActiveTab}>
          <Tabs.List grow>
            <Tabs.Tab value="quickSearch">Recherche Rapide</Tabs.Tab>
            <Tabs.Tab value="advanceSearch">Recherche Avancée</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel
            value="quickSearch"
            style={{
              marginTop: "16px",
            }}
          >
            <>
              <TextInput
                data-autofocus
                placeholder="Terme(s) recherché(s)..."
                icon={<IconSearch size="1.1rem" />}
                size={"md"}
                value={query}
                onChange={(event) =>
                  handleQueryChange(event.currentTarget.value)
                }
                style={{
                  margin: "16px 0 16px 0",
                }}
              />
              {actions.length === 0 ? (
                <div className="searchImage searchImageFullTextSearch">
                  <img src={ProfilingBro} alt="profiling" />
                  <p>Aucun résultat...</p>
                </div>
              ) : (
                actions.map((action) =>
                  action.results.map((result, key) => (
                    <SearchBarItem
                      key={key}
                      action={action}
                      result={result}
                      setOpenSearchBarModal={setOpenSearchBarModal}
                      setQuery={setQuery}
                    />
                  ))
                )
              )}
            </>
          </Tabs.Panel>
          <Tabs.Panel
            value="advanceSearch"
            style={{
              marginTop: "16px",
            }}
          >
            <div className="searchImage searchImageInConstruction">
              <img src={BrickLayerBro} alt="bricklayer" />
              <p>En cours de construction...</p>
            </div>
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  );
};

export default SearchBar;
