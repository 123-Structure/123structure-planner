import { Input, useMantineTheme } from "@mantine/core";
import { IconFileDescription, IconId } from "@tabler/icons";
import { IProject } from "../../../../../data/interfaces/IProject";
import CustomTitle from "../../../../utils/CustomTitle";

interface IGeneralProps {
  project: IProject;
}

const General = (props: IGeneralProps) => {
  const theme = useMantineTheme();

  return (
    <>
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
      <Input.Wrapper label="N° Sous-traitance" style={{ marginBottom: "16px" }}>
        <Input
          placeholder="00.00.000A"
          style={{ width: "100%" }}
          icon={<IconId color={theme.colors.yellow[6]} />}
        />
      </Input.Wrapper>
    </>
  );
};

export default General;
