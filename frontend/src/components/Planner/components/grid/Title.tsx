import { useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import IsoWeek from "dayjs/plugin/IsoWeek";

dayjs.extend(IsoWeek);
const Title = () => {
  const theme = useMantineTheme();

  const getTitle = (weekIndex: number) => {
    const weekNumber =
      dayjs().isoWeek() + weekIndex > 52
        ? dayjs().isoWeek() + weekIndex - 52
        : dayjs().isoWeek() + weekIndex;
    const currentDayOfWeek = dayjs().isoWeekday() - 1;
    const mondayOfWeek = dayjs()
      .isoWeek(dayjs().isoWeek() + weekIndex)
      .subtract(currentDayOfWeek, "d")
      .format("DD/MM/YY");

    const sundayOfWeek = dayjs()
      .isoWeek(dayjs().isoWeek() + weekIndex)
      .subtract(currentDayOfWeek - 6, "d")
      .format("DD/MM/YY");

    return `S${weekNumber} - ${mondayOfWeek} au ${sundayOfWeek}`;
  };

  return (
    <div
      className="title"
      style={{
        backgroundColor: theme.colors.yellow[5],
      }}
    >
      <p>Nouvelle Entrée</p>
      <p>Ressource</p>
      <p>Facturation</p>
      <p>Correction</p>
      <p>Reprise</p>
      {/* <p>S01 - 00/00/00 au 00/00/00</p> */}
      {[...Array(6)].map((e, index) => (
        <p key={index}>{getTitle(index)}</p>
      ))}
    </div>
  );
};

export default Title;
