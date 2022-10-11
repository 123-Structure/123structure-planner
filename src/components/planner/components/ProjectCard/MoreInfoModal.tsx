import { Input, NumberInput, Modal, useMantineTheme } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Dispatch, SetStateAction } from "react";
import "dayjs/locale/fr";
import {
  IconCalculator,
  IconCalendar,
  IconId,
  IconPencil,
} from "@tabler/icons";
import { IProject } from "../../../../data/interfaces/IProject";

interface IProjectCardProps {
  showMoreInfo: boolean;
  setShowMoreInfo: Dispatch<SetStateAction<boolean>>;
  project: IProject;
}

const MoreInfoModal = (props: IProjectCardProps) => {
  const theme = useMantineTheme();

  return (
    <Modal
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={props.showMoreInfo}
      onClose={() => props.setShowMoreInfo(false)}
      size="calc(window.screen.width-25%)"
      padding={"xl"}
    >
      <p>
        <b>N° 123 : </b>
        {props.project.DOSSIER}
      </p>
      <div
        className="sst"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <b>N° SST : </b>
        <Input
          placeholder="00.00.000A"
          style={{ width: "25%" }}
          icon={<IconId color={theme.colors.yellow[6]} />}
        />
      </div>
      <p>
        <b>Nom : </b>
        {props.project.AFFAIRE}
      </p>
      <p>
        <b>Client : </b>
        {props.project.CLIENT !== "" ? props.project.CLIENT : "-"}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        <b>H ING : </b>
        <NumberInput
          id={"h_ing"}
          defaultValue={0}
          step={0.5}
          precision={2}
          min={0}
          icon={<IconCalculator color={theme.colors.yellow[6]} />}
        />
        <b>H DES : </b>
        <NumberInput
          id={"h_des"}
          defaultValue={0}
          step={0.5}
          precision={2}
          min={0}
          icon={<IconPencil color={theme.colors.yellow[6]} />}
        />
        <b>RENDU : </b>
        <DatePicker
          locale="fr"
          excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
          inputFormat="MM/DD/YYYY"
          defaultValue={new Date()}
          icon={<IconCalendar color={theme.colors.yellow[6]} />}
        />
      </div>
    </Modal>
  );
};

export default MoreInfoModal;
