import { useEffect } from "react";
import { useCustomerRoutes } from "../hooks/CustomerRoutes/useCustomerRoutes";
import { useUpdateCustomerRoutes } from "../hooks/CustomerRoutes/useUpdateCustomerRoutes";
import { useRouter } from "../hooks/Router/useRouter";
import { changeFavicon, changeTabTitle } from "../utils/tabsUtils";
import Commercial from "./Commercial/Commercial";
import Planner from "./Planner/Planner";
import { useAuth } from "../hooks/Auth/useAuth";

const Router = () => {
  const router = useRouter();
  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth.user) {
      if (router === "Commercial") {
        changeFavicon("👷");
        changeTabTitle("123 Structure - Commercial");
      } else {
        changeFavicon("📆");
        changeTabTitle("123 Structure - Planning");
      }
      if (router === "Planning") {
        setCustomerRoutes({
          ...customerRoutes,
          customer: "",
          agency: "",
          appointment: "",
        });
      }
    }
  }, [router]);

  switch (router) {
    case "Planning":
      return <Planner />;
    case "Commercial":
      return <Commercial />;
    case "Administrateur":
      return <Planner />;

    default:
      return <></>;
  }
};

export default Router;
