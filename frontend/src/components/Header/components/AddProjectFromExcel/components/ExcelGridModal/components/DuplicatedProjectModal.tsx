import { Modal, Select } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons";
import React, { useState } from "react";
import { IProject } from "../../../../../../../data/interfaces/IProject";
import { TPhase } from "../../../../../../../data/types/TPhase";
import CustomButton from "../../../../../../utils/CustomButton";
import CustomTitle from "../../../../../../utils/CustomTitle";

interface IDuplicatedProjectModal {
  showDuplicatedProjectModal: boolean;
  setShowDuplicatedProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentDuplicatedProject: IProject | undefined;
  importProject: IProject[];
  setImportProject: React.Dispatch<React.SetStateAction<IProject[]>>;
  duplicatedProjectRowID: number;
  duplicatedProjectID: string[];
  setDuplicatedProjectID: React.Dispatch<React.SetStateAction<string[]>>;
}

const DuplicatedProjectModal = (props: IDuplicatedProjectModal) => {
  const [value, setValue] = useState<string | null>(null);

  const data = ["DIAG", "AVP", "EXE", "ETUDE DE SOL"];

  const handleUpdateDuplicatedProject = () => {
    const project = [...props.importProject];
    const changedProject: IProject = project[props.duplicatedProjectRowID];
    changedProject.PHASE = value as TPhase;
    if (
      props.importProject
        .filter((p) => p.DOSSIER === props.currentDuplicatedProject?.DOSSIER)
        .filter((p) => p.PHASE === undefined).length === 0
    ) {
      props.setDuplicatedProjectID(
        props.duplicatedProjectID.filter(
          (id) => id !== props.currentDuplicatedProject?.DOSSIER
        )
      );
    }
    props.setImportProject(project);
    props.setShowDuplicatedProjectModal(false);
    setValue(null);
  };

  return (
    <Modal
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={props.showDuplicatedProjectModal}
      onClose={() => props.setShowDuplicatedProjectModal(false)}
      padding={"xl"}
      title={
        <CustomTitle icon={<IconCopy size={24} />} title="Projet dupliqué" />
      }
    >
      <p>{`${props.currentDuplicatedProject?.DOSSIER} - ${props.currentDuplicatedProject?.AFFAIRE}`}</p>
      <p>
        {`Phase actuelle : ${
          props.currentDuplicatedProject?.PHASE !== undefined
            ? props.currentDuplicatedProject?.PHASE
            : "-"
        }`}
      </p>
      <Select
        className="duplicatedProjectStateSelector"
        label="Sélectionner une phase à attribuer puis valider"
        data={data}
        value={value}
        onChange={setValue}
      ></Select>
      <CustomButton
        handleClick={handleUpdateDuplicatedProject}
        icon={<IconCheck />}
        label={"Valider"}
      />
    </Modal>
  );
};

export default DuplicatedProjectModal;
