import React, { useState } from "react";
import { read, utils } from "xlsx";
import { IProject } from "../utils/interface/IProject";
import { ProjectParameters } from "../utils/ProjectParameters";
import ExcelDataGrid from "./dataGrid/ExcelDataGrid";
import ExcelDataGridSettings from "./dataGrid/ExcelDataGridSettings";

const ReadExcelFile = () => {
  const [project, setProject] = useState<IProject[]>();
  const [showParams, setShowParams] = useState<string[]>([
    "AGENCE",
    "DOSSIER",
    "AFFAIRE",
    "RESSOURCES",
  ]);

  const getData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const projects = [];
    if (e.currentTarget.files === null) {
      return console.log("Fichier manquant...");
    } else {
      const blob = new Blob([e.currentTarget.files[0]]);
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
      e.target.value = "";
      setProject(projects);
    }
  };
  return (
    <>
      <input
        type="file"
        onChange={getData}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <ExcelDataGridSettings
        showParams={showParams}
        setShowParams={setShowParams}
      />
      <h2>{project?.length !== undefined ? project?.length : 0} Affaire(s)</h2>
      <ExcelDataGrid project={project} showParams={showParams} />
    </>
  );
};

export default ReadExcelFile;
