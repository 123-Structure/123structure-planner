import { useState } from "react";
import { PasswordInput, TextInput, useMantineTheme } from "@mantine/core";
import { IconAt, IconLock, IconLogin } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import CustomButton from "../../utils/CustomButton";
import { useMediaQuery } from "@mantine/hooks";
import validator from "validator";

interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const initialState = { email: "", password: "" };

  const [login, setLogin] = useState<ILogin>(initialState);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const { email, password } = login;

  const handleSubmit = () => {
    if (validator.isEmail(email) && validator.isStrongPassword(password)) {
      setLogin(initialState);
      setErrorEmail("");
      setErrorPassword("");
      showNotification({
        title: "🎉 Connexion réussi",
        message: "Bonjour, NOM PRENOM",
        color: "green",
      });
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
      className="login"
      style={{
        flexDirection: smallScreen ? "column" : "row",
      }}
    >
      <div>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setLogin({ email: e.currentTarget.value, password })}
          icon={<IconAt size={14} />}
          error={errorEmail}
        />
        <PasswordInput
          withAsterisk
          label="Mot de passe"
          placeholder="**********"
          value={password}
          onChange={(e) => setLogin({ email, password: e.currentTarget.value })}
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
      />
    </div>
  );
};

export default Login;
