import { DataGrid, highlightFilterValue } from "mantine-data-grid";
import { useEffect, useState } from "react";
import {
  booleanFilter,
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

const ExcelDataGrid = (props: IExcelTableProps) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [currentProject, setCurrentProject] = useState<IProject>();
  const [columns, setColumns] = useState<ColumnDef<IProject, unknown>[]>([]);


  const handleRowClick = (id: number) => {
    setShowMoreInfo(true);
    if (props.project !== undefined) {
      setCurrentProject(props.project[id]);
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
          size: 300,
          cell: highlightFilterValue,
        });
      }
      if (param === ProjectParameters[3]) {
        matchParams.push({
          accessorKey: "CLIENT",
          header: "Client",
          filterFn: stringFilter,
          size: 150,
          cell: highlightFilterValue,
        });
      }
      if (param === ProjectParameters[4]) {
        matchParams.push({
          accessorKey: "ARCHITECTE",
          header: "Architecte",
          filterFn: stringFilter,
          size: 150,
          cell: highlightFilterValue,
        });
      }
      if (param === ProjectParameters[5]) {
        matchParams.push({
          accessorKey: "AGENCE LIVREE",
          header: "Agence Livrée",
          filterFn: booleanFilter,
          size: 150,
        });
      }
      if (param === ProjectParameters[6]) {
        matchParams.push({
          accessorKey: "RESSOURCES",
          header: "Ressources",
          filterFn: stringFilter,
          size: 350,
          cell: highlightFilterValue,
        });
      }
      if (param === ProjectParameters[7]) {
        matchParams.push({
          accessorKey: "SOL",
          header: "Etude de sol",
          filterFn: stringFilter,
          size: 150,
          cell: highlightFilterValue,
        });
      }
      if (param === ProjectParameters[8]) {
        matchParams.push({
          accessorKey: "LIVRAISON",
          header: "Livraison",
          filterFn: stringFilter,
          size: 150,
          cell: highlightFilterValue,
        });
      }
      if (param === ProjectParameters[9]) {
        matchParams.push({
          accessorKey: "LIVRTRI",
          header: "LIVR. (tri)",
          filterFn: stringFilter,
          size: 150,
          cell: highlightFilterValue,
        });
      }
      if (param === ProjectParameters[10]) {
        matchParams.push({
          accessorKey: "TEMPS PREVU",
          header: "Temps prévu",
          filterFn: numberFilter,
          size: 150,
        });
      }
      if (param === ProjectParameters[11]) {
        matchParams.push({
          accessorKey: "TEMPS REALISE",
          header: "Temps réalisé",
          filterFn: numberFilter,
          size: 150,
        });
      }
      if (param === ProjectParameters[12]) {
        matchParams.push({
          accessorKey: "TEMPS RESTANT",
          header: "Temps restant",
          filterFn: numberFilter,
          size: 150,
        });
      }
      if (param === ProjectParameters[13]) {
        matchParams.push({
          accessorKey: "HONOS (EUR HT)",
          header: "Honoraires (€ HT)",
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
      striped
      highlightOnHover
      // noFlexLayout
      withGlobalFilter
      withPagination
      withColumnFilters
      withSorting
      // withColumnResizing
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
        onClick: () => handleRowClick(parseInt(row.id)),
      })}
      columns={columns}
    />
  );
};

export default ExcelDataGrid;
