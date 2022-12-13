import { useMantineTheme } from "@mantine/core";
import { IconCalculator } from "@tabler/icons";
import React from "react";

interface ILoadRateProps {
  id: string;
}

const LoadRate = (props: ILoadRateProps) => {
  const theme = useMantineTheme();

  return (
    <div
      id={props.id}
      style={{
        backgroundColor:
          parseInt(props.id.charAt(props.id.length - 1)) % 2 === 0
            ? theme.colors.gray[4]
            : "white",
      }}
    >
      <IconCalculator />
      {props.id}
    </div>
  );
};

export default LoadRate;
