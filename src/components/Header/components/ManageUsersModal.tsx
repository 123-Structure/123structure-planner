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
import {
  IconCrown,
  IconMathSymbols,
  IconPencil,
  IconUserExclamation,
} from "@tabler/icons";
import { Dispatch, SetStateAction } from "react";
import { RessourceData } from "../../../data/constants/RessourceData";

interface IManageUsersModalProps {
  openManageUser: boolean;
  setOpenManageUser: Dispatch<SetStateAction<boolean>>;
}

const ManageUsersModal = (props: IManageUsersModalProps) => {
  const rolesData = ["Dessinateur", "Ingénieur", "Administrateur"];

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

  const rows = RessourceData.map((user) => (
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
        />
      </td>
      <td>
        <Badge color={companyColor(user.company)}>
          {user.company ? user.company : "Non défini"}
        </Badge>
      </td>
      <td>
        <Checkbox />
      </td>
      <td>
        <Checkbox />
      </td>
      <td>
        <Checkbox />
      </td>
      <td>
        <Checkbox />
      </td>
      <td>
        <Checkbox />
      </td>
      <td>
        <Checkbox />
      </td>
    </tr>
  ));

  return (
    <Modal
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={props.openManageUser}
      onClose={() => props.setOpenManageUser(false)}
      size="calc(window.screen.width-25%)"
      padding={"xl"}
    >
      <ScrollArea style={{ height: "900px" }} offsetScrollbars>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
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
