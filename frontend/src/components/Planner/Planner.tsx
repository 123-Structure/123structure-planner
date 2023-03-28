import "../../assets/style/Planner.css";
import Row from "./components/Grid/Row";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import MustBeAssign from "./components/Grid/MustBeAssign";
import Title from "./components/Grid/Title";
import NewEntry from "./components/Grid/NewEntry";
import { isTouchDevice } from "../../utils/isTouchDevice";
import { useMantineTheme } from "@mantine/core";
import { useAuth } from "../../hooks/Auth/useAuth";
import { useEffect, useState } from "react";
import { IRessource } from "../../data/interfaces/IRessource";
import { TRole } from "../../data/types/TRole";
import { APIBaseUrl } from "../../data/constants/APIBaseUrl";

const Planner = () => {
  const [ressources, setRessources] = useState<IRessource[]>();

  const theme = useMantineTheme();
  const { auth } = useAuth();

  useEffect(() => {
    const getUsersList = async () => {
      const roles: TRole[] = ["Dessinateur", "Ingénieur", "Administrateur"];
      const users = [] as IRessource[];

      for (const role of roles) {
        if (auth.user) {
          const response = await fetch(`${APIBaseUrl}/api/users/${role}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.user.token}`,
            },
          });
          const data = await response.json();
          users.push(...data);
        }
      }

      setRessources(users);
    };
    getUsersList();
  }, [auth.user]);

  return ressources ? (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <div
        className="grid"
        style={{
          gridTemplateRows: `50px 328px 50px repeat(${ressources.length}, minmax(66px, auto))`,
        }}
      >
        <div
          className="mustBeAssignTitle"
          style={{
            backgroundColor: theme.colors.yellow[5],
          }}
        >
          <p>Dossier à attribuer</p>
        </div>
        <MustBeAssign />
        <Title />
        <NewEntry />
        {ressources.map((ressource, index) => (
          <Row
            key={index}
            id={ressource.email.split("@")[0]}
            ressource={ressource}
          />
        ))}
      </div>
    </DndProvider>
  ) : (
    <></>
  );
};

export default Planner;
