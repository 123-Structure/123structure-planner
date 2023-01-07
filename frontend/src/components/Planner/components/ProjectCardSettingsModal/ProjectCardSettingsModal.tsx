import { Modal } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import "dayjs/locale/fr";
import { IconDeviceFloppy, IconFolder } from "@tabler/icons";
import { IProject } from "../../../../data/interfaces/IProject";
import CustomTitle from "../../../utils/CustomTitle";
import CustomButton from "../../../utils/CustomButton";
import General from "./components/General";
import Planification from "./components/Planification";
import Honoraire from "./components/Honoraire";
import RenderingDateBadge from "../../../utils/RenderingDateBadge";
import InvoicingStateSwitch from "../../../utils/InvoicingStateSwitch";

interface IProjectCardProps {
  showMoreInfo: boolean;
  setShowMoreInfo: Dispatch<SetStateAction<boolean>>;
  project: IProject;
  isInvoiced: boolean;
  setIsInvoiced: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectCardSettingsModal = (props: IProjectCardProps) => {
  const [drawTime, setDrawTime] = useState(props.project.H_DESSIN);
  const [engineeringTime, setEngineeringTime] = useState(
    props.project.H_INGENIEUR
  );
  const [renderingDate, setRenderingDate] = useState(new Date());

  const handleSubmit = () => {
    props.project.H_DESSIN = drawTime;
    props.project.H_INGENIEUR = engineeringTime;
    props.project.RENDU = renderingDate.toLocaleDateString("fr");
    props.setShowMoreInfo(false);
  };

  return (
    <Modal
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={props.showMoreInfo}
      onClose={handleSubmit}
      size="calc(window.screen.width-25%)"
      padding={"xl"}
      title={
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <CustomTitle
            icon={<IconFolder size={24} />}
            title={`${props.project.DOSSIER} - ${props.project.AFFAIRE}`}
          />
          <div style={{ display: "flex", gap: "8px" }}>
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
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "65% 35%",
          flexDirection: "row",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingRight: "16px",
          }}
        >
          <General project={props.project} />
          <Honoraire project={props.project} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "8px",
            paddingLeft: "16px",
            borderLeft: "1px solid black",
          }}
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
        </div>
      </div>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
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
