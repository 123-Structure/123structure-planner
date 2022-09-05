import { IProject } from "../ReadExcelFile";
import {
  DataGrid,
  booleanFilterFn,
  highlightFilterValue,
} from "mantine-data-grid";
import { Modal } from "@mantine/core";
import { useState } from "react";
import { booleanFilter, numberFilter, stringFilter } from "./LocaleFilter";

interface IExcelTableProps {
  project: IProject[] | undefined;
}

const ExcelDataGrid = (props: IExcelTableProps) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [currentProject, setCurrentProject] = useState<IProject>();

  const handleRowClick = (id: number) => {
    setShowMoreInfo(true);
    if (props.project !== undefined) {
      setCurrentProject(props.project[id]);
    }
  };

  return (
    <>
      <Modal
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={showMoreInfo}
        onClose={() => setShowMoreInfo(false)}
      >
        <p>
          {currentProject?.DOSSIER} - {currentProject?.AFFAIRE}
        </p>
      </Modal>
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
        columns={[
          {
            accessorKey: "AGENCE",
            header: "Agence",
            filterFn: stringFilter,
            size: 100,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "DOSSIER",
            header: "Dossier",
            filterFn: stringFilter,
            size: 100,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "AFFAIRE",
            header: "Affaire",
            filterFn: stringFilter,
            size: 300,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "CLIENT",
            header: "Client",
            filterFn: stringFilter,
            size: 150,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "ARCHITECTE",
            header: "Architecte",
            filterFn: stringFilter,
            size: 150,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "AGENCE LIVREE",
            header: "Agence Livrée",
            filterFn: booleanFilter,
            size: 150,
          },
          {
            accessorKey: "RESSOURCES",
            header: "Ressources",
            filterFn: stringFilter,
            size: 450,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "SOL",
            header: "Etude de sol",
            filterFn: stringFilter,
            size: 150,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "LIVRAISON",
            header: "Livraison",
            filterFn: stringFilter,
            size: 150,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "LIVRTRI",
            header: "LIVR. (tri)",
            filterFn: stringFilter,
            size: 150,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "TEMPS PREVU",
            header: "Temps prévu",
            filterFn: numberFilter,
            size: 150,
          },
          {
            accessorKey: "TEMPS REALISE",
            header: "Temps réalisé",
            filterFn: numberFilter,
            size: 150,
          },
          {
            accessorKey: "TEMPS RESTANT",
            header: "Temps restant",
            filterFn: numberFilter,
            size: 150,
          },
          {
            accessorKey: "HONOS (EUR HT)",
            header: "Honoraires (€ HT)",
            filterFn: numberFilter,
            size: 175,
          },
        ]}
      />
    </>
  );
};

export default ExcelDataGrid;
