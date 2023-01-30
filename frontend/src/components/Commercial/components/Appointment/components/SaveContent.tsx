import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { IconDeviceFloppy } from "@tabler/icons";
import { Editor } from "@tiptap/react";
import React from "react";
import { IAppointment } from "../../../../../data/interfaces/IAppointment";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";

interface ISaveContentProps {
  _id: number;
  customer: ICustomer;
  appointment: IAppointment;
  handleContentChange: (editor: Editor) => void;
}

const SaveContent = (props: ISaveContentProps) => {
  const { editor } = useRichTextEditorContext();

  return (
    <RichTextEditor.Control
      onClick={() => props.handleContentChange(editor)}
      aria-label="Sauvegarder"
      title="Sauvegarder"
    >
      <IconDeviceFloppy stroke={1.5} size={16} />
    </RichTextEditor.Control>
  );
};

export default SaveContent;
