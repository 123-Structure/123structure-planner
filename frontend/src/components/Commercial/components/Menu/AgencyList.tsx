import { Tabs, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { APIBaseUrl } from "../../../../data/constants/APIBaseUrl";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { IDataAPICategory } from "../../../../data/interfaces/IDataAPICategory";
import { useAuth } from "../../../../hooks/Auth/useAuth";
import { useCustomer } from "../../../../hooks/Customer/useCustomer";
import { useUpdateCustomer } from "../../../../hooks/Customer/useUpdateCustomer";
import { useCustomerRoutes } from "../../../../hooks/CustomerRoutes/useCustomerRoutes";
import { useUpdateCustomerRoutes } from "../../../../hooks/CustomerRoutes/useUpdateCustomerRoutes";
import { changeFavicon, changeTabTitle } from "../../../../utils/tabsUtils";
import Customer from "../Customer/Customer";
import { useLogout } from "../../../../hooks/Auth/useLogout";

interface IAgenceListProps {
  customersList: IDataAPICategory[];
}

const AgencyList = (props: IAgenceListProps) => {
  const theme = useMantineTheme();

  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();
  const customer = useCustomer();
  const setCustomer = useUpdateCustomer();
  const { auth } = useAuth();
  const { logout } = useLogout();

  const fetchCustomer = async (val: string) => {
    if (auth.user) {
      const customer = props.customersList.filter(
        (customer) => customer.name === val
      )[0];

      if (customer !== undefined) {
        const response = await fetch(
          `${APIBaseUrl}/api/customers/${customer._id}`,
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
          const data = (await response.json()) as ICustomer;
          setCustomer(data);
        }
      }
    }
  };

  useEffect(() => {
    if (customerRoutes.agency !== "") {
      fetchCustomer(customerRoutes.agency);
      changeFavicon("👷");
      changeTabTitle(`123 Structure - ${customerRoutes.agency}`);
    }
  }, [props.customersList]);

  return (
    <Tabs
      orientation="vertical"
      value={customerRoutes.agency}
      onTabChange={(val: string) => {
        fetchCustomer(val);
        changeFavicon("👷");
        changeTabTitle(`123 Structure - ${val}`);
        setCustomerRoutes({
          ...customerRoutes,
          agency: val,
        });
      }}
    >
      <Tabs.List>
        {props.customersList.map((customer) => (
          <Tabs.Tab
            key={customer.name}
            style={{
              backgroundColor:
                customerRoutes.agency === customer.name
                  ? theme.colors.yellow[1]
                  : "",
              fontWeight: customerRoutes.agency === customer.name ? "bold" : "",
            }}
            value={customer.name}
          >
            {customer.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {customer !== undefined ? (
        <Tabs.Panel key={customer._id} value={customer.name}>
          <Customer customer={customer} />
        </Tabs.Panel>
      ) : (
        <></>
      )}
    </Tabs>
  );
};

export default AgencyList;
