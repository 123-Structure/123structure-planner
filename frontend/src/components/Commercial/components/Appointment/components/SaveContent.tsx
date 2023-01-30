import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { IconDeviceFloppy } from "@tabler/icons";
import { Editor } from "@tiptap/react";
import React from "react";
import { IAppointment } from "../../../../../data/interfaces/IAppointment";

interface ISaveContentProps {
  handleContentChange: (newValue: string | undefined) => void;
}

const SaveContent = (props: ISaveContentProps) => {
  const { editor } = useRichTextEditorContext();

  return (
    <RichTextEditor.Control
      onClick={() => props.handleContentChange(editor.getHTML())}
      aria-label="Sauvegarder"
      title="Sauvegarder"
    >
      <IconDeviceFloppy stroke={1.5} size={16} />
    </RichTextEditor.Control>
  );
};

export default SaveContent;
