import { useEffect, useState } from "react";
import { PasswordInput, TextInput, useMantineTheme } from "@mantine/core";
import {
  IconAt,
  IconBriefcase,
  IconCalculator,
  IconCrown,
  IconLock,
  IconLogin,
  IconLogout,
  IconPencil,
  IconUser,
} from "@tabler/icons";
import CustomButton from "../../utils/CustomButton";
import { useMediaQuery } from "@mantine/hooks";
import validator from "validator";
import { useLogin } from "../../../hooks/Auth/useLogin";
import { useLogout } from "../../../hooks/Auth/useLogout";
import { useAuth } from "../../../hooks/Auth/useAuth";
import "../../../assets/style/Auth.css";
import { useUserData } from "../../../hooks/Auth/useUserData";

interface ILogin {
  email: string;
  password: string;
}

const Auth = () => {
  const initialState: ILogin = { email: "", password: "" };

  const [loginFormData, setLoginFormData] = useState(initialState);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const { login, isLoading } = useLogin();
  const { logout } = useLogout();
  const userData = useUserData();

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const { email, password } = loginFormData;

  const handleSubmit = async () => {
    if (validator.isEmail(email) && validator.isStrongPassword(password)) {
      const fetchLogin = await login(email, password);

      if (
        fetchLogin === "Utilisateur inconnu" ||
        fetchLogin === "Mot de passe erronée"
      ) {
        setErrorPassword("");
        setErrorEmail("");
      } else {
        setLoginFormData(initialState);
      }
    } else {
      validator.isEmail(email)
        ? setErrorEmail("")
        : setErrorEmail("Email invalide");
      validator.isStrongPassword(password)
        ? setErrorPassword("")
        : setErrorPassword("Mot de passe invalide");
    }
  };

  return (
    <div
      className="auth"
      style={{
        flexDirection: smallScreen ? "column" : "row",
      }}
    >
      {localStorage.getItem("user") === null ? (
        <>
          <div>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) =>
                setLoginFormData({ email: e.currentTarget.value, password })
              }
              icon={<IconAt size={14} />}
              error={errorEmail}
            />
            <PasswordInput
              withAsterisk
              label="Mot de passe"
              placeholder="**********"
              value={password}
              onChange={(e) =>
                setLoginFormData({ email, password: e.currentTarget.value })
              }
              icon={<IconLock size={16} />}
              error={errorPassword}
            />
          </div>

          <CustomButton
            handleClick={handleSubmit}
            icon={<IconLogin />}
            label={"Se Connecter"}
            extraStyle={
              smallScreen
                ? {
                    width: "100%",
                    marginBottom: "8px",
                  }
                : {}
            }
            disabled={isLoading}
          />
        </>
      ) : userData ? (
        <div>
          <div
            id="userInfoContainer"
            style={{
              alignItems: smallScreen ? "center" : "flex-start",
            }}
          >
            <div id="userInfo">
              {userData.role.includes("Dessinateur") ? (
                <IconPencil />
              ) : userData.role.includes("Ingénieur") ? (
                <IconCalculator />
              ) : userData.role.includes("Administrateur") ? (
                <IconCrown />
              ) : userData.role.includes("Commercial") ? (
                <IconBriefcase />
              ) : (
                <IconUser />
              )}
              <p>{`${userData.firstName} ${userData.lastName}`}</p>
            </div>
            <p id="userRole">{`${userData.role.map((role, index) =>
              index > 0 ? ` ${role}` : role
            )} - ${userData.company}`}</p>
          </div>
          <CustomButton
            handleClick={() => logout()}
            icon={<IconLogout />}
            label={"Se Déconnecter"}
            extraStyle={
              smallScreen
                ? {
                    width: "100%",
                    marginBottom: "8px",
                  }
                : {}
            }
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Auth;
