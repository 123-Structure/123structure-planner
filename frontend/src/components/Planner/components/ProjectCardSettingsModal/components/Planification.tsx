import { Indicator, NumberInput, useMantineTheme } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconCalculator,
  IconCalendar,
  IconCalendarTime,
  IconPencil,
} from "@tabler/icons";
import { IProject } from "../../../../../data/interfaces/IProject";
import CustomTitle from "../../../../utils/CustomTitle";

interface IPlanificationProps {
  project: IProject;
  engineeringTime: number;
  setEngineeringTime: React.Dispatch<React.SetStateAction<number>>;
  drawTime: number;
  setDrawTime: React.Dispatch<React.SetStateAction<number>>;
  renderingDate: Date;
  setRenderingDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Planification = (props: IPlanificationProps) => {
  const theme = useMantineTheme();

  const totalTime = (drawTime: number, engineeringTime: number) => {
    return `${(drawTime + engineeringTime).toFixed(2).toString()}h`;
  };

  return (
    <>
      <CustomTitle
        icon={<IconCalendarTime size={24} />}
        title={"Planification :"}
      />

      <NumberInput
        id={"h_ing"}
        label={'Temps "Ingenieur"'}
        defaultValue={0}
        step={0.5}
        precision={2}
        min={0}
        icon={<IconCalculator color={theme.colors.yellow[6]} />}
        value={props.engineeringTime}
        onChange={(val: number) => props.setEngineeringTime(val)}
      />
      <NumberInput
        id={"h_des"}
        label={'Temps "Dessin"'}
        defaultValue={0}
        step={0.5}
        precision={2}
        min={0}
        icon={<IconPencil color={theme.colors.yellow[6]} />}
        value={props.drawTime}
        onChange={(val: number) => props.setDrawTime(val)}
      />
      <p>
        <b>Temps total : </b>
        {totalTime(props.drawTime, props.engineeringTime)}
      </p>
      <DatePicker
        allowFreeInput
        label={"Date de rendu"}
        locale="fr"
        excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
        inputFormat="DD/MM/YYYY"
        // defaultValue={new Date()}
        value={props.renderingDate}
        onChange={(val: Date) => props.setRenderingDate(val)}
        renderDay={(date) => {
          const day = date.toLocaleDateString("fr");
          const today = new Date().toLocaleDateString("fr");
          return (
            <Indicator size={6} color="red" offset={8} disabled={day !== today}>
              <div>{date.getDate()}</div>
            </Indicator>
          );
        }}
        icon={<IconCalendar color={theme.colors.yellow[6]} />}
      />
    </>
  );
};

export default Planification;
