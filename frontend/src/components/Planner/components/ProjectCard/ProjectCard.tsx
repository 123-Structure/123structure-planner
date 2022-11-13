import { useState } from "react";
import { projectNameReducer } from "../../../../utils/projectNameReducer";
import { IProject } from "../../../../data/interfaces/IProject";
import MoreInfoModal from "./MoreInfoModal";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../../../data/constants/ItemTypes";
import { Badge, Checkbox, Chip, Tooltip, useMantineTheme } from "@mantine/core";
import { FolderColors } from "../../../../data/constants/FolderColors";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat.js";
import theme from "../../../../assets/style/MantineTheme";
import {
  useProject,
  useUpdateProject,
} from "../../../../context/ProjectContext";

dayjs.extend(CustomParseFormat);

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard = (props: IProjectCardProps) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isInvoiced, setIsInvoiced] = useState(false);
  const theme = useMantineTheme();
  const projects = useProject();
  const setProjects = useUpdateProject();

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      id: props.project.DOSSIER,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleShowMoreInfoModal = () => {
    setShowMoreInfo(true);
  };

  const getMonthColor = (m: string) => {
    for (let i = 0; i < FolderColors.length; i++) {
      const month = FolderColors[i];
      if (m === month.id) {
        return [month.BgColor, month.FontColor];
      }
    }
    return "white";
  };

  const getRemainingTimeColor = (d: string) => {
    const rendu = dayjs(d, "DD-MM-YYYY");
    const today = dayjs("27/09/2022", "DD-MM-YYYY");
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
    return "dark";
  };

  const updateProject = (itemId: any, newValue: string) => {
    const newProjects = [...projects];

    const changedProject = newProjects.filter(
      (project) => project.DOSSIER === itemId
    );

    changedProject[0].ETAT = newValue;
    setProjects(newProjects);
  };

  const handleInvoiceChange = () => {
    setIsInvoiced(!isInvoiced);
    updateProject(
      props.project.DOSSIER,
      `invoicing ${props.project.ETAT.split(" ")[1]} ${
        isInvoiced ? "" : "isInvoiced"
      }`
    );
  };

  console.log(props.project.ETAT);

  return (
    <>
      <MoreInfoModal
        showMoreInfo={showMoreInfo}
        setShowMoreInfo={setShowMoreInfo}
        project={props.project}
      />
      <Tooltip
        label={`${props.project.DOSSIER} - ${props.project.AFFAIRE}`}
        color="yellow"
        transition="slide-up"
        transitionDuration={300}
        openDelay={1000}
        style={{ color: "black", fontWeight: "bold" }}
        withArrow
        arrowSize={8}
      >
        <div
          ref={drag}
          style={{
            height: "66px",
            backgroundColor: getMonthColor(
              props.project.DOSSIER.split(".")[1]
            )[0],
            padding: "2px 4px 6px 6px",
            opacity: isDragging ? "0.5" : 1,
            outline: "1px solid black",
            color: getMonthColor(props.project.DOSSIER.split(".")[1])[1],
            fontWeight: "bold",
          }}
          onDoubleClick={handleShowMoreInfoModal}
        >
          <p
            style={{
              margin: "0 0 4px 0",
            }}
          >
            {projectNameReducer(props.project)}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Badge
              color={getRemainingTimeColor(props.project.RENDU)}
              size="lg"
              variant="filled"
              style={{
                outline: "2px solid white",
              }}
            >
              {props.project.RENDU}
            </Badge>
            <div
              style={{
                backgroundColor: !props.project.ETAT.includes("invoicing")
                  ? "white"
                  : isInvoiced
                  ? theme.colors.green[1]
                  : theme.colors.red[1],
                borderRadius: "14px",
                padding: "4px 12px",
              }}
            >
              <Checkbox
                checked={isInvoiced}
                onChange={handleInvoiceChange}
                label={
                  <p
                    style={{
                      color: !props.project.ETAT.includes("invoicing")
                        ? theme.colors.gray[6]
                        : isInvoiced
                        ? theme.colors.green[7]
                        : theme.colors.red[7],
                      margin: 0,
                    }}
                  >
                    {isInvoiced ? "F" : "NF"}
                  </p>
                }
                color={"green"}
                disabled={!props.project.ETAT.includes("invoicing")}
                indeterminate={!props.project.ETAT.includes("invoicing")}
              />
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  );
};

export default ProjectCard;
