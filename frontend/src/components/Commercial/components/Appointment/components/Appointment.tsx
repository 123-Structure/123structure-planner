import { RichTextEditor, Link } from "@mantine/tiptap";
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
import { showNotification } from "@mantine/notifications";
import EditModeToggle from "../../../../utils/EditModeToggle";
import { TAppointmentTitle } from "../../../../../data/types/TApppointmentTitle";
import { IconMap2, IconUser } from "@tabler/icons";
import CustomerItem from "../../utils/CustomerItem";
import { isCPFormat } from "../../../../../utils/validateInput";
import { useState } from "react";
import Contact from "../../utils/Contact";
import {
  ActionIcon,
  MultiSelect,
  SelectItem,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  useCustomer,
  useUpdateCustomer,
} from "../../../../../context/CustomerContext";
import {
  useCustomerRoutes,
  useUpdateCustomerRoutes,
} from "../../../../../context/CustomerRoutes";

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
}

const Appointment = (props: IAppointmentProps) => {
  const [address, setAddress] = useState<string>(
    props.appointment.location.address
  );
  const [cp, setCp] = useState<string>(props.appointment.location.cp);
  const [city, setCity] = useState<string>(props.appointment.location.city);
  const [appointmentContact, setAppointmentContact] = useState(
    props.appointment.contact
  );

  const customer = useCustomer();
  const setCustomer = useUpdateCustomer();
  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

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

  const handleContentChange = async (newValue: string | undefined) => {
    if (customer !== undefined) {
      const changedCustomer = customer;

      if (newValue !== undefined) {
        changedCustomer.appointment[props._id].content = newValue;
      }
      changedCustomer.appointment[props._id].title =
        props.appointmentTitle as TAppointmentTitle;
      changedCustomer.appointment[props._id].date = props.appointmentDate;
      changedCustomer.appointment[props._id].location.address = address;
      changedCustomer.appointment[props._id].location.cp = cp;
      changedCustomer.appointment[props._id].location.city = city;
      changedCustomer.appointment[props._id].contact = appointmentContact;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/customers/${
          changedCustomer._id as string
        }`,
        {
          method: "PATCH",
          body: JSON.stringify({ appointment: changedCustomer.appointment }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        showNotification({
          title: `⛔ Erreur serveur`,
          message: data.error,
          color: "red",
        });
      }

      setCustomer(changedCustomer);
    }
  };

  const handleValideClick = () => {
    handleContentChange(editor?.getHTML());
    props.setEditAppointment(false);
    setCustomerRoutes({
      ...customerRoutes,
      appointment: `${props.appointmentTitle} (${new Date(
        props.appointmentDate
      ).toLocaleDateString("fr")})`,
    });
    showNotification({
      title: `✅ Rendez-vous sauvegardé`,
      message: `${props.customer.name} - ${props.appointment.title} (${new Date(
        props.appointment.date
      ).toLocaleDateString("fr")}) mis à jour`,
      color: "green",
    });
  };

  const handleCancelClick = () => {
    props.setEditAppointment(false);
    props.setAppointmentTitle(props.appointment.title);
    props.setAppointmentDate(props.appointment.date);
    setAddress(props.appointment.location.address);
    setCp(props.appointment.location.cp);
    setCity(props.appointment.location.city);
    setAppointmentContact(props.appointment.contact);

    showNotification({
      title: `⛔ Rendez-vous non sauvegardé`,
      message: `Les modifications pour ${props.customer.name} - ${
        props.appointment.title
      } (${new Date(props.appointment.date).toLocaleDateString(
        "fr"
      )}) sont annulées`,
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
          props.setAppointmentDate(props.appointment.date);
          props.setEditAppointment(true);
        }}
        handleValideClick={handleValideClick}
        handleCancelClick={handleCancelClick}
      />
      <div className="appointementHeader">
        <div className="appointmentAddressContainer">
          <CustomerItem
            editMode={props.editAppointment}
            inputType={"text"}
            label={["Adresse", "CP", "Ville"]}
            value={[address, cp, city]}
            updateValue={[setAddress, setCp, setCity]}
            icon={<IconMap2 size={24} color="black" />}
            color="yellow"
            handleClick={() =>
              openURL(
                `https://www.google.fr/maps/search/${props.appointment.location.address}, ${props.appointment.location.cp} ${props.appointment.location.city}`
              )
            }
            errorMessage={[
              isCPFormat(cp) ? "" : ".",
              isCPFormat(cp) ? "" : "Code postale de 5 chiffres",
              isCPFormat(cp) ? "" : ".",
            ]}
          />
        </div>
        {props.editAppointment ? (
          <div className="appointmentContactContainer">
            <ActionIcon size="xl" variant="filled" color={"yellow"}>
              <IconUser size={24} color="black" />
            </ActionIcon>
            <MultiSelect
              className="appointmentContactMultiSelect"
              searchable={!smallScreen}
              nothingFound="Aucun résultat"
              clearable
              data={props.customer.contact.reduce((acc, contact) => {
                const item = {
                  value: contact._id,
                  label: `${contact.gender} ${contact.firstName} ${contact.lastName}`,
                } as SelectItem;
                acc.push(item);
                return acc;
              }, [] as (string | SelectItem)[])}
              value={appointmentContact}
              onChange={(val) => {
                setAppointmentContact(val);
              }}
            />
          </div>
        ) : (
          <div className="contactContainer">
            {props.customer.contact
              .filter((contact) =>
                props.appointment.contact.includes(contact._id as string)
              )
              .map((currentContact, index) => (
                <Contact
                  editMode={props.editAppointment}
                  key={index}
                  customer={props.customer}
                  currentContact={currentContact}
                />
              ))}
          </div>
        )}
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
