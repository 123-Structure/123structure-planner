import Lottie from "react-lottie";
import logo from "../../assets/img/logo.png";
import animationData from "../../assets/lottie/loader-buildings.json";
import "../../assets/lottie/loader-buildings.css";

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

  return (
    <div
      className="splashScreen"
      style={{
        display: props.visible ? "flex" : "none",
      }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
      <img id="logoHeader" src={logo} alt="logo" />
    </div>
  );
};

export default LottieLoader;
