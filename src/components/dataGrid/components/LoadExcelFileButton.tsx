import { Dispatch, SetStateAction, useState } from "react";
import { FileButton, ActionIcon } from "@mantine/core";
import { IconFileDatabase } from "@tabler/icons";
import { read, utils } from "xlsx";
import { ProjectParameters } from "../../../data/constants/ProjectParameters";
import { IProject } from "../../../data/interfaces/IProject";

interface ILoadExcelFileButtonProps {
  project: IProject[] | undefined;
  setProject: Dispatch<SetStateAction<IProject[] | undefined>>;
}

const LoadExcelFileButton = (props: ILoadExcelFileButtonProps) => {
  const [file, setFile] = useState<File | null>(null);

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
      props.setProject(projects);
    }
  };

  return (
    <>
      <FileButton
        onChange={(excelFile) => getData(excelFile)}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      >
        {(props) => (
          <ActionIcon size="xl" variant="filled" color={"yellow"} {...props}>
            <IconFileDatabase size={24} color="black" />
          </ActionIcon>
        )}
      </FileButton>
    </>
  );
};

export default LoadExcelFileButton;
