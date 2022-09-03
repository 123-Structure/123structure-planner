import React, { useState } from "react";
import { read, utils } from "xlsx";
import ExcelTable from "./ExcelTable";

export interface IProject {
  DOSSIER: string;
  AFFAIRE: string;
  CLIENT: string;
  ARCHITECTE: string;
  "AGENCE LIVREE": boolean;
  RESSOURCES: string;
  SOL: string;
  LIVRAISON: string;
  "LIVR. (tri)": string;
  LIVRTRI: string;
  "TEMPS PREVU": string;
  "TEMPS REALISE": string;
  "TEMPS RESTANT": string;
  "HONOS (EUR HT)": string;
  [key: string]: string | boolean;
}

const ReadExcelFile = () => {
  const [project, setProject] = useState<IProject[]>();

  const keys = [
    "DOSSIER",
    "AFFAIRE",
    "CLIENT",
    "ARCHITECTE",
    "AGENCE LIVREE",
    "RESSOURCES",
    "SOL",
    "LIVRAISON",
    "LIVR. (tri)",
    "TEMPS PREVU",
    "TEMPS REALISE",
    "TEMPS RESTANT",
    "HONOS (EUR HT)",
  ];

  const getData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const projects = [];
    const input = document.querySelector("input");
    if (e.currentTarget.files === null) {
      return console.log("Fichier manquant...");
    } else {
      const blob = new Blob([e.currentTarget.files[0]]);
      const file = await blob.arrayBuffer();
      const wb = read(file);
      const data = utils.sheet_to_json<IProject>(wb.Sheets[wb.SheetNames[0]]);

      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        for (let j = 0; j < keys.length; j++) {
          if (element[keys[j]] === undefined) {
            element[keys[j]] = "";
          }

          if (keys[j] === "LIVR. (tri)") {
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
        console.log(element);
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
      <h2>{project?.length !== undefined ? project?.length : 0} Affaire(s)</h2>
      <ExcelTable project={project} />
    </>
  );
};

export default ReadExcelFile;
