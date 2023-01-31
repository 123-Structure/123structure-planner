import { ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconPencil, IconX } from "@tabler/icons";
import "../../assets/style/EditModeToggle.css";

interface IEditModeToggleProps {
  disabled?: boolean;
  editMode: boolean;
  editLabel: string;
  validateLabel: string;
  cancelLabel: string;
  handleEditClick: () => void;
  handleValideClick: () => void;
  handleCancelClick: () => void;
}

const EditModeToggle = (props: IEditModeToggleProps) => {
  return (
    <div className="editModeToggle">
      {props.editMode ? (
        <>
          {props.validateLabel !== "" ? (
            <div
              className="editModeToggleItem"
              onClick={
                props.disabled
                  ? () =>
                      showNotification({
                        title: `⛔ Erreur à corriger`,
                        message: `Un ou plusieurs champs de saisie requiert votre attention`,
                        color: "red",
                      })
                  : props.handleValideClick
              }
            >
              <ActionIcon color={props.disabled ? "gray" : "green"}>
                <IconCheck
                  size={20}
                  color={props.disabled ? "gray" : "green"}
                />
              </ActionIcon>
              <p>{props.validateLabel}</p>
            </div>
          ) : (
            <ActionIcon
              color={props.disabled ? "gray" : "green"}
              onClick={
                props.disabled
                  ? () =>
                      showNotification({
                        title: `⛔ Erreur à corriger`,
                        message: `Un ou plusieurs champs de saisie requiert votre attention`,
                        color: "red",
                      })
                  : props.handleValideClick
              }
            >
              <IconCheck size={20} color={props.disabled ? "gray" : "green"} />
            </ActionIcon>
          )}
          {props.cancelLabel !== "" ? (
            <div
              className="editModeToggleItem"
              onClick={props.handleCancelClick}
            >
              <ActionIcon color={"red"}>
                <IconX size={20} color="red" />
              </ActionIcon>
              <p>{props.cancelLabel}</p>
            </div>
          ) : (
            <ActionIcon color={"red"} onClick={props.handleCancelClick}>
              <IconX size={20} color="red" />
            </ActionIcon>
          )}
        </>
      ) : (
        <>
          {props.editLabel !== "" ? (
            <div className="editModeToggleItem" onClick={props.handleEditClick}>
              <ActionIcon color={"yellow"}>
                {<IconPencil size={20} color="black" />}
              </ActionIcon>
              <p>{props.editLabel}</p>
            </div>
          ) : (
            <ActionIcon color={"yellow"} onClick={props.handleEditClick}>
              {<IconPencil size={20} color="black" />}
            </ActionIcon>
          )}
        </>
      )}
    </div>
  );
};

export default EditModeToggle;
