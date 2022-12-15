import { Avatar, Badge, Checkbox, Group, Select, Text } from "@mantine/core";
import {
  IconCrown,
  IconMathSymbols,
  IconPencil,
  IconUserExclamation,
} from "@tabler/icons";
import { useState } from "react";
import { IRessource } from "../../../../../data/interfaces/IRessource";
import { companyColor } from "../../../../../utils/companyColor";
import { defaultAccessRight } from "../../../../../utils/defaultAccessRight";

const AddUser = () => {
  const [user, setUser] = useState<IRessource>({
    firstName: "John",
    lastName: "DOE",
    company: undefined,
    role: undefined,
  });

  const rolesData = ["Dessinateur", "Ingénieur", "Administrateur"];

  return (
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
  );
};

export default AddUser;
