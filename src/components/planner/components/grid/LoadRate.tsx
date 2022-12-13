import { useMantineTheme } from "@mantine/core";
import { IconClock } from "@tabler/icons";
import React from "react";
import { useProject } from "../../../../context/ProjectContext";

interface ILoadRateProps {
  id: string;
  rowId: string;
}

const LoadRate = (props: ILoadRateProps) => {
  const theme = useMantineTheme();
  const projects = useProject();

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
      <IconClock style={{ marginRight: "4px" }} />
      {projects
        .filter((project) =>
          project.ETAT.includes("w" + props.id.charAt(props.id.length - 1))
        )
        .filter((project) => project.ETAT.includes(props.rowId))
        .reduce((acc, p) => acc + p.H_DESSIN, 0) + "h"}
    </div>
  );
};

export default LoadRate;
