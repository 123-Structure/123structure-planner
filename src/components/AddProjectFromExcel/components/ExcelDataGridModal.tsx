import { Button, Modal } from "@mantine/core";
import { IconCheck, IconTableImport, IconX } from "@tabler/icons";
import { useState } from "react";
import { IProject } from "../../../data/interfaces/IProject";
import ExcelDataGrid from "./ExcelDataGrid";
import ExcelDataGridSettings from "./ExcelDataGridSettings";

interface IExcelDataGridModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  project: IProject[];
  setProject: React.Dispatch<React.SetStateAction<IProject[] | undefined>>;
}

const ExcelDataGridModal = (props: IExcelDataGridModalProps) => {
  const [showParams, setShowParams] = useState<string[]>([
    "AGENCE",
    "DOSSIER",
    "AFFAIRE",
    "RESSOURCES",
  ]);

  const handleModalClose = () => {
    props.setShowModal(false);
    props.setProject([]);
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconTableImport size={32} style={{ marginRight: "8px" }} />
          <h2 style={{ margin: 0 }}>
            Importer des nouveaux projets depuis un fichier Excel
          </h2>
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ margin: "0 16px 0 0" }}>
          {props.project?.length !== undefined ? props.project?.length : 0}{" "}
          Affaire(s)
        </h2>
        <ExcelDataGridSettings
          showParams={showParams}
          setShowParams={setShowParams}
        />
      </div>
      <Button.Group style={{ marginBottom: "16px" }}>
        <Button color="green">
          <IconCheck size={24} style={{ marginRight: "8px" }} />
          Charger les nouveaux projets
        </Button>
        <Button color="red">
          <IconX size={24} style={{ marginRight: "8px" }} />
          Annuler le chargement de nouveaux projets
        </Button>
      </Button.Group>
      <ExcelDataGrid project={props.project} showParams={showParams} />
    </Modal>
  );
};

export default ExcelDataGridModal;
