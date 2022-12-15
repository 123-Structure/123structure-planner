import { Avatar, Group, Text, useMantineTheme } from "@mantine/core";
import {
  IconCrown,
  IconMathSymbols,
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
  const theme = useMantineTheme();

  return (
    <Group
      className="ressource"
      spacing="sm"
      style={{
        paddingLeft: "8px",
      }}
    >
      <div style={{ maxWidth: "90px", display: "grid" }}>
        <Avatar
          size={40}
          radius={40}
          style={{ marginBottom: "6px" }}
          color={companyColor(props.ressource.company)}
        >
          {props.ressource.role.includes("Dessinateur") ? (
            <IconPencil />
          ) : props.ressource.role.includes("Ingénieur") ? (
            <IconMathSymbols />
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
    </Group>
  );
};

export default Ressource;
