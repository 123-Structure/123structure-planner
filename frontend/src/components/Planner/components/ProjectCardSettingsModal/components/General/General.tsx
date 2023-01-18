import { Card, MultiSelect, TextInput, useMantineTheme } from "@mantine/core";
import {
  IconCalculator,
  IconFileDescription,
  IconId,
  IconPencil,
} from "@tabler/icons";
import { useRessources } from "../../../../../../context/RessourceContext";
import { IProject } from "../../../../../../data/interfaces/IProject";
import { TRole } from "../../../../../../data/types/TRole";
import CustomTitle from "../../../../../utils/CustomTitle";
import Ressource from "../../../Grid/Ressource";
import MultiDessinateurSelect from "./components/MultiDessinateurSelect";
import MultiIngenieurSelect from "./components/MultiIngenieurSelect";

interface IGeneralProps {
  project: IProject;
  subcontracting: string;
  setSubcontracting: React.Dispatch<React.SetStateAction<string>>;
}

const General = (props: IGeneralProps) => {
  const theme = useMantineTheme();

  return (
    <div id="general">
      <CustomTitle
        icon={<IconFileDescription size={24} />}
        title={"Général :"}
      />
      <div>
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
          className="sousTraitanceInput"
          label="N° Sous-traitance"
          placeholder="00.00.000A"
          icon={<IconId color={theme.colors.yellow[6]} />}
          value={props.subcontracting}
          onChange={(event) =>
            props.setSubcontracting(event.currentTarget.value)
          }
        ></TextInput>
      </div>
      <div
        style={{
          width: "100%",
          borderTop: "2px dotted #dfe2e6",
          marginTop: "16px",
        }}
      >
        <MultiDessinateurSelect project={props.project} />
        <MultiIngenieurSelect project={props.project} />
      </div>
    </div>
  );
};

export default General;
