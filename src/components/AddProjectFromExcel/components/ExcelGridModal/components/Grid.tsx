import { DataGrid, highlightFilterValue } from "mantine-data-grid";
import { createStyles, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  numberFilter,
  stringFilter,
} from "../../../../../utils/mantineDataGridLocaleFilter";
import { IProject } from "../../../../../data/interfaces/IProject";
import { ColumnDef } from "@tanstack/react-table";
import { ProjectParameters } from "../../../../../data/constants/ProjectParameters";
import "../../../../../assets/style/ExcelGrid.css";
import { useProject } from "../../../../../context/ProjectContext";

interface IExcelTableProps {
  importProject: IProject[] | undefined;
  showParams: string[];
}

const useStyles = createStyles((theme) => ({
  newProject: {
    backgroundColor: theme.colors.green[1],
  },
  alreadyExistProject: {
    backgroundColor: theme.colors.red[1],
  },
}));

const Grid = (props: IExcelTableProps) => {
  const [columns, setColumns] = useState<ColumnDef<IProject, unknown>[]>([]);

  const projects = useProject();
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const isNewProject = (currentProject: IProject | undefined): boolean => {
    if (currentProject !== undefined) {
      const projectID = projects.map((project) => project.DOSSIER);
      return !projectID.includes(currentProject.DOSSIER);
    }
    return false;
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
    <DataGrid
      data={props.importProject !== undefined ? props.importProject : []}
      highlightOnHover
      withGlobalFilter
      withPagination
      withColumnFilters
      withSorting
      styles={{
        th: {
          backgroundColor: "white",
        },
        tr: {
          backgroundColor: theme.colors.green[0],
        },
      }}
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
        className: isNewProject(
          props.importProject !== undefined
            ? props.importProject[parseInt(row.id)]
            : undefined
        )
          ? classes.newProject
          : classes.alreadyExistProject,
      })}
      columns={columns}
    />
  );
};

export default Grid;
