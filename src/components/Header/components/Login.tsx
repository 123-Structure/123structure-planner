import { useState } from "react";
import { PasswordInput, TextInput } from "@mantine/core";
import { IconAt, IconLock, IconLogin } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { useAuth, useUpdateAuth } from "../../../context/AuthContext";
import CustomButton from "../../utils/CustomButton";

interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const initialState = { email: "", password: "" };

  const [login, setLogin] = useState<ILogin>(initialState);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const setAuth = useUpdateAuth();

  const { email, password } = login;

  const validateEmail = (email: string) => {
    const split = email.split("@");
    if (split.length === 2) {
      if (split[1] === "123structure.fr") {
        return true;
      }
    }
    return false;
  };

  const validatePassword = (password: string) => {
    return password.length >= 5;
  };

  const handleSubmit = () => {
    if (validateEmail(email) && validatePassword(password)) {
      setAuth(true);
      setLogin(initialState);
      setErrorEmail("");
      setErrorPassword("");
      showNotification({
        title: "🎉 Connexion réussi",
        message: "Bonjour, NOM PRENOM",
        color: "green",
      });
    } else {
      validateEmail(email)
        ? setErrorEmail("")
        : setErrorEmail("⛔ Email invalide");
      validatePassword(password)
        ? setErrorPassword("")
        : setErrorPassword("⛔ Mot de passe invalide");
    }
  };

  return (
    <div className="login">
      <div>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="contact@123structure.fr"
          description="Renseigner votre adresse mail 123 Structure"
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
      />
    </div>
  );
};

export default Login;
