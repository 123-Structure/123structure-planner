import Lottie from "react-lottie";
import logo from "../../assets/img/logo.png";
import animationData from "../../assets/lottie/loader-buildings.json";
import "../../assets/lottie/loader-buildings.css";
import { useMantineTheme } from "@mantine/styles";
import { useMediaQuery } from "@mantine/hooks";

interface ILottieLoaderProps {
  visible: boolean;
}

const LottieLoader = (props: ILottieLoaderProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    <div
      className="splashScreen"
      style={{
        display: props.visible ? "flex" : "none",
      }}
    >
      <Lottie
        options={defaultOptions}
        height={smallScreen ? 250 : 500}
        width={smallScreen ? 250 : 500}
      />
      <img
        className={`logoLoader ${smallScreen ? "logoLoader-mobile" : ""}`}
        src={logo}
        alt="logo"
      />
    </div>
  );
};

export default LottieLoader;
