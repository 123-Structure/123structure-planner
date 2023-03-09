import { Badge, Indicator, Modal, Tabs } from "@mantine/core";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import "dayjs/locale/fr";
import {
  IconDeviceFloppy,
  IconFolder,
  IconFileDescription,
  IconWallet,
  IconCalendar,
} from "@tabler/icons";
import { IProject } from "../../../../data/interfaces/IProject";
import CustomTitle from "../../../utils/CustomTitle";
import CustomButton from "../../../utils/CustomButton";
import General from "./components/General/General";
import Planification from "./components/Planification/Planification";
import Honoraire from "./components/Honoraire/Honoraire";
import RenderingDateBadge from "../../../utils/RenderingDateBadge";
import InvoicingStateSwitch from "../../../utils/InvoicingStateSwitch";
import AgenceBadge from "../../../utils/AgenceBadge";
import { getMonthColor } from "../../../../utils/getMonthColor";
import "../../../../assets/style/ProjectCardSettingsModal.css";
import {
  useProject,
  useUpdateProject,
} from "../../../../context/ProjectContext";
import { showNotification } from "@mantine/notifications";

interface IProjectCardProps {
  showMoreInfo: boolean;
  setShowMoreInfo: Dispatch<SetStateAction<boolean>>;
  project: IProject;
  isInvoiced: boolean;
  setIsInvoiced: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectCardSettingsModal = (props: IProjectCardProps) => {
  const projects = useProject();
  const setProjects = useUpdateProject();

  const [subcontracting, setSubcontracting] = useState(
    props.project["SOUS TRAITANCE"]
  );
  const [drawTime, setDrawTime] = useState(props.project.H_DESSIN);
  const [engineeringTime, setEngineeringTime] = useState(
    props.project.H_INGENIEUR
  );
  const [renderingDate, setRenderingDate] = useState(new Date());

  const mustBeFilledData = (): number => {
    let unfilledDateLength = 0;
    if (drawTime === 0) {
      unfilledDateLength++;
    }
    if (engineeringTime === 0) {
      unfilledDateLength++;
    }
    if (props.project.RENDU === undefined) {
      unfilledDateLength++;
    }
    return unfilledDateLength;
  };

  const updateProject = () => {
    const newProjects = [...projects];
    const changedProject = newProjects.filter(
      (project) => project.DOSSIER === props.project.DOSSIER
    );

    changedProject[0].H_DESSIN = drawTime;
    changedProject[0].H_INGENIEUR = engineeringTime;
    changedProject[0].RENDU = renderingDate.toLocaleDateString("fr");
    changedProject[0]["SOUS TRAITANCE"] = subcontracting;

    let unfilledDateLength = 0;
    if (changedProject[0].H_DESSIN === 0) {
      unfilledDateLength++;
      console.log("h_dessin");
    }
    if (changedProject[0].H_INGENIEUR === 0) {
      unfilledDateLength++;
      console.log("h_inge");
    }
    if (changedProject[0].RENDU === undefined) {
      unfilledDateLength++;
      console.log("rendu");
    }
    if (changedProject[0].INGENIEUR.length === 0) {
      unfilledDateLength++;
      console.log("inge");
    }

    if (changedProject[0].ETAT.includes("newEntry")) {
      if (unfilledDateLength > 0) {
        showNotification({
          title: "⚠️ Informations manquantes",
          message: `Il reste ${unfilledDateLength} information(s) à remplir`,
          color: "orange",
        });
      } else {
        showNotification({
          title: "✅ Dossier complété",
          message: `Le dossier ${changedProject[0].DOSSIER} vient de passer dans la catégorie "Dossier à assigner"`,
          color: "green",
        });
        changedProject[0].ETAT = "mustBeAssign";
      }
    }

    setProjects(newProjects);
    props.setShowMoreInfo(false);
  };

  return (
    <Modal
      centered
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      opened={props.showMoreInfo}
      onClose={updateProject}
      size="auto"
      padding={"xl"}
      title={
        <div className="projectCardSettingsModalTitle">
          <CustomTitle
            icon={
              <IconFolder
                size={32}
                style={{
                  fill: getMonthColor(props.project.DOSSIER.split(".")[1])[0],
                }}
              />
            }
            title={`${props.project.DOSSIER} - ${props.project.AFFAIRE}`}
          />
          <div className="projectCardSettingsModalTitleBadge">
            <AgenceBadge project={props.project} />
            <RenderingDateBadge project={props.project} />
            <InvoicingStateSwitch
              project={props.project}
              isInvoiced={props.isInvoiced}
              setIsInvoiced={props.setIsInvoiced}
              isInvoicedLabel={"Facturé"}
              isNotInvoicedLabel={"Non Facturé"}
              isPartialInvoicedLabel={"Partiellement Facturé"}
            />
          </div>
        </div>
      }
    >
      <Tabs color="yellow" defaultValue="general" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab
            value="general"
            icon={<IconFileDescription size={14} />}
            rightSection={
              props.project.INGENIEUR.length === 0 ? (
                <Badge
                  sx={{ width: 16, height: 16, pointerEvents: "none" }}
                  variant="filled"
                  size="xs"
                  p={0}
                  color={"red"}
                >
                  1
                </Badge>
              ) : (
                <></>
              )
            }
          >
            Général
          </Tabs.Tab>
          <Tabs.Tab value="honoraire" icon={<IconWallet size={14} />}>
            Honoraires
          </Tabs.Tab>
          <Tabs.Tab
            value="planification"
            icon={<IconCalendar size={14} />}
            rightSection={
              mustBeFilledData() > 0 ? (
                <Badge
                  sx={{ width: 16, height: 16, pointerEvents: "none" }}
                  variant="filled"
                  size="xs"
                  p={0}
                  color={"red"}
                >
                  {mustBeFilledData()}
                </Badge>
              ) : (
                <></>
              )
            }
          >
            Planification
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel
          className="projectCardSettingsModalTabsPanel"
          value="general"
        >
          <General
            project={props.project}
            subcontracting={subcontracting}
            setSubcontracting={setSubcontracting}
          />
        </Tabs.Panel>

        <Tabs.Panel
          className="projectCardSettingsModalTabsPanel"
          value="honoraire"
        >
          <Honoraire project={props.project} />
        </Tabs.Panel>

        <Tabs.Panel
          className="projectCardSettingsModalTabsPanel"
          value="planification"
        >
          <Planification
            project={props.project}
            engineeringTime={engineeringTime}
            setEngineeringTime={setEngineeringTime}
            drawTime={drawTime}
            setDrawTime={setDrawTime}
            renderingDate={renderingDate}
            setRenderingDate={setRenderingDate}
          />
        </Tabs.Panel>
      </Tabs>
      <div className="projectCardSettingsModalButton">
        <CustomButton
          handleClick={updateProject}
          icon={<IconDeviceFloppy />}
          label={"Enregistrer"}
        />
      </div>
    </Modal>
  );
};

export default ProjectCardSettingsModal;
