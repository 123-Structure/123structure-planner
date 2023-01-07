import {
  createStyles,
  Indicator,
  NumberInput,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconCalculator,
  IconCalendar,
  IconCalendarTime,
  IconPencil,
} from "@tabler/icons";
import dayjs from "dayjs";
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

const useStyles = createStyles((theme) => ({
  outside: {
    opacity: 0,
  },
}));

const Planification = (props: IPlanificationProps) => {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  const totalTime = (drawTime: number, engineeringTime: number) => {
    return `${(drawTime + engineeringTime).toFixed(2).toString()}h`;
  };

  const getRemainingTimeBgColor = (date: Date) => {
    const rendu = dayjs(date.toLocaleDateString("fr"), "DD-MM-YYYY");
    const today = dayjs(new Date().toLocaleDateString("fr"), "DD-MM-YYYY");
    const diff = rendu.diff(today, "day");
    console.log();
    const bgColor =
      date.getTime() === props.renderingDate.getTime()
        ? { backgroundColor: theme.colors.dark[2] }
        : diff > 9 && date.getDay() !== 0 && date.getDay() !== 6
        ? { backgroundColor: theme.colors.green[2] }
        : diff <= 9 && diff > 3 && date.getDay() !== 0 && date.getDay() !== 6
        ? { backgroundColor: theme.colors.orange[2] }
        : diff <= 9 && diff > 0 && date.getDay() !== 0 && date.getDay() !== 6
        ? { backgroundColor: theme.colors.red[2] }
        : {};

    return bgColor;
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
        dayClassName={(date, modifiers) =>
          cx({
            [classes.outside]: modifiers.outside,
          })
        }
        onChange={(val: Date) => props.setRenderingDate(val)}
        dayStyle={(date) => getRemainingTimeBgColor(date)}
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
