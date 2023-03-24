import { useState, useRef } from "react";
import { FileButton, ActionIcon, Modal, Button } from "@mantine/core";
import { IconFilePlus } from "@tabler/icons";
import { read, utils } from "xlsx";
import { IProject } from "../../../../data/interfaces/IProject";
import { ProjectParameters } from "../../../../data/constants/ProjectParameters";
import ExcelGridModal from "./components/ExcelGridModal/ExcelGridModal";
import "../../../../assets/style/AddProjectFromExcel.css";
import { useProject } from "../../../../hooks/Project/useProject";
import { useRouter } from "../../../../hooks/Router/useRouter";
import CustomTooltip from "../../../utils/CustomTooltip";

const AddProjectFromExcel = () => {
  const [file, setFile] = useState<File | null>(null);
  const [importProject, setImportProject] = useState<IProject[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [newProject, setNewProject] = useState<IProject[]>([]);
  const [duplicatedProjectID, setDuplicatedProjectID] = useState<string[]>([]);

  const projects = useProject();
  const router = useRouter();

  const resetRef = useRef<() => void>(null);

  const getData = async (excelFile: File | null) => {
    const importProjectList = [];
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
        importProjectList.push(element);
      }

      const projectID = projects.map((project) => project.DOSSIER);
      const newProjectList = importProjectList.filter(
        (p) => !projectID.includes(p.DOSSIER)
      );

      newProjectList.map((p) => (p.PHASE = "EXE"));

      const duplicatedProject = newProjectList
        ?.map((p) => p.DOSSIER)
        .filter((e, i, a) => a.indexOf(e) !== i);

      newProjectList
        .filter((p) => duplicatedProject.includes(p.DOSSIER))
        .map((p) => (p.PHASE = undefined));

      const alreadyExistProject = importProjectList.filter((p) =>
        projectID.includes(p.DOSSIER)
      );

      alreadyExistProject.map(
        (exist) =>
          (exist.PHASE = projects.filter(
            (p) => p.DOSSIER === exist.DOSSIER
          )[0].PHASE)
      );

      setNewProject(newProjectList);
      setDuplicatedProjectID(duplicatedProject);

      setFile(null);
      resetRef.current?.();
      setShowModal(true);
      setImportProject(importProjectList);
    }
  };

  return (
    <>
      <FileButton
        resetRef={resetRef}
        onChange={(excelFile) => getData(excelFile)}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      >
        {(props) => (
          <CustomTooltip
            label="Import Intranet"
            withArrow={false}
            transition="slide-down"
            delay={500}
          >
            <ActionIcon
              size="xl"
              variant="filled"
              color={"yellow"}
              disabled={router !== "Planning"}
              {...props}
            >
              <IconFilePlus size={24} color="black" />
            </ActionIcon>
          </CustomTooltip>
        )}
      </FileButton>
      <ExcelGridModal
        showModal={showModal}
        setShowModal={setShowModal}
        importProject={importProject}
        setImportProject={setImportProject}
        newProject={newProject}
        setNewProject={setNewProject}
        duplicatedProjectID={duplicatedProjectID}
        setDuplicatedProjectID={setDuplicatedProjectID}
      />
    </>
  );
};

export default AddProjectFromExcel;
