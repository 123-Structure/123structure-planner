import { DataGrid, highlightFilterValue } from "mantine-data-grid";
import { createStyles, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  numberFilter,
  stringFilter,
} from "../../../utils/mantineDataGridLocaleFilter";
import { IProject } from "../../../data/interfaces/IProject";
import { ColumnDef } from "@tanstack/react-table";
import { ProjectParameters } from "../../../data/constants/ProjectParameters";
import "../../../assets/style/ExceDataGrid.css";

interface IExcelTableProps {
  project: IProject[] | undefined;
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

const ExcelDataGrid = (props: IExcelTableProps) => {
  const [columns, setColumns] = useState<ColumnDef<IProject, unknown>[]>([]);

  const theme = useMantineTheme();
  const { classes } = useStyles();

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
      data={props.project !== undefined ? props.project : []}
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
        className:
          parseInt(row.id) % 2 === 0
            ? classes.newProject
            : classes.alreadyExistProject,
      })}
      columns={columns}
    />
  );
};

export default ExcelDataGrid;
