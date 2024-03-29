import { Button } from "@mantine/core";
import { TablerIcon, TablerIconProps } from "@tabler/icons";

interface ICustomButtonProps {
  handleClick?: () => void;
  icon?: React.ReactNode;
  color?: string;
  label: string;
  disabled?: boolean;
  extraStyle?: React.CSSProperties;
}

const CustomButton = (props: ICustomButtonProps) => {
  return (
    <Button
      color={props.color}
      disabled={props.disabled}
      style={{
        ...props.extraStyle,
        color: props.disabled
          ? "#b2b9c1"
          : props.color != undefined && props.color !== "yellow"
          ? "white"
          : "black",
      }}
      onClick={props.handleClick !== undefined ? props.handleClick : () => ""}
    >
      <div style={{ marginRight: "8px" }}>{props.icon}</div>
      {props.label}
    </Button>
  );
};

export default CustomButton;
