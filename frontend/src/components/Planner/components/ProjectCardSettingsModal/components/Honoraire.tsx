import {
  ActionIcon,
  Checkbox,
  Indicator,
  NumberInput,
  Switch,
  Table,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconCalendar,
  IconCheck,
  IconCirclePlus,
  IconCurrencyEuro,
  IconPencil,
  IconWallet,
  IconX,
} from "@tabler/icons";
import React, { useState } from "react";
import { IAvancement } from "../../../../../data/interfaces/IAvancement";
import { IProject } from "../../../../../data/interfaces/IProject";
import CustomButton from "../../../../utils/CustomButton";
import CustomTitle from "../../../../utils/CustomTitle";

import "../../../../../assets/style/Table.css";

interface IHonoraireProps {
  project: IProject;
}

const Honoraire = (props: IHonoraireProps) => {
  const theme = useMantineTheme();

  const [editInvoiceAmount, setEditInvoiceAmount] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState(
    parseFloat(props.project["MONTANT DEVIS (EUR HT)"])
  );

  const [avancements, setAvancements] = useState<IAvancement[]>(
    props.project.AVANCEMENT
  );
  const [newProgressDate, setNewProgressDate] = useState(new Date());
  const [newProgressAmount, setNewProgressAmount] = useState(0);
  const [editProgress, setEditProgress] = useState(false);

  const rows = avancements.map((avancement, index) =>
    editProgress ? (
      <tr
        key={avancement._id}
        className={`${
          index === avancements.length - 1 ? "progress-table-lastRow" : ""
        }`}
      >
        <td className="progress-table-data">
          <DatePicker
            allowFreeInput
            dropdownPosition={undefined}
            locale="fr"
            excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
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
            index === avancements.length - 1 ? theme.colors.yellow[1] : "",
          borderBottomStyle: "solid",
          borderBottomWidth: "2px",
          borderBottomColor:
            index === avancements.length - 1 ? theme.colors.yellow[5] : "",
          fontWeight: index === avancements.length - 1 ? "bold" : "normal",
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
            ? avancements
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
            ? avancements
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
  );

  const toggleEditInvoiceAmount = () => {
    setEditInvoiceAmount(!editInvoiceAmount);
  };

  const handleInvoiceAmountChange = () => {
    props.project["MONTANT DEVIS (EUR HT)"] = invoiceAmount.toString();
    setEditInvoiceAmount(!editInvoiceAmount);
  };

  const addRow = (newAvancement: IAvancement) => {
    setAvancements([...avancements, newAvancement]);
    props.project.AVANCEMENT.push(newAvancement);
    setNewProgressAmount(0);
    setNewProgressDate(new Date());
  };

  return (
    <>
      <CustomTitle icon={<IconWallet size={24} />} title={"Honoraires :"} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <p>
          <b>Total des Honoraires : </b>
        </p>

        {editInvoiceAmount ? (
          <NumberInput
            style={{ width: "30%" }}
            defaultValue={invoiceAmount}
            step={100}
            precision={2}
            min={0}
            icon={<IconCurrencyEuro color={theme.colors.yellow[6]} />}
            value={parseFloat(props.project["MONTANT DEVIS (EUR HT)"])}
            onChange={(val: number) => setInvoiceAmount(val)}
          />
        ) : (
          `${
            props.project["MONTANT DEVIS (EUR HT)"] !== ""
              ? props.project["MONTANT DEVIS (EUR HT)"]
              : "-"
          }€`
        )}

        {editInvoiceAmount ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <ActionIcon
              color={"green"}
              {...props}
              onClick={handleInvoiceAmountChange}
            >
              <IconCheck size={20} color="black" />
            </ActionIcon>
            <ActionIcon
              color={"red"}
              {...props}
              onClick={toggleEditInvoiceAmount}
            >
              <IconX size={20} color="black" />
            </ActionIcon>
          </div>
        ) : (
          <ActionIcon
            color={"yellow"}
            {...props}
            onClick={toggleEditInvoiceAmount}
          >
            <IconPencil size={20} color="black" />
          </ActionIcon>
        )}
      </div>

      <b>Avancement : </b>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        <DatePicker
          error={
            newProgressAmount < 0 ||
            parseFloat(props.project["MONTANT DEVIS (EUR HT)"]) -
              (newProgressAmount +
                props.project.AVANCEMENT.reduce(
                  (acc, p) => acc + parseFloat(p.amount),
                  0
                )) <
              0
              ? "-"
              : ""
          }
          style={{ width: "35%" }}
          allowFreeInput
          label={"Date"}
          locale="fr"
          excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
          inputFormat="DD/MM/YYYY"
          value={newProgressDate}
          onChange={(val: Date) => setNewProgressDate(val)}
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
        <NumberInput
          error={
            newProgressAmount < 0
              ? "Valeur négative"
              : parseFloat(props.project["MONTANT DEVIS (EUR HT)"]) -
                  (newProgressAmount +
                    props.project.AVANCEMENT.reduce(
                      (acc, p) => acc + parseFloat(p.amount),
                      0
                    )) <
                0
              ? "Montant trop élevé"
              : ""
          }
          style={{ width: "30%" }}
          label={"Montant"}
          defaultValue={0}
          step={100}
          precision={2}
          min={0}
          icon={<IconCurrencyEuro color={theme.colors.yellow[6]} />}
          value={newProgressAmount}
          onChange={(val: number) => setNewProgressAmount(val)}
        />
        <CustomButton
          disabled={
            newProgressAmount < 0 ||
            parseFloat(props.project["MONTANT DEVIS (EUR HT)"]) -
              (newProgressAmount +
                props.project.AVANCEMENT.reduce(
                  (acc, p) => acc + parseFloat(p.amount),
                  0
                )) <
              0
          }
          extraStyle={{
            marginBottom:
              newProgressAmount < 0 ||
              parseFloat(props.project["MONTANT DEVIS (EUR HT)"]) -
                (newProgressAmount +
                  props.project.AVANCEMENT.reduce(
                    (acc, p) => acc + parseFloat(p.amount),
                    0
                  )) <
                0
                ? "20px"
                : "",
          }}
          handleClick={() =>
            addRow({
              _id: Math.random(),
              date: newProgressDate,
              amount: newProgressAmount.toString(),
            })
          }
          label={"Ajouter "}
          icon={<IconCirclePlus />}
        ></CustomButton>
      </div>
      {avancements.length > 0 ? (
        <>
          <p style={{ margin: "0 0 16px 0" }}>
            <b>Reste à facturer : </b>
            {`${(
              parseFloat(props.project["MONTANT DEVIS (EUR HT)"]) -
              props.project.AVANCEMENT.reduce(
                (acc, p) => acc + parseFloat(p.amount),
                0
              )
            ).toFixed(2)}€`}
          </p>
          <Switch
            checked={editProgress}
            onChange={(event) => setEditProgress(event.currentTarget.checked)}
            label={"Modifier les avancements enregistrés"}
          />
          <table className="progress-table">
            <thead>
              <tr
                className="progress-table-title"
                style={{
                  backgroundColor: theme.colors.yellow[3],
                  borderBottomStyle: "solid",
                  borderBottomWidth: "2px",
                  borderBottomColor: theme.colors.yellow[5],
                }}
              >
                <th className="progress-table-data">Avancement</th>
                <th className="progress-table-data">Montant (€)</th>
                <th className="progress-table-data">
                  Cumul de l'avancement (€)
                </th>
                <th className="progress-table-data">
                  Pourcentage de l'avancement (%)
                </th>
                <th className="progress-table-data">
                  Cumul de l'avancement (%)
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Honoraire;