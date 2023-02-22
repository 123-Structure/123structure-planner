import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { IconStar } from '@tabler/icons';
import React from 'react'

const InsertStarControl = () => {
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.Control
      onClick={() => editor?.commands.insertContent("⭐")}
      aria-label="Insert star emoji"
      title="Insert star emoji"
    >
      <IconStar stroke={1.5} size={16} />
    </RichTextEditor.Control>
  );
};

export default InsertStarControl