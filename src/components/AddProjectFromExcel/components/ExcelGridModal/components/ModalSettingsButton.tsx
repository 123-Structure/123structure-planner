import { Badge } from "@mantine/core";
import ModalSettings from "./ModalSettings";

interface IExcelSettings {
  projectLength: number | undefined;
  showParams: string[];
  setShowParams: React.Dispatch<React.SetStateAction<string[]>>;
  newProjectLength: number | undefined;
}

const ModalSettingsButton = (props: IExcelSettings) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: "16px",
      }}
    >
      <div>
        <h2 style={{ margin: "0 16px 0 0" }}>
          {props.projectLength !== undefined ? props.projectLength : 0}{" "}
          Affaire(s) chargée(s)
        </h2>
        <div>
          <Badge color={"green"} style={{ marginRight: "8px" }}>
            {props.newProjectLength} nouveau(x) projet(s)
          </Badge>
          <Badge color={"red"}>
            {props.newProjectLength !== undefined &&
            props.projectLength !== undefined
              ? props.projectLength - props.newProjectLength
              : 0}
            projets existants
          </Badge>
        </div>
      </div>
      <ModalSettings
        showParams={props.showParams}
        setShowParams={props.setShowParams}
      />
    </div>
  );
};

export default ModalSettingsButton;
