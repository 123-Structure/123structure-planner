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
        display: "grid",
        gridTemplateColumns: "270px max-content ",
        rowGap: "8px",
        columnGap: "16px",
        marginBottom: "16px",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>
        {props.projectLength !== undefined ? props.projectLength : 0} Affaire(s)
        chargée(s)
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gridColumn: "1",
        }}
      >
        <Badge color={"green"} style={{ margin: "0 0 8px 0" }} fullWidth>
          {props.newProjectLength} nouveau(x) projet(s)
        </Badge>
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
