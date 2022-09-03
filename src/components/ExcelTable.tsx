import { IProject } from "./ReadExcelFile";
import {
  DataGrid,
  booleanFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from "mantine-data-grid";
import { Modal } from "@mantine/core";
import { useState } from "react";

interface IExcelTableProps {
  project: IProject[] | undefined;
}

const ExcelTable = (props: IExcelTableProps) => {
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
        onRow={(row) => ({
          onClick: () => handleRowClick(parseInt(row.id)),
        })}
        columns={[
          {
            accessorKey: "AGENCE",
            header: "Agence",
            filterFn: stringFilterFn,
            size: 100,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "DOSSIER",
            header: "Dossier",
            filterFn: stringFilterFn,
            size: 100,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "AFFAIRE",
            header: "Affaire",
            filterFn: stringFilterFn,
            size: 300,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "CLIENT",
            header: "Client",
            filterFn: stringFilterFn,
            size: 150,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "ARCHITECTE",
            header: "Architecte",
            filterFn: stringFilterFn,
            size: 150,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "AGENCE LIVREE",
            header: "Agence Livrée",
            filterFn: booleanFilterFn,
            size: 150,
          },
          {
            accessorKey: "RESSOURCES",
            header: "Ressources",
            filterFn: stringFilterFn,
            size: 450,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "SOL",
            header: "Etude de sol",
            filterFn: stringFilterFn,
            size: 150,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "LIVRAISON",
            header: "Livraison",
            filterFn: stringFilterFn,
            size: 150,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "LIVRTRI",
            header: "LIVR. (tri)",
            filterFn: stringFilterFn,
            size: 150,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "TEMPS PREVU",
            header: "Temps prévu",
            filterFn: numberFilterFn,
            size: 150,
          },
          {
            accessorKey: "TEMPS REALISE",
            header: "Temps réalisé",
            filterFn: numberFilterFn,
            size: 150,
          },
          {
            accessorKey: "TEMPS RESTANT",
            header: "Temps restant",
            filterFn: numberFilterFn,
            size: 150,
          },
          {
            accessorKey: "HONOS (EUR HT)",
            header: "Honoraires (€ HT)",
            filterFn: numberFilterFn,
            size: 175,
          },
        ]}
      />
    </>
  );
};

export default ExcelTable;
