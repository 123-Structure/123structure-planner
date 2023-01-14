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
import General from "./components/General";
import Planification from "./components/Planification/Planification";
import Honoraire from "./components/Honoraire/Honoraire";
import RenderingDateBadge from "../../../utils/RenderingDateBadge";
import InvoicingStateSwitch from "../../../utils/InvoicingStateSwitch";
import AgenceBadge from "../../../utils/AgenceBadge";
import { getMonthColor } from "../../../../utils/getMonthColor";
import "../../../../assets/style/ProjectCardSettingsModal.css";

interface IProjectCardProps {
  showMoreInfo: boolean;
  setShowMoreInfo: Dispatch<SetStateAction<boolean>>;
  project: IProject;
  isInvoiced: boolean;
  setIsInvoiced: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectCardSettingsModal = (props: IProjectCardProps) => {
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

  const handleSubmit = () => {
    props.project.H_DESSIN = drawTime;
    props.project.H_INGENIEUR = engineeringTime;
    props.project.RENDU = renderingDate.toLocaleDateString("fr");
    props.project["SOUS TRAITANCE"] = subcontracting;
    props.setShowMoreInfo(false);
  };

  return (
    <Modal
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={props.showMoreInfo}
      onClose={handleSubmit}
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
          <Tabs.Tab value="general" icon={<IconFileDescription size={14} />}>
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
          handleClick={handleSubmit}
          icon={<IconDeviceFloppy />}
          label={"Enregistrer"}
        />
      </div>
    </Modal>
  );
};

export default ProjectCardSettingsModal;
