import { Group } from "@mantine/core";
import React, { useState } from "react";
import { IProject } from "../utils/interface/IProject";
import ExcelDataGrid from "./dataGrid/ExcelDataGrid";
import ExcelDataGridSettings from "./dataGrid/ExcelDataGridSettings";
import LoadExcelFileButton from "./LoadExcelFileButton";

const ReadExcelFile = () => {
  const [project, setProject] = useState<IProject[]>();
  const [showParams, setShowParams] = useState<string[]>([
    "AGENCE",
    "DOSSIER",
    "AFFAIRE",
    "RESSOURCES",
  ]);

  return (
    <>
      <Group>
        <LoadExcelFileButton project={project} setProject={setProject} />
        <ExcelDataGridSettings
          showParams={showParams}
          setShowParams={setShowParams}
        />
      </Group>
      <h2>{project?.length !== undefined ? project?.length : 0} Affaire(s)</h2>
      <ExcelDataGrid project={project} showParams={showParams} />
    </>
  );
};

export default ReadExcelFile;
