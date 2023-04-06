import AddProjectFromExcel from "./components/AddProjectFromExcel/AddProjectFromExcel";
import logo from "../../assets/img/logo.png";
import ManageUsers from "./components/ManageUsers/ManageUsers";
import Auth from "./components/Auth";
import "../../assets/style/Header.css";
import animationData from "../../assets/lottie/loader-buildings.json";
import Lottie from "react-lottie";
import SearchBar from "./components/SearchBar/SearchBar";
import {
  ActionIcon,
  Affix,
  Transition,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { useAuth } from "../../hooks/Auth/useAuth";
import { useUserData } from "../../hooks/Auth/useUserData";
import {
  IconArrowUp,
  IconBriefcase,
  IconBulb,
  IconCalendarEvent,
  IconHelp,
} from "@tabler/icons";
import { useUpdateRouter } from "../../hooks/Router/useUpdateRouter";
import CustomTooltip from "../utils/CustomTooltip";
import { HelpUrl } from "../../data/constants/HelpUrl";

const Header = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { auth } = useAuth();

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const userData = useUserData();
  const setRouter = useUpdateRouter();

  const openURL = (url: string) => {
    window.open(url, "_blank");
  };

  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      {/* <LottieLoader visible={true} /> */}
      <div className={`header ${smallScreen ? "header-mobile" : ""}`}>
        <div className={`menu ${smallScreen ? "menu-mobile" : ""}`}>
          <div className="router">
            <CustomTooltip
              label="Planning"
              withArrow={false}
              transition="slide-down"
              delay={500}
            >
              <ActionIcon
                size="xl"
                variant="filled"
                color={"yellow"}
                onClick={() => setRouter("Planning")}
                disabled={
                  !userData?.role.includes("Dessinateur") &&
                  !userData?.role.includes("Ingénieur") &&
                  !userData?.role.includes("Administrateur")
                }
              >
                <IconCalendarEvent size={24} color="black" />
              </ActionIcon>
            </CustomTooltip>
            <CustomTooltip
              label="Commercial"
              withArrow={false}
              transition="slide-down"
              delay={500}
            >
              <ActionIcon
                size="xl"
                variant="filled"
                color={"yellow"}
                onClick={() => setRouter("Commercial")}
                disabled={
                  !userData?.role.includes("Commercial") &&
                  !userData?.role.includes("Administrateur")
                }
              >
                <IconBriefcase size={24} color="black" />
              </ActionIcon>
            </CustomTooltip>
          </div>
          <div
            className="router"
            style={{
              marginRight: userData?.role.includes("Administrateur")
                ? 0
                : "8px",
              borderRight: userData?.role.includes("Administrateur")
                ? ""
                : "1px solid #dfe2e6",
            }}
          >
            <CustomTooltip
              label="Aide en ligne"
              withArrow={false}
              transition="slide-down"
              delay={500}
            >
              <ActionIcon
                size="xl"
                variant="filled"
                color={"yellow"}
                onClick={() => openURL(HelpUrl)}
                disabled={!userData}
              >
                <IconHelp size={24} color="black" />
              </ActionIcon>
            </CustomTooltip>
            <CustomTooltip
              label="Boîte à idées"
              withArrow={false}
              transition="slide-down"
              delay={500}
            >
              <ActionIcon
                size="xl"
                variant="filled"
                color={"yellow"}
                onClick={() =>
                  openURL(import.meta.env.VITE_SUGGESTION_MSTEAM_URL)
                }
                disabled={!userData}
              >
                <IconBulb size={24} color="black" />
              </ActionIcon>
            </CustomTooltip>
          </div>
          {userData?.role.includes("Administrateur") ? (
            <div className="admin">
              <ManageUsers />
              <AddProjectFromExcel />
            </div>
          ) : (
            <></>
          )}
          <Auth />
        </div>
        {auth.user ? <SearchBar /> : <></>}
        <div className="logoHeaderContainer">
          <Lottie
            options={defaultOptions}
            height={"125px"}
            style={{
              marginBottom: "-6px",
            }}
          />
          <img id="LogoHeader" src={logo} alt="logo" />
        </div>
      </div>
      <Affix position={{ bottom: rem(20), right: rem(20) }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              color="yellow"
              size="xl"
              radius="md"
              variant="filled"
              style={{
                ...transitionStyles,
              }}
              onClick={() => scrollTo({ y: 0 })}
            >
              <IconArrowUp size="2.125rem" />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default Header;
