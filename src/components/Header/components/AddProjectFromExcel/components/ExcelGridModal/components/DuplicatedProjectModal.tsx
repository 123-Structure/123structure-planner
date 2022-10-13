import { Button, Modal, Select } from "@mantine/core";
import { IconCopy } from "@tabler/icons";
import React, { useState } from "react";
import { IProject } from "../../../../../../../data/interfaces/IProject";
import { TPhase } from "../../../../../../../data/types/TPhase";
import ModalTitle from "../../../../../../utils/ModalTitle";

interface IDuplicatedProjectModal {
  showDuplicatedProjectModal: boolean;
  setShowDuplicatedProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  newProject: IProject[];
  setNewProject: React.Dispatch<React.SetStateAction<IProject[]>>;
  duplicatedProject: IProject | undefined;
}

const DuplicatedProjectModal = (props: IDuplicatedProjectModal) => {
  const [value, setValue] = useState<string | null>(null);

  const data = ["DIAG", "AVP", "EXE", "ETUDE DE SOL"];

  const handleUpdateDuplicatedProject = () => {
    const project = [...props.newProject];
    
    const changedProject = project.filter(
      (p) => p.DOSSIER === props.duplicatedProject?.DOSSIER
    )[0];
    changedProject.PHASE = value as TPhase;

    props.setNewProject(project);
    props.setShowDuplicatedProjectModal(false);
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
      <Select
        style={{ marginBottom: "16px" }}
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
