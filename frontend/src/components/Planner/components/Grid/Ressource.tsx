import { Avatar, Group, Text } from "@mantine/core";
import {
  IconCrown,
  IconCalculator,
  IconPencil,
  IconStar,
  IconUserExclamation,
} from "@tabler/icons";
import { IRessource } from "../../../../data/interfaces/IRessource";
import { companyColor } from "../../../../utils/companyColor";

interface IRessourceProps {
  ressource: IRessource;
}

const Ressource = (props: IRessourceProps) => {
  return (
    <div className="ressource">
      <div className="ressourceItem">
        <div>
          <Avatar
            size={40}
            radius={40}
            color={companyColor(props.ressource.company)}
          >
            {props.ressource.role.includes("Dessinateur") ? (
              <IconPencil />
            ) : props.ressource.role.includes("Ingénieur") ? (
              <IconCalculator />
            ) : props.ressource.role.includes("Administrateur") ? (
              <IconCrown />
            ) : props.ressource.role.includes("Correcteur") ? (
              <IconStar />
            ) : (
              <IconUserExclamation />
            )}
          </Avatar>
        </div>

        <div>
          <Text size="sm" weight={500}>
            {`${props.ressource.firstName} ${props.ressource.lastName}`}
          </Text>
          <Text size="xs" color="dimmed">
            {`${props.ressource.firstName[0].toLowerCase()}.${props.ressource.lastName.toLowerCase()}@123structure.fr`}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Ressource;
