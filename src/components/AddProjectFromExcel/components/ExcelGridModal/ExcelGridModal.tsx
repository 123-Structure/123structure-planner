import { Modal } from "@mantine/core";
import { IconFilePlus } from "@tabler/icons";
import { useState } from "react";
import { IProject } from "../../../../data/interfaces/IProject";
import ExcelSettings from "./components/ModalSettingsButton";
import ModalTitle from "../../../utils/ModalTitle";
import ValidateButton from "./components/ValidateButton";
import Grid from "./components/Grid";

interface IExcelDataGridModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  importProject: IProject[] | undefined;
  setImportProject: React.Dispatch<
    React.SetStateAction<IProject[] | undefined>
  >;
}

const ExcelGridModal = (props: IExcelDataGridModalProps) => {
  const [showParams, setShowParams] = useState<string[]>([
    "AGENCE",
    "DOSSIER",
    "AFFAIRE",
    "RESSOURCES",
  ]);

  const [newProjectLength, setNewProjectLength] = useState<number | undefined>(
    0
  );

  const handleModalClose = () => {
    props.setShowModal(false);
    props.setImportProject([]);
  };

  return (
    <Modal
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={props.showModal}
      onClose={handleModalClose}
      size="calc(100vw - 500px)"
      padding={"xl"}
      title={
        <ModalTitle
          icon={<IconFilePlus size={24} />}
          title="Importer des nouveaux projets depuis un fichier Excel"
        />
      }
    >
      <ExcelSettings
        projectLength={props.importProject?.length}
        showParams={showParams}
        setShowParams={setShowParams}
        newProjectLength={newProjectLength}
      />
      <ValidateButton
        importProject={props.importProject}
        handleModalClose={handleModalClose}
        newProjectLength={newProjectLength}
        setNewProjectLength={setNewProjectLength}
      />
      <Grid importProject={props.importProject} showParams={showParams} />
    </Modal>
  );
};

export default ExcelGridModal;
