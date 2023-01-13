import { Checkbox, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useProject, useUpdateProject } from "../../context/ProjectContext";
import { IProject } from "../../data/interfaces/IProject";

interface IInvoicingStateSwitch {
  project: IProject;
  isInvoiced: boolean;
  setIsInvoiced: React.Dispatch<React.SetStateAction<boolean>>;
  isInvoicedLabel: string;
  isNotInvoicedLabel: string;
  isPartialInvoicedLabel: string;
}

const InvoicingStateSwitch = (props: IInvoicingStateSwitch) => {
  
  const theme = useMantineTheme();
  const projects = useProject();
  const setProjects = useUpdateProject();

  const updateProject = (itemId: any, newValue: string) => {
    const newProjects = [...projects];

    const changedProject = newProjects.filter(
      (project) => project.DOSSIER === itemId
    );

    changedProject[0].ETAT = newValue;
    console.log(newValue);
    setProjects(newProjects);
  };

  const handleInvoiceChange = () => {
    props.setIsInvoiced(!props.isInvoiced);
    updateProject(
      props.project.DOSSIER,
      `invoicing ${props.project.ETAT.split(" ")[1]} ${
        parseFloat(props.project["MONTANT DEVIS (EUR HT)"]) -
          props.project.AVANCEMENT.reduce(
            (acc, p) => acc + parseFloat(p.amount),
            0
          ) ===
          0 && !props.isInvoiced
          ? "isInvoiced"
          : props.project.AVANCEMENT.length > 0 && !props.isInvoiced
          ? "partialInvoiced"
          : !props.isInvoiced
          ? "isInvoiced"
          : ""
      }`
    );
  };

  return (
    <div
      style={{
        backgroundColor: !props.project.ETAT.includes("invoicing")
          ? "white"
          : parseFloat(props.project["MONTANT DEVIS (EUR HT)"]) -
              props.project.AVANCEMENT.reduce(
                (acc, p) => acc + parseFloat(p.amount),
                0
              ) ===
              0 && props.isInvoiced
          ? theme.colors.green[1]
          : props.project.AVANCEMENT.length > 0 && props.isInvoiced
          ? theme.colors.orange[1]
          : props.isInvoiced
          ? theme.colors.green[1]
          : theme.colors.red[1],
        borderRadius: "14px",
        outline: !props.project.ETAT.includes("invoicing")
          ? `1px solid ${theme.colors.gray[2]}`
          : parseFloat(props.project["MONTANT DEVIS (EUR HT)"]) -
              props.project.AVANCEMENT.reduce(
                (acc, p) => acc + parseFloat(p.amount),
                0
              ) ===
              0 && props.isInvoiced
          ? `1px solid ${theme.colors.green[2]}`
          : props.project.AVANCEMENT.length > 0 && props.isInvoiced
          ? `1px solid ${theme.colors.orange[2]}`
          : props.isInvoiced
          ? `1px solid ${theme.colors.green[2]}`
          : `1px solid ${theme.colors.red[2]}`,
        padding: "4px 12px",
        fontWeight: "bold",
      }}
    >
      <Checkbox
        checked={props.isInvoiced}
        onChange={handleInvoiceChange}
        label={
          <p
            style={{
              color: !props.project.ETAT.includes("invoicing")
                ? theme.colors.gray[6]
                : parseFloat(props.project["MONTANT DEVIS (EUR HT)"]) -
                    props.project.AVANCEMENT.reduce(
                      (acc, p) => acc + parseFloat(p.amount),
                      0
                    ) ===
                    0 && props.isInvoiced
                ? theme.colors.green[7]
                : props.project.AVANCEMENT.length > 0 && props.isInvoiced
                ? theme.colors.orange[7]
                : props.isInvoiced
                ? theme.colors.green[7]
                : theme.colors.red[7],
              margin: 0,
            }}
          >
            {parseFloat(props.project["MONTANT DEVIS (EUR HT)"]) -
              props.project.AVANCEMENT.reduce(
                (acc, p) => acc + parseFloat(p.amount),
                0
              ) ===
              0 && props.isInvoiced
              ? props.isInvoicedLabel
              : props.project.AVANCEMENT.length > 0 && props.isInvoiced
              ? props.isPartialInvoicedLabel
              : props.isInvoiced
              ? props.isInvoicedLabel
              : props.isNotInvoicedLabel}
          </p>
        }
        color={
          parseFloat(props.project["MONTANT DEVIS (EUR HT)"]) -
            props.project.AVANCEMENT.reduce(
              (acc, p) => acc + parseFloat(p.amount),
              0
            ) ===
            0 && props.isInvoiced
            ? "green"
            : props.project.AVANCEMENT.length > 0 && props.isInvoiced
            ? "orange"
            : "green"
        }
        disabled={!props.project.ETAT.includes("invoicing")}
        indeterminate={!props.project.ETAT.includes("invoicing")}
      />
    </div>
  );
};

export default InvoicingStateSwitch;
