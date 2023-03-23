import { useRouter } from "../hooks/Router/useRouter";
import Commercial from "./Commercial/Commercial";
import Planner from "./Planner/Planner";

const Router = () => {
  const router = useRouter();

  console.log(router);

  return router === "Planning" ? (
    <Planner />
  ) : router === "Commercial" ? (
    <Commercial />
  ) : router === "Administrateur" ? (
    <h1>Administrateur</h1>
  ) : (
    <></>
  );
};

export default Router;
