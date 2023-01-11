import { TextInput, useMantineTheme } from "@mantine/core";
import { IconFileDescription, IconId } from "@tabler/icons";
import { IProject } from "../../../../../data/interfaces/IProject";
import CustomTitle from "../../../../utils/CustomTitle";

interface IGeneralProps {
  project: IProject;
  subcontracting: string;
  setSubcontracting: React.Dispatch<React.SetStateAction<string>>;
}

const General = (props: IGeneralProps) => {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingRight: "16px",
      }}
    >
      <CustomTitle
        icon={<IconFileDescription size={24} />}
        title={"Général :"}
      />
      <p>
        <b>N° de dossier : </b>
        {props.project.DOSSIER}
      </p>
      <p>
        <b>Nom : </b>
        {props.project.AFFAIRE}
      </p>
      <p>
        <b>Client : </b>
        {props.project.CLIENT !== "" ? props.project.CLIENT : "-"}
      </p>
      <TextInput
        label="N° Sous-traitance"
        style={{ marginBottom: "16px" }}
        placeholder="00.00.000A"
        icon={<IconId color={theme.colors.yellow[6]} />}
        value={props.subcontracting}
        onChange={(event) => props.setSubcontracting(event.currentTarget.value)}
      ></TextInput>
    </div>
  );
};

export default General;
