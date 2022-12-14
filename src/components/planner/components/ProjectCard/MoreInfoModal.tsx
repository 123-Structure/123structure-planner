import { Input, NumberInput, Modal, useMantineTheme } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Dispatch, SetStateAction, useState } from "react";
import "dayjs/locale/fr";
import {
  IconCalculator,
  IconCalendar,
  IconDeviceFloppy,
  IconFolder,
  IconId,
  IconPencil,
} from "@tabler/icons";
import { IProject } from "../../../../data/interfaces/IProject";
import ModalTitle from "../../../utils/ModalTitle";
import CustomButton from "../../../utils/CustomButton";

interface IProjectCardProps {
  showMoreInfo: boolean;
  setShowMoreInfo: Dispatch<SetStateAction<boolean>>;
  project: IProject;
}

const MoreInfoModal = (props: IProjectCardProps) => {
  const theme = useMantineTheme();

  const [drawTime, setDrawTime] = useState(props.project.H_DESSIN);
  const [engineeringTime, setEngineeringTime] = useState(
    props.project.H_INGENIEUR
  );

  const totalTime = (drawTime: number, engineeringTime: number) => {
    return `${(drawTime + engineeringTime).toFixed(2).toString()}h`;
  };

  const handleSubmit = () => {
    props.project.H_DESSIN = drawTime;
    props.project.H_INGENIEUR = engineeringTime;
    props.setShowMoreInfo(false);
  };

  return (
    <Modal
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={props.showMoreInfo}
      onClose={() => props.setShowMoreInfo(false)}
      size="calc(window.screen.width-25%)"
      padding={"xl"}
      title={
        <ModalTitle
          icon={<IconFolder size={24} />}
          title={`${props.project.DOSSIER} - ${props.project.AFFAIRE}`}
        />
      }
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "60% 40%",
          flexDirection: "row",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
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
          <Input.Wrapper label="N° Sous-traitance">
            <Input
              placeholder="00.00.000A"
              style={{ width: "100%" }}
              icon={<IconId color={theme.colors.yellow[6]} />}
            />
          </Input.Wrapper>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            gap: "8px",
            paddingLeft: "16px",
            borderLeft: "1px solid black",
          }}
        >
          <NumberInput
            id={"h_ing"}
            label={'Temps "Ingenieur"'}
            defaultValue={0}
            step={0.5}
            precision={2}
            min={0}
            icon={<IconCalculator color={theme.colors.yellow[6]} />}
            value={engineeringTime}
            onChange={(val: number) => setEngineeringTime(val)}
          />
          <NumberInput
            id={"h_des"}
            label={'Temps "Dessin"'}
            defaultValue={0}
            step={0.5}
            precision={2}
            min={0}
            icon={<IconPencil color={theme.colors.yellow[6]} />}
            value={drawTime}
            onChange={(val: number) => setDrawTime(val)}
          />
          <p>
            <b>Temps total : </b>
            {totalTime(drawTime, engineeringTime)}
          </p>
          <DatePicker
            label={"Date de rendu"}
            locale="fr"
            excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
            inputFormat="DD/MM/YYYY"
            defaultValue={new Date()}
            icon={<IconCalendar color={theme.colors.yellow[6]} />}
          />
        </div>
      </div>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <CustomButton
          handleClick={handleSubmit}
          icon={<IconDeviceFloppy />}
          label={"Enregistrer"}
        />
      </div>
    </Modal>
  );
};

export default MoreInfoModal;
