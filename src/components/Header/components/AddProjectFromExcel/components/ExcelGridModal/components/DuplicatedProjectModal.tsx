import { Button, Modal, Select } from "@mantine/core";
import { IconCopy } from "@tabler/icons";
import React, { useState } from "react";
import { IProject } from "../../../../../../../data/interfaces/IProject";
import { TPhase } from "../../../../../../../data/types/TPhase";
import ModalTitle from "../../../../../../utils/ModalTitle";

interface IDuplicatedProjectModal {
  showDuplicatedProjectModal: boolean;
  setShowDuplicatedProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  duplicatedProject: IProject | undefined;
  importProject: IProject[];
  setImportProject: React.Dispatch<React.SetStateAction<IProject[]>>;
  duplicatedProjectRowID: number;
}

const DuplicatedProjectModal = (props: IDuplicatedProjectModal) => {
  const [value, setValue] = useState<string | null>(null);

  const data = ["DIAG", "AVP", "EXE", "ETUDE DE SOL"];

  const handleUpdateDuplicatedProject = () => {
    const project = [...props.importProject];
    const changedProject: IProject = project[props.duplicatedProjectRowID];
    changedProject.PHASE = value as TPhase;

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
        <ModalTitle icon={<IconCopy size={24} />} title="Projet dupliqué" />
      }
    >
      <p>{`${props.duplicatedProject?.DOSSIER} - ${props.duplicatedProject?.AFFAIRE}`}</p>
      <p>
        {`Phase actuelle : ${
          props.duplicatedProject?.PHASE !== undefined
            ? props.duplicatedProject?.PHASE
            : "-"
        }`}
      </p>
      <Select
        style={{ marginBottom: "16px" }}
        label="Sélectionner une phase à attribuer puis valider"
        data={data}
        value={value}
        onChange={setValue}
      ></Select>
      <Button
        style={{ color: "black" }}
        onClick={handleUpdateDuplicatedProject}
      >
        Valider
      </Button>
    </Modal>
  );
};

export default DuplicatedProjectModal;
