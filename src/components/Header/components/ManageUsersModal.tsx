import {
  ActionIcon,
  Avatar,
  Badge,
  Checkbox,
  Group,
  Modal,
  ScrollArea,
  Select,
  Table,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCrown,
  IconMathSymbols,
  IconPencil,
  IconSettings,
  IconUserExclamation,
} from "@tabler/icons";
import { Dispatch, SetStateAction, useState } from "react";
import {
  useRessources,
  useUpdateRessources,
} from "../../../context/RessourceContext";
import { IRessource } from "../../../data/interfaces/IRessource";

interface IManageUsersModalProps {
  openManageUser: boolean;
  setOpenManageUser: Dispatch<SetStateAction<boolean>>;
}

const ManageUsersModal = (props: IManageUsersModalProps) => {
  const ressources = useRessources();
  const setRessources = useUpdateRessources();

  const isSmallScreen = useMediaQuery("(max-width: 1300px)");
  const rolesData = ["Dessinateur", "Ingénieur", "Administrateur"];

  const defaultValue = (role: string | undefined) => {
    return {
      mustBeAssign: role === "Administrateur",
      newEntry: role === "Administrateur",
      invoicing: role === "Administrateur",
      correction:
        role === "Administrateur" ||
        role === "Dessinateur" ||
        role === "Ingénieur",
      mustBeFix:
        role === "Administrateur" ||
        role === "Dessinateur" ||
        role === "Ingénieur",
      week:
        role === "Administrateur" ||
        role === "Dessinateur" ||
        role === "Ingénieur",
    };
  };

  const companyColor = (company: string | undefined) => {
    if (company !== undefined) {
      switch (company) {
        case "Clisson":
          return "yellow";
          break;
        case "Anglet":
          return "violet";
          break;
        case "Villefranche-sur-Saône":
          return "red";
          break;
        case "Global":
          return "green";
          break;

        default:
          return "dark";
          break;
      }
    } else {
      return "dark";
    }
  };

  const handleChangeRole = (newRole: string | null, user: IRessource) => {
    const newRessources = [...ressources];

    const changedUser = newRessources.filter(
      (ressource) =>
        ressource.firstName === user.firstName &&
        ressource.lastName === user.lastName &&
        ressource.company === user.company &&
        ressource.role === user.role
    );

    changedUser[0].role = newRole as
      | "Dessinateur"
      | "Ingénieur"
      | "Administrateur"
      | undefined;

    setRessources(newRessources);
  };

  const rows = ressources.map((user) => (
    <tr key={`${user.firstName}_${user.lastName}`}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} radius={40} color={companyColor(user.company)}>
            {user.role === "Dessinateur" ? (
              <IconPencil />
            ) : user.role === "Ingénieur" ? (
              <IconMathSymbols />
            ) : user.role === "Administrateur" ? (
              <IconCrown />
            ) : (
              <IconUserExclamation />
            )}
          </Avatar>
          <div>
            <Text size="sm" weight={500}>
              {`${user.firstName} ${user.lastName}`}
            </Text>
            <Text size="xs" color="dimmed">
              {`${user.firstName[0].toLowerCase()}.${user.lastName.toLowerCase()}@123structure.fr`}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Select
          data={rolesData}
          defaultValue={user.role}
          variant="unstyled"
          placeholder="Rôle non défini"
          onChange={(newRole) => handleChangeRole(newRole, user)}
        />
      </td>
      <td>
        <Badge color={companyColor(user.company)}>
          {user.company ? user.company : "Non défini"}
        </Badge>
      </td>
      <td>
        <Checkbox checked={defaultValue(user.role).newEntry} />
      </td>
      <td>
        <Checkbox checked={defaultValue(user.role).mustBeAssign} />
      </td>
      <td>
        <Checkbox checked={defaultValue(user.role).invoicing} />
      </td>
      <td>
        <Checkbox checked={defaultValue(user.role).correction} />
      </td>
      <td>
        <Checkbox checked={defaultValue(user.role).mustBeFix} />
      </td>
      <td>
        <Checkbox checked={defaultValue(user.role).week} />
      </td>
    </tr>
  ));

  return (
    <Modal
      centered
      fullScreen={isSmallScreen}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={props.openManageUser}
      onClose={() => props.setOpenManageUser(false)}
      size="calc(window.screen.width-25%)"
      padding={"xl"}
      title={
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconSettings
            size={24}
            color="black"
            style={{ marginRight: "8px" }}
          />
          <h2 style={{ margin: 0 }}>Réglage des utilisateurs</h2>
        </div>
      }
    >
      <ScrollArea style={{ height: "900px" }} offsetScrollbars>
        <Table sx={{ minWidth: 1250 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Rôle</th>
              <th>Agence</th>
              <th>Nouvelle entrée</th>
              <th>A Attribuer</th>
              <th>Facturation</th>
              <th>Correction</th>
              <th>Reprise</th>
              <th>Semaines</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Modal>
  );
};

export default ManageUsersModal;
