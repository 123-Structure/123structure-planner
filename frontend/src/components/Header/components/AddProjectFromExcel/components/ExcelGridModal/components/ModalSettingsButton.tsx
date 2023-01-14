import { Badge } from "@mantine/core";
import ModalSettings from "./ModalSettings";

interface IExcelSettings {
  projectLength: number | undefined;
  showParams: string[];
  setShowParams: React.Dispatch<React.SetStateAction<string[]>>;
  newProjectLength: number | undefined;
  duplicatedProjectLength: number | undefined;
}

const ModalSettingsButton = (props: IExcelSettings) => {
  return (
    <div className="modalSettingsButton">
      <h2 className="loadProjectLength">
        {props.projectLength !== undefined ? props.projectLength : 0} Affaire(s)
        chargée(s)
      </h2>
      <div className="newOrDuplicatedProjectBadgeContainer">
        <Badge
          className="newOrDuplicatedProjectBadge"
          color={"green"}
          fullWidth
        >
          {props.newProjectLength} nouveau(x) projet(s)
        </Badge>
        {props.duplicatedProjectLength !== 0 ? (
          <Badge
            className="newOrDuplicatedProjectBadge"
            color={"blue"}
            fullWidth
          >
            dont {props.duplicatedProjectLength} projet(s) à completer
          </Badge>
        ) : (
          <></>
        )}
        <Badge color={"red"} fullWidth>
          {props.newProjectLength !== undefined &&
          props.projectLength !== undefined
            ? props.projectLength - props.newProjectLength
            : 0}{" "}
          projets existants
        </Badge>
      </div>
      <ModalSettings
        showParams={props.showParams}
        setShowParams={props.setShowParams}
      />
    </div>
  );
};

export default ModalSettingsButton;
