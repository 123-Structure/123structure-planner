import {
  Avatar,
  Group,
  MultiSelect,
  Text,
} from "@mantine/core";
import {
  IconCalculator,
  IconCrown,
  IconPencil,
  IconStar,
  IconUserExclamation,
} from "@tabler/icons";
import React, { forwardRef } from "react";
import { IRessource } from "../../../../../../data/interfaces/IRessource";
import { TRole } from "../../../../../../data/types/TRole";
import { useRessources } from "../../../../../../hooks/Ressources/useRessources";
import { useUpdateRessources } from "../../../../../../hooks/Ressources/useUpdateRessources";
import { companyColor } from "../../../../../../utils/companyColor";

interface IMultiRoleSelectProps {
  user: IRessource;
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
}

const MultiRoleSelect = (props: IMultiRoleSelectProps) => {
  const ressources = useRessources();
  const setRessources = useUpdateRessources();

  const rolesData = [
    "Dessinateur",
    "Ingénieur",
    "Administrateur",
    "Correcteur",
  ];

  const Icon = (label: string) => {
    if (label === "Dessinateur") {
      return <IconPencil />;
    } else if (label === "Ingénieur") {
      return <IconCalculator />;
    } else if (label === "Administrateur") {
      return <IconCrown />;
    } else if (label === "Correcteur") {
      return <IconStar />;
    } else {
      return <IconUserExclamation />;
    }
  };

  const handleChangeRole = (newRole: string[] | null, user: IRessource) => {
    const newRessources = [...ressources];

    const changedUser = newRessources.filter(
      (ressource) =>
        ressource.firstName === user.firstName &&
        ressource.lastName === user.lastName &&
        ressource.company === user.company &&
        ressource.role === user.role
    );

    changedUser[0].role = newRole as TRole[];

    setRessources(newRessources);
  };

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar
            className="manageUsersModalAvatar"
            size={40}
            radius={40}
            color={companyColor(props.user.company)}
          >
            {Icon(label)}
          </Avatar>

          <div>
            <Text>{label}</Text>
          </div>
        </Group>
      </div>
    )
  );

  return (
    <MultiSelect
      data={rolesData}
      value={props.user.role.sort() as string[]}
      variant="unstyled"
      placeholder="Rôle non défini"
      onChange={(newRole) => handleChangeRole(newRole, props.user)}
      searchable
      nothingFound="Aucun résultat"
      itemComponent={SelectItem}
      clearable
    />
  );
};

export default MultiRoleSelect;
