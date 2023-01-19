import { Tooltip } from "@mantine/core";
import React from "react";

interface ICustomTooltipProps {
  label: string;
  children: React.ReactNode;
}

const CustomTooltip = (props: ICustomTooltipProps) => {
  return (
    <Tooltip
      style={{ fontWeight: "bold" }}
      label={props.label}
      position="bottom-end"
      color="gray"
      transition="slide-up"
      transitionDuration={300}
      openDelay={1000}
      withArrow
      arrowSize={8}
    >
      {props.children}
    </Tooltip>
  );
};

export default CustomTooltip;
