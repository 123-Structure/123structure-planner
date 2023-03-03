import {
  Flex,
  Input,
  Kbd,
  Modal,
  Tabs,
  TextInput,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import {
  getHotkeyHandler,
  useFocusTrap,
  useHotkeys,
  useMediaQuery,
} from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { useState } from "react";
import { IDataFromAPI } from "../../../../data/interfaces/IDataFromAPI";
import CustomTitle from "../../../utils/CustomTitle";
import SearchBarItem from "./components/SearchBarItem";

const SearchBar = () => {
  const [openSearchBarModal, setOpenSearchBarModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("quickSearch");
  const [query, setQuery] = useState("");
  const [actions, setActions] = useState<IDataFromAPI[]>([]);

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

  document.body.addEventListener(
    "keydown",
    getHotkeyHandler([
      ["Ctrl+/", () => setOpenSearchBarModal(!openSearchBarModal)],
    ])
  );

  const handleCloseModal = () => {
    setActiveTab("quickSearch");
    setOpenSearchBarModal(false);
  };

  const handleSearchQuery = async (query: string) => {
    const APIBaseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(
      `${APIBaseUrl}/api/customers/search/${query}`,
      {
        method: "GET",
      }
    );
    const data = (await response.json()) as IDataFromAPI[];
    setActions(data);
  };

  const handleQueryChange = (query: string) => {
    setQuery(query);
    if (query.length >= 3) {
      handleSearchQuery(query);
    }
  };

  return (
    <>
      <Input
        className={"searchBar"}
        icon={<IconSearch size="1rem" />}
        placeholder="Rechercher ..."
        rightSectionWidth={95}
        rightSection={
          <Flex align="center">
            <Kbd mr={5}>Ctrl</Kbd>
            <span>+</span>
            <Kbd ml={5}>/</Kbd>
          </Flex>
        }
        styles={(theme) => ({
          input: {
            "&:focus-within": {
              borderColor: theme.colors.gray[4],
            },
          },
        })}
        onClick={() => setOpenSearchBarModal(true)}
      />
      <Modal
        fullScreen={smallScreen}
        // centered
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
            <TextInput
              data-autofocus
              placeholder="Terme(s) recherché(s)..."
              icon={<IconSearch size="0.8rem" />}
              value={query}
              onChange={(event) => handleQueryChange(event.currentTarget.value)}
              style={{
                margin: "16px 0 16px 0",
              }}
            />
            {actions.map((action) => (
              <SearchBarItem action={action} />
            ))}
          </Tabs.Panel>
          <Tabs.Panel
            value="advanceSearch"
            style={{
              marginTop: "16px",
            }}
          >
            Recherche Avancée
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  );
};

export default SearchBar;
