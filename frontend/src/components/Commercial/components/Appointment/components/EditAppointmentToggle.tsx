import { ActionIcon } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons";
import { Editor } from "@tiptap/react";
import React from "react";

interface IEditAppointmentToggleProps {
  editAppointment: boolean;
  setEditAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  handleContentChange: (editor: Editor) => void;
}

const EditAppointmentToggle = (props: IEditAppointmentToggleProps) => {
  return (
    <div className="editAppointmentToggle">
      {props.editAppointment ? (
        <>
          <div
            className="editAppointmentToggleItem"
            onClick={() => {
              props.setEditAppointment(false);
            }}
          >
            <ActionIcon color={"green"}>
              <IconCheck size={20} color="green" />
            </ActionIcon>
            <p>Sauvegarder le rendez-vous</p>
          </div>
          <div
            className="editAppointmentToggleItem"
            onClick={() => props.setEditAppointment(false)}
          >
            <ActionIcon color={"red"}>
              <IconX size={20} color="red" />
            </ActionIcon>
            <p>Annuler les modifications</p>
          </div>
        </>
      ) : (
        <div
          className="editAppointmentToggleItem"
          onClick={() => props.setEditAppointment(true)}
        >
          <ActionIcon color={"yellow"}>
            {<IconPencil size={20} color="black" />}
          </ActionIcon>
          <p>Modifier le rendez-vous</p>
        </div>
      )}
    </div>
  );
};

export default EditAppointmentToggle;
