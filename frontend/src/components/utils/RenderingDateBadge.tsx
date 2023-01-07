import { Badge, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import { IProject } from "../../data/interfaces/IProject";

interface IRenderingDateBadge {
  project: IProject;
}

const RenderingDateBadge = (props: IRenderingDateBadge) => {
  const theme = useMantineTheme();

  const getRemainingTimeColor = (d: string | undefined) => {
    if (d !== undefined) {
      const rendu = dayjs(d, "DD-MM-YYYY");
      const today = dayjs(new Date().toLocaleDateString("fr"), "DD-MM-YYYY");
      const diff = rendu.diff(today, "day");
      if (diff > 9) {
        return "green";
      }
      if (diff <= 9 && diff > 3) {
        return "orange";
      }
      if (diff <= 3) {
        return "red";
      }
    }
    return "dark";
  };
  const getRemainingTimeColorOutline = (d: string | undefined) => {
    if (d !== undefined) {
      const rendu = dayjs(d, "DD-MM-YYYY");
      const today = dayjs(new Date().toLocaleDateString("fr"), "DD-MM-YYYY");
      const diff = rendu.diff(today, "day");
      if (diff > 9) {
        return theme.colors.green[8];
      }
      if (diff <= 9 && diff > 3) {
        return theme.colors.orange[8];
      }
      if (diff <= 3) {
        return theme.colors.red[8];
      }
    }
    return theme.colors.dark[8];
  };

  return (
    <Badge
      color={getRemainingTimeColor(props.project.RENDU)}
      size="lg"
      variant="filled"
      style={{
        outline: `1px solid ${getRemainingTimeColorOutline(
          props.project.RENDU
        )}`,
      }}
    >
      {props.project.RENDU !== undefined ? props.project.RENDU : "Non défini"}
    </Badge>
  );
};

export default RenderingDateBadge;
