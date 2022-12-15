import { DataGrid, highlightFilterValue } from "mantine-data-grid";
import { Checkbox, createStyles, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  numberFilter,
  stringFilter,
} from "../../../../../../../utils/mantineDataGridLocaleFilter";
import { IProject } from "../../../../../../../data/interfaces/IProject";
import { ColumnDef } from "@tanstack/react-table";
import { ProjectParameters } from "../../../../../../../data/constants/ProjectParameters";
import "../../../../../../../assets/style/ExcelGrid.css";
import { useProject } from "../../../../../../../context/ProjectContext";
import DuplicatedProjectModal from "./DuplicatedProjectModal";

interface IExcelTableProps {
  importProject: IProject[];
  setImportProject: React.Dispatch<React.SetStateAction<IProject[]>>;
  showParams: string[];
  duplicatedProjectID: string[];
  setDuplicatedProjectID: React.Dispatch<React.SetStateAction<string[]>>;
  newProject: IProject[];
  setNewProject: React.Dispatch<React.SetStateAction<IProject[]>>;
}

const useStyles = createStyles((theme) => ({
  newProject: {
    backgroundColor: theme.colors.green[1],
  },
  alreadyExistProject: {
    backgroundColor: theme.colors.red[1],
  },
  duplicatedProject: {
    backgroundColor: theme.colors.blue[1],
  },
}));

const Grid = (props: IExcelTableProps) => {
  const [columns, setColumns] = useState<ColumnDef<IProject, unknown>[]>([]);
  const [currentDuplicatedProject, setCurrentDuplicatedProject] =
    useState<IProject>();
  const [duplicatedProjectRowID, setDuplicatedProjectRowID] =
    useState<number>(0);

  const [showDuplicatedProjectModal, setShowDuplicatedProjectModal] =
    useState(false);

  const projects = useProject();
  const { classes } = useStyles();

  const projectStatus = (currentProject: IProject | undefined): string => {
    if (currentProject !== undefined) {
      const projectID = projects.map((project) => project.DOSSIER);

      if (!projectID.includes(currentProject.DOSSIER)) {
        if (props.duplicatedProjectID !== undefined) {
          if (
            props.duplicatedProjectID?.includes(currentProject.DOSSIER) &&
            currentProject.PHASE === undefined
          ) {
            return "duplicatedProject";
          } else {
            return "newProject";
          }
        }
      } else {
        return "alreadyExistProject";
      }
    }
    return "alreadyExistProject";
  };

  const handleOpenModal = (rowID: number) => {
    if (props.importProject !== undefined) {
      if (
        props.duplicatedProjectID.includes(props.importProject[rowID].DOSSIER)
      ) {
        setDuplicatedProjectRowID(rowID);
        setCurrentDuplicatedProject(props.importProject[rowID]);
        setShowDuplicatedProjectModal(true);
      }
    }
  };

  useEffect(() => {
    const matchParams = [];
    for (let i = 0; i < props.showParams.length; i++) {
      const param = props.showParams[i];
      if (param === ProjectParameters[0]) {
        matchParams.push({
          accessorKey: "AGENCE",
          header: "Agence",
          filterFn: stringFilter,
          size: 100,
          cell: highlightFilterValue,
        });
      }
      if (param === ProjectParameters[1]) {
        matchParams.push({
          accessorKey: "DOSSIER",
          header: "Dossier",
          filterFn: stringFilter,
          size: 100,
          cell: highlightFilterValue,
        });
      }
      if (param === ProjectParameters[2]) {
        matchParams.push({
          accessorKey: "AFFAIRE",
          header: "Affaire",
          filterFn: stringFilter,
          size: 350,
          cell: highlightFilterValue,
        });
      }
      if (param === ProjectParameters[3]) {
        matchParams.push({
          accessorKey: "CLIENT",
          header: "Client",
          filterFn: stringFilter,
          size: 200,
          cell: highlightFilterValue,
        });
      }
      if (param === ProjectParameters[4]) {
        matchParams.push({
          accessorKey: "PHASE",
          header: "Phase",
          filterFn: stringFilter,
          size: 150,
        });
      }
      if (param === ProjectParameters[5]) {
        matchParams.push({
          accessorKey: "MONTANT DEVIS (EUR HT)",
          header: "Montant du devis (€ HT)",
          filterFn: numberFilter,
          size: 175,
        });
      }
    }
    setColumns(
      matchParams.sort(function (a, b) {
        return (
          ProjectParameters.indexOf(a.accessorKey) -
          ProjectParameters.indexOf(b.accessorKey)
        );
      })
    );
  }, [props.showParams]);

  return (
    <>
      <DataGrid
        data={props.importProject !== undefined ? props.importProject : []}
        highlightOnHover
        withGlobalFilter
        withPagination
        withColumnFilters
        withSorting
        locale={{
          globalSearch: "Rechercher...",
          pageSize: "Résultats par page:",
          pagination: (firstRowNum, lastRowNum, maxRows) => (
            <>
              Affichage <b>{firstRowNum}</b> - <b>{lastRowNum}</b> sur{" "}
              <b>{maxRows}</b> résultats
            </>
          ),
        }}
        onRow={(row) => ({
          onClick: () => handleOpenModal(parseInt(row.id)),
          className:
            projectStatus(
              props.importProject !== undefined
                ? props.importProject[parseInt(row.id)]
                : undefined
            ) === "newProject"
              ? classes.newProject
              : projectStatus(
                  props.importProject !== undefined
                    ? props.importProject[parseInt(row.id)]
                    : undefined
                ) === "duplicatedProject"
              ? classes.duplicatedProject
              : classes.alreadyExistProject,
        })}
        columns={columns}
      />
      <DuplicatedProjectModal
        showDuplicatedProjectModal={showDuplicatedProjectModal}
        setShowDuplicatedProjectModal={setShowDuplicatedProjectModal}
        currentDuplicatedProject={currentDuplicatedProject}
        importProject={props.importProject}
        setImportProject={props.setImportProject}
        duplicatedProjectRowID={duplicatedProjectRowID}
        duplicatedProjectID={props.duplicatedProjectID}
        setDuplicatedProjectID={props.setDuplicatedProjectID}
      />
    </>
  );
};

export default Grid;
