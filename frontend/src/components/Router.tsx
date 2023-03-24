import { useRouter } from "../hooks/Router/useRouter";
import Commercial from "./Commercial/Commercial";
import Planner from "./Planner/Planner";
import BrickLayerBro from "../assets/img/Bricklayer-bro.svg";
import "../assets/style/Router.css";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

const Router = () => {
  const router = useRouter();

  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const mediumScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return router === "Planning" ? (
    <Planner />
  ) : router === "Commercial" ? (
    <Commercial />
  ) : router === "Administrateur" ? (
    <div
      id="adminImage"
      style={{
        width: smallScreen ? "100%" : mediumScreen ? "75%" : "30%",
      }}
    >
      <img src={BrickLayerBro} alt="bricklayer" />
      <p>Interface "Administrateur"</p>
    </div>
  ) : (
    <></>
  );
};

export default Router;
