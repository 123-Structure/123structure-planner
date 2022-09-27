import { useState, useRef } from "react";
import { FileButton, ActionIcon, Modal } from "@mantine/core";
import { IconFilePlus, IconTableImport } from "@tabler/icons";
import { read, utils } from "xlsx";
import { ProjectParameters } from "../../data/constants/ProjectParameters";
import { IProject } from "../../data/interfaces/IProject";
import ExcelDataGrid from "./components/ExcelDataGrid";
import ExcelDataGridSettings from "./components/ExcelDataGridSettings";

const AddProjectFromExcel = () => {
  const [file, setFile] = useState<File | null>(null);

  const [project, setProject] = useState<IProject[]>();
  const [showParams, setShowParams] = useState<string[]>([
    "AGENCE",
    "DOSSIER",
    "AFFAIRE",
    "RESSOURCES",
  ]);

  const [showModal, setShowModal] = useState(false);

  const resetRef = useRef<() => void>(null);

  const getData = async (excelFile: File | null) => {
    const projects = [];
    if (excelFile === null) {
      return console.log("Fichier manquant...");
    } else {
      const blob = new Blob([excelFile]);
      const file = await blob.arrayBuffer();
      const wb = read(file);
      const data = utils.sheet_to_json<IProject>(wb.Sheets[wb.SheetNames[0]]);

      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        for (let j = 0; j < ProjectParameters.length; j++) {
          if (element[ProjectParameters[j]] === undefined) {
            element[ProjectParameters[j]] = "";
          }

          if (ProjectParameters[j] === "LIVR. (tri)") {
            element.LIVRTRI = element["LIVR. (tri)"];
          }
        }
        const agenceLetter = element.DOSSIER.slice(-1);
        switch (agenceLetter) {
          case "L":
            element.AGENCE = "Clisson (44)";
            break;
          case "U":
            element.AGENCE = "Anglet (64)";
            break;
          case "Y":
            element.AGENCE = "Villefranche-sur-Saône (69)";
            break;

          default:
            element.AGENCE = "Autre";
            break;
        }
        projects.push(element);
      }
      setFile(null);
      resetRef.current?.();
      setShowModal(true);
      setProject(projects);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setProject([]);
  };

  return (
    <>
      <FileButton
        resetRef={resetRef}
        onChange={(excelFile) => getData(excelFile)}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      >
        {(props) => (
          <ActionIcon size="xl" variant="filled" color={"yellow"} {...props}>
            <IconFilePlus size={24} color="black" />
          </ActionIcon>
        )}
      </FileButton>
      <Modal
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={showModal}
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
            {project?.length !== undefined ? project?.length : 0} Affaire(s)
          </h2>
          <ExcelDataGridSettings
            showParams={showParams}
            setShowParams={setShowParams}
          />
        </div>
        <ExcelDataGrid project={project} showParams={showParams} />
      </Modal>
    </>
  );
};

export default AddProjectFromExcel;
