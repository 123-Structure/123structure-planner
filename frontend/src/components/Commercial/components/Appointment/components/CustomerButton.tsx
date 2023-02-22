import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { IconAddressBook, IconMail, IconMap2, IconPhone } from "@tabler/icons";
import React from "react";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";

interface ICustomerButtonProps {
  customer: ICustomer;
}

const CustomerButton = (props: ICustomerButtonProps) => {
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.ControlsGroup>
      <RichTextEditor.Control
        onClick={() => editor?.commands.insertContent(props.customer.name)}
        aria-label="Nom du client"
        title="Nom du client"
      >
        <IconAddressBook stroke={1.5} size={16} />
      </RichTextEditor.Control>
      <RichTextEditor.Control
        onClick={() =>
          editor?.commands.insertContent(
            `${props.customer.location.address}, ${props.customer.location.cp} ${props.customer.location.city}`.replace(
              "\n",
              " "
            )
          )
        }
        aria-label="Adresse"
        title="Adresse"
      >
        <IconMap2 stroke={1.5} size={16} />
      </RichTextEditor.Control>
      <RichTextEditor.Control
        onClick={() => editor?.commands.insertContent(props.customer.email)}
        aria-label="Email de contact"
        title="Email de contact"
      >
        <IconMail stroke={1.5} size={16} />
      </RichTextEditor.Control>
      <RichTextEditor.Control
        onClick={() => editor?.commands.insertContent(props.customer.phone)}
        aria-label="Téléphone de contact"
        title="Téléphone de contact"
      >
        <IconPhone stroke={1.5} size={16} />
      </RichTextEditor.Control>
    </RichTextEditor.ControlsGroup>
  );
};

export default CustomerButton;
