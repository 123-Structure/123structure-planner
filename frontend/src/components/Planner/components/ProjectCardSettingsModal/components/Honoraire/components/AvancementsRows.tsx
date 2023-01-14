import { Indicator, NumberInput, useMantineTheme } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar, IconCurrencyEuro } from "@tabler/icons";
import React from "react";
import { IAvancement } from "../../../../../../../data/interfaces/IAvancement";
import { IProject } from "../../../../../../../data/interfaces/IProject";

interface IAvancementsRows {
  avancements: IAvancement[];
  editProgress: boolean;
  project: IProject;
}

const AvancementsRows = (props: IAvancementsRows) => {
  const theme = useMantineTheme();

  return (
    <>
      {props.avancements.map((avancement, index) =>
        props.editProgress ? (
          <tr
            key={avancement._id}
            className={`${
              index === props.avancements.length - 1
                ? "progress-table-lastRow"
                : ""
            }`}
          >
            <td className="progress-table-data">
              <DatePicker
                allowFreeInput
                dropdownPosition={undefined}
                locale="fr"
                excludeDate={(date) =>
                  date.getDay() === 0 || date.getDay() === 6
                }
                inputFormat="DD/MM/YYYY"
                defaultValue={avancement.date}
                onChange={(val: Date) => (avancement.date = val)}
                renderDay={(date) => {
                  const day = date.toLocaleDateString("fr");
                  const today = new Date().toLocaleDateString("fr");
                  return (
                    <Indicator
                      size={6}
                      color="red"
                      offset={8}
                      disabled={day !== today}
                    >
                      <div>{date.getDate()}</div>
                    </Indicator>
                  );
                }}
                icon={<IconCalendar color={theme.colors.yellow[6]} />}
              />
            </td>
            <td className="progress-table-data">
              <NumberInput
                defaultValue={parseFloat(avancement.amount)}
                step={100}
                precision={2}
                min={0}
                icon={<IconCurrencyEuro color={theme.colors.yellow[6]} />}
                value={parseFloat(avancement.amount)}
                onChange={(val: number) => (avancement.amount = val.toString())}
              />
            </td>
            <td className="progress-table-data">...</td>
            <td className="progress-table-data">...</td>
            <td className="progress-table-data">...</td>
          </tr>
        ) : (
          <tr
            key={avancement._id}
            style={{
              backgroundColor:
                index === props.avancements.length - 1
                  ? theme.colors.yellow[1]
                  : "",
              borderBottomStyle: "solid",
              borderBottomWidth: "2px",
              borderBottomColor:
                index === props.avancements.length - 1
                  ? theme.colors.yellow[5]
                  : "",
              fontWeight:
                index === props.avancements.length - 1 ? "bold" : "normal",
            }}
          >
            <td className="progress-table-data" style={{ width: "15%" }}>
              {avancement.date.toLocaleDateString("fr")}
            </td>
            <td className="progress-table-data" style={{ width: "15%" }}>
              {parseFloat(avancement.amount).toFixed(2).toString()}
            </td>
            <td className="progress-table-data">
              {index > 0
                ? props.avancements
                    .slice(0, index + 1)
                    .reduce((acc, p) => acc + parseFloat(p.amount), 0)
                    .toFixed(2)
                : parseFloat(avancement.amount).toFixed(2)}
            </td>
            <td className="progress-table-data">
              {(
                (parseFloat(avancement.amount) /
                  parseFloat(props.project["MONTANT DEVIS (EUR HT)"])) *
                100
              ).toFixed(2)}
            </td>
            <td className="progress-table-data">
              {index > 0
                ? props.avancements
                    .slice(0, index + 1)
                    .reduce(
                      (acc, p) =>
                        acc +
                        (parseFloat(p.amount) /
                          parseFloat(props.project["MONTANT DEVIS (EUR HT)"])) *
                          100,
                      0
                    )
                    .toFixed(2)
                : (
                    (parseFloat(avancement.amount) /
                      parseFloat(props.project["MONTANT DEVIS (EUR HT)"])) *
                    100
                  ).toFixed(2)}
            </td>
          </tr>
        )
      )}
    </>
  );
};

export default AvancementsRows;
