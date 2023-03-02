import {
  ActionIcon,
  MultiSelect,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import "../../../../assets/style/CustomerItem.css";
import { TContactCategories } from "../../../../data/types/TContactCategories";
import { TPaymentType } from "../../../../data/types/TPaymentType";

interface ICustomerItemProps {
  color: string;
  label?: string[];
  value: (string | number)[];
  updateValue?: (
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>
    | React.Dispatch<
        React.SetStateAction<"45" | "30 (Fin de mois)" | "30 (Net)" | "-">
      >
    | React.Dispatch<React.SetStateAction<TPaymentType>>
    | React.Dispatch<React.SetStateAction<"A" | "B" | "C">>
    | React.Dispatch<React.SetStateAction<string[]>>
    | React.Dispatch<React.SetStateAction<TContactCategories>>
  )[];
  icon: React.ReactNode;
  handleClick?: () => void;
  editMode?: boolean;
  inputType?: "text" | "number" | "select" | "multiselect";
  errorMessage?: string[];
  extraStyle?: React.CSSProperties;
}

const CustomerItem = (props: ICustomerItemProps) => {
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

  const input = () => {
    if (props.inputType === "text") {
      return props.value.map((value, index) => (
        <TextInput
          key={index}
          className="customerItemInput"
          label={props.label !== undefined ? props.label[index] : ""}
          value={value}
          onChange={(event) => {
            if (props.updateValue !== undefined) {
              props.updateValue[index](event.currentTarget.value as any);
            }
          }}
          error={
            props.errorMessage !== undefined
              ? props.errorMessage[index] !== ""
                ? props.errorMessage[index]
                : false
              : false
          }
        />
      ));
    }

    if (props.inputType === "number") {
      return props.value.map((value, index) => (
        <NumberInput
          key={index}
          defaultValue={value as number}
          step={10}
          precision={0}
          min={0}
          value={value as number}
          onChange={(val: number) => {
            if (props.updateValue !== undefined) {
              props.updateValue[index](val as any);
            }
          }}
        />
      ));
    }

    if (props.inputType === "select") {
      const getData = () => {
        return props.value.reduce(
          (acc, value: string | number | SelectItem) => {
            const item = {
              value: value,
              label: value.toString().replace("*", ""),
            } as SelectItem;
            acc.push(item);
            return acc;
          },
          [] as (string | SelectItem)[]
        );
      };

      const getValue = () => {
        const values = props.value as string[];
        return values.filter((value) => value.includes("*"))[0];
      };

      return (
        <Select
          data={getData()}
          value={getValue()}
          onChange={(val) => {
            if (props.updateValue !== undefined) {
              props.updateValue[0](val as any);
            }
          }}
        />
      );
    }

    if (props.inputType === "multiselect") {
      const getData = () => {
        const data = props.value as string[];

        return data.reduce((acc, value: string | SelectItem) => {
          const item = {
            value: value,
            label: value.replace("*", ""),
          } as SelectItem;
          acc.push(item);
          return acc;
        }, [] as (string | SelectItem)[]);
      };

      const getValue = () => {
        const values = props.value as string[];
        return values.filter((value) => value.includes("*"));
      };

      return (
        <MultiSelect
          searchable={!smallScreen}
          nothingFound="Aucun résultat"
          clearable
          data={getData()}
          value={getValue()}
          onChange={(val) => {
            if (props.updateValue !== undefined) {
              const newValue = val.map((val) => val.replace("*", "")) as any;
              props.updateValue[0](newValue);
            }
          }}
        />
      );
    }
  };

  return (
    <div
      className={`customerItem ${
        props.handleClick !== undefined && !props.editMode
          ? "customerClickableItem"
          : ""
      }`}
      onClick={
        props.handleClick !== undefined && !props.editMode
          ? props.handleClick
          : () => ""
      }
      style={{
        ...props.extraStyle,
      }}
    >
      <ActionIcon size="xl" variant="filled" color={props.color}>
        {props.icon}
      </ActionIcon>
      {props.editMode ? input() : <p>{props.value.join(" ")}</p>}
    </div>
  );
};

export default CustomerItem;
