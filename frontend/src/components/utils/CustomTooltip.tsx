import { MantineTransition, Tooltip } from "@mantine/core";
import React from "react";

interface ICustomTooltipProps {
  label: string;
  children: React.ReactNode;
  withArrow?: boolean;
  transition?: MantineTransition;
  duration?: number;
  delay?: number;
}

const CustomTooltip = (props: ICustomTooltipProps) => {
  return (
    <Tooltip
      style={{ fontWeight: "bold" }}
      label={props.label}
      position="bottom-end"
      color="gray"
      transitionProps={{
        transition: props.transition ? props.transition : "slide-up",
        duration: props.duration ? props.duration : 300,
      }}
      openDelay={props.delay ? props.delay : 1000}
      withArrow={props.withArrow}
      arrowSize={8}
    >
      {props.children}
    </Tooltip>
  );
};

export default CustomTooltip;
