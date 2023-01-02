import { useMantineTheme } from "@mantine/core";
import {
  IconCalculator,
  IconCalendar,
  IconClock,
  IconPencil,
} from "@tabler/icons";
import React from "react";
import { useProject } from "../../../../context/ProjectContext";
import { useRessources } from "../../../../context/RessourceContext";

interface ILoadRateProps {
  id: string;
  rowId: string;
}

const LoadRate = (props: ILoadRateProps) => {
  const theme = useMantineTheme();
  const projects = useProject();
  const ressources = useRessources();

  const totalHours = () => {
    const currentRessourceRole = ressources.filter(
      (r) => r._id === props.rowId
    )[0].role;

    if (currentRessourceRole.includes("Ingénieur")) {
      return (
        <>
          <IconCalculator style={{ marginRight: "4px" }} />
          {projects
            .filter((project) =>
              project.ETAT.includes("w" + props.id.charAt(props.id.length - 1))
            )
            .filter((project) => project.ETAT.includes(props.rowId))
            .reduce((acc, p) => acc + p.H_INGENIEUR, 0) + "h"}
        </>
      );
    }
    if (currentRessourceRole.includes("Dessinateur")) {
      return (
        <>
          <IconPencil style={{ marginRight: "4px" }} />
          {projects
            .filter((project) =>
              project.ETAT.includes("w" + props.id.charAt(props.id.length - 1))
            )
            .filter((project) => project.ETAT.includes(props.rowId))
            .reduce((acc, p) => acc + p.H_DESSIN, 0) + "h"}
        </>
      );
    }
  };

  return (
    <div
      id={props.id}
      style={{
        backgroundColor:
          parseInt(props.id.charAt(props.id.length - 1)) % 2 === 0
            ? theme.colors.gray[4]
            : "white",
      }}
    >
      {totalHours()}
    </div>
  );
};

export default LoadRate;
