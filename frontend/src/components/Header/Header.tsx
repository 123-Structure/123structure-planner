import AddProjectFromExcel from "./components/AddProjectFromExcel/AddProjectFromExcel";
import logo from "../../assets/img/logo.png";
import ManageUsers from "./components/ManageUsers/ManageUsers";
import Login from "./components/Login";
import "../../assets/style/Header.css";
import animationData from "../../assets/lottie/loader-buildings.json";
import Lottie from "react-lottie";
import SearchBar from "./components/SearchBar/SearchBar";
import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import LottieLoader from "../utils/LottieLoader";

const Header = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    <>
      {/* <LottieLoader visible={true} /> */}
      <div className={`header ${smallScreen ? "header-mobile" : ""}`}>
        <div className={`menu ${smallScreen ? "menu-mobile" : ""}`}>
          {!smallScreen ? (
            <div className="admin">
              <ManageUsers />
              <AddProjectFromExcel />
            </div>
          ) : (
            <></>
          )}
          <Login />
        </div>
        <SearchBar />
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
    </>
  );
};

export default Header;
