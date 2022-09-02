import React, { useState } from "react";
import { read, utils } from "xlsx";

interface IProject {
  DOSSIER: string;
  AFFAIRE: string;
  CLIENT: string;
  ARCHITECTE: string;
  "AGENCE LIVREE": string;
  RESSOURCES: string;
  SOL: string;
  LIVRAISON: string;
  "LIVR. (tri)": string;
  "TEMPS PREVU": string;
  "TEMPS REALISE": string;
  "TEMPS RESTANT": string;
  "HONOS (EUR HT)": string;
}

const ReadXlsxFile = () => {
  const [project, setProject] = useState<IProject[]>();

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
      <h2>{project?.length} Affaire(s)</h2>
      {project === undefined ? (
        <p>Aucun projet</p>
      ) : (
        project.map((p) => {
          return (
            <p key={Math.random()}>{`${p.DOSSIER} - ${p.AFFAIRE}`}</p>
          );
        })
      )}
    </>
  );
};

export default ReadXlsxFile;
