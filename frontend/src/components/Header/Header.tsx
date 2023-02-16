import AddProjectFromExcel from "./components/AddProjectFromExcel/AddProjectFromExcel";
import logo from "../../assets/img/logo.png";
import ManageUsers from "./components/ManageUsers/ManageUsers";
import Login from "./components/Login";
import "../../assets/style/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="menu">
        <div className="admin">
          <ManageUsers />
          <AddProjectFromExcel />
        </div>
        <Login />
      </div>
      <img id="logoHeader" src={logo} alt="logo" />
    </div>
  );
};

export default Header;
