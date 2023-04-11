import { Tabs, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { APIBaseUrl } from "../../../../data/constants/APIBaseUrl";
import { CustomerCategoryList } from "../../../../data/constants/CustomerCategoryList";
import { IDataAPICategory } from "../../../../data/interfaces/IDataAPICategory";
import { useAuth } from "../../../../hooks/Auth/useAuth";
import { useCustomerRoutes } from "../../../../hooks/CustomerRoutes/useCustomerRoutes";
import { useUpdateCustomerRoutes } from "../../../../hooks/CustomerRoutes/useUpdateCustomerRoutes";
import { changeFavicon, changeTabTitle } from "../../../../utils/tabsUtils";
import CustomerList from "./CustomerList";
import { useLogout } from "../../../../hooks/Auth/useLogout";

const CustomerCategories = () => {
  const [customersList, setCustomersList] = useState<IDataAPICategory[]>([]);

  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();
  const { auth } = useAuth();
  const { logout } = useLogout();

  const theme = useMantineTheme();

  const fetchCustomersList = async (
    commercial: string | null,
    category: string | null
  ) => {
    if (auth.user) {
      const response = await fetch(
        `${APIBaseUrl}/api/customers/category/${commercial}/${category}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );

      if (response.status === 401) {
        logout();
        showNotification({
          title: "🔒 Authentification requise",
          message: "Session expirée",
          color: "red",
        });
      } else {
        const data = (await response.json()) as IDataAPICategory[];
        setCustomersList(data);
      }
    }
  };

  useEffect(() => {
    if (customerRoutes.category !== "") {
      fetchCustomersList(customerRoutes.commercial, customerRoutes.category);
      changeFavicon("👷");
      changeTabTitle(`123 Structure - ${customerRoutes.category}`);
    }
  }, [customerRoutes.category]);

  return (
    <>
      <Tabs
        orientation="vertical"
        value={customerRoutes.category}
        onTabChange={(val: string) => {
          fetchCustomersList(customerRoutes.commercial, val);
          setCustomerRoutes({
            ...customerRoutes,
            category: val,
            customer: "",
            agency: "",
          });
        }}
      >
        <Tabs.List>
          {CustomerCategoryList.map((category) => (
            <Tabs.Tab
              key={category}
              className={`${category}_${customerRoutes.commercial}`}
              style={{
                backgroundColor:
                  customerRoutes.category === category
                    ? theme.colors.yellow[1]
                    : "",
                fontWeight: customerRoutes.category === category ? "bold" : "",
              }}
              value={category}
            >
              {category}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {CustomerCategoryList.map((category) => (
          <Tabs.Panel key={category} value={category}>
            <CustomerList customersList={customersList} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
};

export default CustomerCategories;
