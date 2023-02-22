import { Badge, useMantineTheme } from "@mantine/core";
import { IProject } from "../../data/interfaces/IProject";

interface IAgenceBadgeProps {
  project: IProject;
}

const AgenceBadge = (props: IAgenceBadgeProps) => {
  const theme = useMantineTheme();
  const getAgence = () => {
    const agenceLetter = props.project.DOSSIER.slice(-1);
    switch (agenceLetter) {
      case "L":
        return ["Clisson", "yellow", theme.colors.yellow[8]];
      case "U":
        return ["Anglet", "violet", theme.colors.violet[8]];
      case "Y":
        return ["Villefranche-sur-Saône", "red", theme.colors.red[8]];

      default:
        return ["Autre", theme.colors.dark[5], theme.colors.dark[8]];
    }
  };

  return (
    <Badge
      color={getAgence()[1]}
      size="lg"
      variant="filled"
      style={{
        outline: `1px solid ${getAgence()[2]}`,
        // color: "black",
      }}
    >
      {getAgence()[0]}
    </Badge>
  );
};

export default AgenceBadge;
