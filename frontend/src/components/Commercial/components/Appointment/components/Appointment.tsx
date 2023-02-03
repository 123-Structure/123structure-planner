import {
  RichTextEditor,
  Link,
  useRichTextEditorContext,
} from "@mantine/tiptap";
import { BubbleMenu, FloatingMenu, useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { IAppointment } from "../../../../../data/interfaces/IAppointment";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import SaveContent from "./SaveContent";
import CustomerButton from "./CustomerButton";
import InsertStarControl from "./InsertStarControl";
import {
  useCustomer,
  useUpdateCustomer,
} from "../../../../../context/CustomerContext";
import { showNotification } from "@mantine/notifications";
import EditModeToggle from "../../../../utils/EditModeToggle";
import { TAppointmentTitle } from "../../../../../data/types/TApppointmentTitle";
import CustomButton from "../../../../utils/CustomButton";
import { IconMap2, IconUser } from "@tabler/icons";
import CustomerItem from "../../Customer/components/CustomerItem";

interface IAppointmentProps {
  _id: number;
  customer: ICustomer;
  appointment: IAppointment;
  editAppointment: boolean;
  setEditAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  appointmentTitle: string | TAppointmentTitle | null;
  setAppointmentTitle: React.Dispatch<
    React.SetStateAction<string | null | TAppointmentTitle>
  >;
  appointmentDate: Date;
  setAppointmentDate: React.Dispatch<React.SetStateAction<Date>>;
  setAccordionValue: React.Dispatch<React.SetStateAction<string | null>>;
}

const Appointment = (props: IAppointmentProps) => {
  const customers = useCustomer();
  const setCustomers = useUpdateCustomer();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Saisir ici votre compte-rendu de visite",
      }),
    ],
    content: props.appointment.content,
  });

  const openURL = (url: string) => {
    window.open(url, "_blank");
  };

  const handleContentChange = (newValue: string | undefined) => {
    const newCustomer = [...customers];
    const changedCustomer = newCustomer.filter(
      (customer) =>
        customer.category === props.customer.category &&
        customer.group === props.customer.group &&
        customer.name === props.customer.name
    );
    if (newValue !== undefined) {
      changedCustomer[0].appointment[props._id].content = newValue;
    }
    changedCustomer[0].appointment[props._id].title =
      props.appointmentTitle as TAppointmentTitle;
    changedCustomer[0].appointment[props._id].date = props.appointmentDate;
    setCustomers(newCustomer);
  };

  const handleValideClick = () => {
    handleContentChange(editor?.getHTML());
    showNotification({
      title: `✅ Rendez-vous sauvegardé`,
      message: `${props.customer.name} - ${
        props.appointment.title
      } (${props.appointment.date.toLocaleDateString("fr")}) mis à jour`,
      color: "green",
    });
    props.setEditAppointment(false);
    props.setAccordionValue(
      `${props.appointmentTitle} (${props.appointmentDate.toLocaleDateString(
        "fr"
      )})`
    );
  };

  const handleCancelClick = () => {
    props.setEditAppointment(false);
    props.setAppointmentTitle(props.appointment.title);
    props.setAppointmentDate(props.appointment.date);
    showNotification({
      title: `⛔ Rendez-vous non sauvegardé`,
      message: `Les modifications pour ${props.customer.name} - ${
        props.appointment.title
      } (${props.appointment.date.toLocaleDateString("fr")}) sont annulées`,
      color: "red",
    });
  };

  const colorPicker = (
    <RichTextEditor.ColorPicker
      colors={[
        "#25262b",
        "#868e96",
        "#fa5252",
        "#e64980",
        "#be4bdb",
        "#7950f2",
        "#4c6ef5",
        "#228be6",
        "#15aabf",
        "#12b886",
        "#40c057",
        "#82c91e",
        "#fab005",
        "#fd7e14",
      ]}
    />
  );

  const alignText = (
    <RichTextEditor.ControlsGroup>
      <RichTextEditor.AlignLeft />
      <RichTextEditor.AlignCenter />
      <RichTextEditor.AlignJustify />
      <RichTextEditor.AlignRight />
    </RichTextEditor.ControlsGroup>
  );

  return (
    <>
      <EditModeToggle
        editMode={props.editAppointment}
        editLabel="Modifier le rendez-vous"
        validateLabel="Sauvegarder le rendez-vous"
        cancelLabel="Annuler les modifications"
        handleEditClick={() => {
          props.setAppointmentTitle(props.appointment.title);
          props.setEditAppointment(true);
        }}
        handleValideClick={handleValideClick}
        handleCancelClick={handleCancelClick}
      />
      <div className="appointementHeader">
        <div className="contactContainer">
          {props.appointment.contact.map((contact, index) => (
            <CustomButton
              key={index}
              handleClick={() => console.log("test")}
              icon={<IconUser />}
              label={`${contact.firstName} ${contact.lastName}`}
            />
          ))}
        </div>
        <CustomerItem
          label={[
            props.appointment.location.address,
            props.appointment.location.cp,
            props.appointment.location.city,
          ]}
          icon={<IconMap2 size={24} color="black" />}
          color="yellow"
          handleClick={() =>
            openURL(
              `https://www.google.fr/maps/search/${props.appointment.location.address}, ${props.appointment.location.cp} ${props.appointment.location.city}`
            )
          }
        />
      </div>
      {props.editAppointment ? (
        <RichTextEditor className="textEditor" editor={editor}>
          <RichTextEditor.Toolbar sticky>
            {editor && (
              <BubbleMenu editor={editor}>
                <RichTextEditor.ControlsGroup>
                  {colorPicker}
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>
                {alignText}
              </BubbleMenu>
            )}
            {editor && (
              <FloatingMenu editor={editor}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.BulletList />
                  {colorPicker}
                </RichTextEditor.ControlsGroup>
              </FloatingMenu>
            )}
            {colorPicker}
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>
            {alignText}
            <CustomerButton customer={props.customer} />
            <InsertStarControl />
            <SaveContent handleContentChange={handleContentChange} />
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>
      ) : (
        <div
          style={{
            marginTop: "16px",
          }}
          dangerouslySetInnerHTML={{ __html: props.appointment.content }}
        />
      )}
    </>
  );
};

export default Appointment;
