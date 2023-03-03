import {
  createStyles,
  Indicator,
  NumberInput,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import {
  IconCalculator,
  IconCalendar,
  IconCalendarTime,
  IconPencil,
} from "@tabler/icons";
import dayjs from "dayjs";
import { IProject } from "../../../../../../data/interfaces/IProject";
import CustomTitle from "../../../../../utils/CustomTitle";
import RemainingTimeCaption from "./components/RemainingTimeCaption";
import ReactDOM from "react-dom";

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
    const color =
      date.getTime() === props.renderingDate.getTime()
        ? theme.colors.dark[6]
        : diff > 9 && date.getDay() !== 0 && date.getDay() !== 6
        ? theme.colors.green[6]
        : diff <= 9 && diff > 3 && date.getDay() !== 0 && date.getDay() !== 6
        ? theme.colors.orange[6]
        : diff <= 3 && diff > 0 && date.getDay() !== 0 && date.getDay() !== 6
        ? theme.colors.red[6]
        : "";

    return color;
  };

  // const addCaption = () => {
  //   const dropDown = document.querySelector("#mantine-fyk3l99li-dropdown");
  //   const container = document.createElement("div");
  //   container.id = "captionContainer";
  //   container.style.marginTop = "16px";
  //   dropDown?.appendChild(container);
  //   ReactDOM.render(
  //     <>
  //       <RemainingTimeCaption
  //         color={theme.colors.red[5]}
  //         label={"Moins de 3 jours"}
  //       />
  //       <RemainingTimeCaption
  //         color={theme.colors.orange[5]}
  //         label={"Entre 3 et 9 jours"}
  //       />
  //       <RemainingTimeCaption
  //         color={theme.colors.green[5]}
  //         label={"Plus de 9 jours"}
  //       />
  //     </>,
  //     document.getElementById("captionContainer")
  //   );
  // };

  const handleDateChange = (val: Date) => {
    props.setRenderingDate(val);
    props.project.RENDU = val.toLocaleDateString("fr");
  };

  return (
    <div id="planification">
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

      {/* <div onClick={addCaption}> */}
      <div>
        <DatePickerInput
          id="renderingDatePicker"
          label={"Date de rendu"}
          locale="fr"
          excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
          valueFormat="DD/MM/YYYY"
          // defaultValue={new Date()}
          value={props.renderingDate}
          // dayClassName={(date, modifiers) =>
          //   cx({
          //     [classes.outside]: modifiers.outside,
          //   })
          // }
          onChange={(val: Date) => handleDateChange(val)}
          // dayStyle={(date: Date) => getRemainingTimeBgColor(date)}
          renderDay={(date) => {
            const day = date.toLocaleDateString("fr");
            const today = new Date().toLocaleDateString("fr");

            return (
              <Indicator
                size={6}
                color="red"
                offset={-2}
                disabled={day !== today}
              >
                <div
                  style={{
                    color: getRemainingTimeBgColor(date),
                  }}
                >
                  {date.getDate()}
                </div>
              </Indicator>
            );
          }}
          icon={<IconCalendar color={theme.colors.yellow[6]} />}
        />
      </div>
    </div>
  );
};

export default Planification;
