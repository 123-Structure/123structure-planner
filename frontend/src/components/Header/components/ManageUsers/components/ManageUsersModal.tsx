import {
  Avatar,
  Badge,
  Checkbox,
  Group,
  Modal,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCrown,
  IconMathSymbols,
  IconPencil,
  IconSettings,
  IconStar,
  IconUserExclamation,
} from "@tabler/icons";
import { Dispatch, SetStateAction } from "react";
import { useRessources } from "../../../../../context/RessourceContext";
import { companyColor } from "../../../../../utils/companyColor";
import { defaultAccessRight } from "../../../../../utils/defaultAccessRight";
import ModalTitle from "../../../../utils/ModalTitle";
import AddUser from "./AddUser";
import MultiFixerSelect from "./MultiSelect/MultiFixerSelect";
import MultiRoleSelect from "./MultiSelect/MultiRoleSelect";

interface IManageUsersModalProps {
  openManageUser: boolean;
  setOpenManageUser: Dispatch<SetStateAction<boolean>>;
}

const ManageUsersModal = (props: IManageUsersModalProps) => {
  const ressources = useRessources();

  const isSmallScreen = useMediaQuery("(max-width: 1300px)");

  const rows = ressources.map((user) => (
    <tr key={`${user.firstName}_${user.lastName}`}>
      <td>
        <Group spacing="sm">
          <div style={{ maxWidth: "90px", display: "grid" }}>
            {user.role.length === 0 ? (
              <Avatar
                size={40}
                radius={40}
                style={{ marginBottom: "6px" }}
                color={companyColor(user.company)}
              >
                <IconUserExclamation />
              </Avatar>
            ) : (
              user.role.sort().map((r) => (
                <Avatar
                  size={40}
                  radius={40}
                  style={{ marginBottom: "6px" }}
                  color={companyColor(user.company)}
                >
                  {r?.includes("Dessinateur") ? (
                    <IconPencil />
                  ) : r?.includes("Ingénieur") ? (
                    <IconMathSymbols />
                  ) : r?.includes("Administrateur") ? (
                    <IconCrown />
                  ) : r?.includes("Correcteur") ? (
                    <IconStar />
                  ) : (
                    <IconUserExclamation />
                  )}
                </Avatar>
              ))
            )}
          </div>

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
      <td style={{ maxWidth: "215px" }}>
        <MultiRoleSelect user={user} />
      </td>
      <td>
        <Badge color={companyColor(user.company)}>
          {user.company ? user.company : "Non défini"}
        </Badge>
      </td>
      <td style={{ maxWidth: "215px" }}>
        <MultiFixerSelect user={user} />
      </td>
      <td>
        <Checkbox checked={defaultAccessRight(user.role).newEntry} />
      </td>
      <td>
        <Checkbox checked={defaultAccessRight(user.role).mustBeAssign} />
      </td>
      <td>
        <Checkbox checked={defaultAccessRight(user.role).invoicing} />
      </td>
      <td>
        <Checkbox checked={defaultAccessRight(user.role).correction} />
      </td>
      <td>
        <Checkbox checked={defaultAccessRight(user.role).mustBeFix} />
      </td>
      <td>
        <Checkbox checked={defaultAccessRight(user.role).week} />
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
        <ModalTitle
          icon={<IconSettings size={24} />}
          title="Réglage des utilisateurs"
        />
      }
    >
      {/* <AddUser /> */}
      <ScrollArea style={{ height: "900px" }} offsetScrollbars>
        <Table sx={{ minWidth: 1250 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Rôle</th>
              <th>Agence</th>
              <th>Correcteur</th>
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
