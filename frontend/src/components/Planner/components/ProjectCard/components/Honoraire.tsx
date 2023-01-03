import {
  ActionIcon,
  Indicator,
  NumberInput,
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

interface IHonoraireProps {
  project: IProject;
}

const Honoraire = (props: IHonoraireProps) => {
  const theme = useMantineTheme();

  const [editInvoiceAmount, setEditInvoiceAmount] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState(
    parseFloat(props.project["MONTANT DEVIS (EUR HT)"])
  );

  const [avancement, setAvancement] = useState<IAvancement[]>(
    props.project.AVANCEMENT
  );
  const [newProgressDate, setNewProgressDate] = useState(new Date());
  const [newProgressAmount, setNewProgressAmount] = useState(0);

  const rows = avancement.map((avancement) => (
    <tr key={avancement._id}>
      <td>{avancement.date.toLocaleDateString("fr")}</td>
      <td>{avancement.amount}</td>
      <td>
        {(
          (parseFloat(avancement.amount) /
            parseFloat(props.project["MONTANT DEVIS (EUR HT)"])) *
          100
        ).toFixed(2)}
      </td>
    </tr>
  ));

  const toggleEditInvoiceAmount = () => {
    setEditInvoiceAmount(!editInvoiceAmount);
  };

  const handleInvoiceAmountChange = () => {
    props.project["MONTANT DEVIS (EUR HT)"] = invoiceAmount.toString();
    setEditInvoiceAmount(!editInvoiceAmount);
  };

  const addRow = (newAvancement: IAvancement) => {
    setAvancement([...avancement, newAvancement]);
    props.project.AVANCEMENT.push(newAvancement);
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
              <IconCheck size={16} color="black" />
            </ActionIcon>
            <ActionIcon
              color={"red"}
              {...props}
              onClick={toggleEditInvoiceAmount}
            >
              <IconX size={16} color="black" />
            </ActionIcon>
          </div>
        ) : (
          <ActionIcon
            color={"yellow"}
            {...props}
            onClick={toggleEditInvoiceAmount}
          >
            <IconPencil size={16} color="black" />
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
          marginBottom: "8px",
        }}
      >
        <DatePicker
          style={{ width: "35%" }}
          allowFreeInput
          label={"Date"}
          locale="fr"
          excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
          inputFormat="DD/MM/YYYY"
          defaultValue={new Date()}
          // value={new Date()}
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
      {avancement.length > 0 ? (
        <Table striped>
          <thead>
            <tr>
              <th>Avancement</th>
              <th>Montant (€)</th>
              <th>Pourcentage facturé (%)</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : (
        <></>
      )}
    </>
  );
};

export default Honoraire;
