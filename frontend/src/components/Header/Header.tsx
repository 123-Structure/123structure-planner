import AddProjectFromExcel from "./components/AddProjectFromExcel/AddProjectFromExcel";
import logo from "../../assets/img/logo.png";
import ManageUsers from "./components/ManageUsers/ManageUsers";
import Login from "./components/Login";
import "../../assets/style/Header.css";
import animationData from "../../assets/lottie/loader-buildings.json";
import Lottie from "react-lottie";

const Header = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="header">
      <div className="menu">
        <div className="admin">
          <ManageUsers />
          <AddProjectFromExcel />
        </div>
        <Login />
      </div>
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
  );
};

export default Header;
