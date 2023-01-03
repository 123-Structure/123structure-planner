import { Button } from "@mantine/core";
import { TablerIcon, TablerIconProps } from "@tabler/icons";

interface ICustomButton {
  handleClick: () => void;
  icon?: React.ReactNode;
  color?: string;
  label: string;
  disabled?: boolean;
}

const CustomButton = (props: ICustomButton) => {
  return (
    <Button
      color={props.color}
      disabled={props.disabled}
      style={{
        color: props.disabled
          ? "#b2b9c1"
          : props.color != undefined
          ? "white"
          : "black",
      }}
      onClick={props.handleClick}
    >
      <>
        <div style={{ marginRight: "8px" }}>{props.icon}</div>
        {props.label}
      </>
    </Button>
  );
};

export default CustomButton;
