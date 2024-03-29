import { Tabs, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { IDataAPICategory } from "../../../../data/interfaces/IDataAPICategory";
import { changeFavicon, changeTabTitle } from "../../../../utils/tabsUtils";
import Customer from "../Customer/Customer";
import AgencyList from "./AgencyList";
import BuildingPermitBro from "../../../../assets/img/Building permit-bro.svg";
import { useCustomerRoutes } from "../../../../hooks/CustomerRoutes/useCustomerRoutes";
import { useUpdateCustomerRoutes } from "../../../../hooks/CustomerRoutes/useUpdateCustomerRoutes";
import { useCustomer } from "../../../../hooks/Customer/useCustomer";
import { useUpdateCustomer } from "../../../../hooks/Customer/useUpdateCustomer";
import { useAuth } from "../../../../hooks/Auth/useAuth";
import { showNotification } from "@mantine/notifications";
import { APIBaseUrl } from "../../../../data/constants/APIBaseUrl";
import { useLogout } from "../../../../hooks/Auth/useLogout";

interface ICustomerListProps {
  customersList: IDataAPICategory[];
}

const CustomerList = (props: ICustomerListProps) => {
  const [customerGroup, setCustomerGroup] = useState<IDataAPICategory[]>();

  const theme = useMantineTheme();

  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();
  const customer = useCustomer();
  const setCustomer = useUpdateCustomer();
  const { auth } = useAuth();
  const { logout } = useLogout();

  const fetchCustomer = async (val: string | null) => {
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
          setCustomerGroup(undefined);
        }
      } else {
        const response = await fetch(
          `${APIBaseUrl}/api/customers/group/${customerRoutes.commercial}/${customerRoutes.category}/${val}`,
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
          setCustomer(undefined);
          setCustomerGroup(data);
        }
      }
    }
  };

  useEffect(() => {
    if (customerRoutes.customer !== "") {
      fetchCustomer(customerRoutes.customer);
      changeFavicon("👷");
      changeTabTitle(`123 Structure - ${customerRoutes.customer}`);
    }
  }, [props.customersList]);

  return props.customersList.length > 0 ? (
    <Tabs
      orientation="vertical"
      value={customerRoutes.customer}
      onTabChange={(val: string) => {
        fetchCustomer(val);
        changeFavicon("👷");
        changeTabTitle(`123 Structure - ${val}`);
        setCustomerRoutes({
          ...customerRoutes,
          customer: val as string,
          agency: "",
        });
      }}
    >
      <Tabs.List>
        {props.customersList
          .reduce((acc, customer) => {
            const value =
              customer.group === "" ? customer.name : customer.group;

            if (!acc.includes(value)) {
              acc.push(value);
            }
            return acc;
          }, [] as string[])
          .map((customer) => (
            <Tabs.Tab
              key={customer}
              style={{
                backgroundColor:
                  customerRoutes.customer === customer
                    ? theme.colors.yellow[1]
                    : "",
                fontWeight: customerRoutes.customer === customer ? "bold" : "",
              }}
              value={customer}
            >
              {customer}
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

      {customerGroup !== undefined ? (
        <Tabs.Panel key={customerGroup[0].group} value={customerGroup[0].group}>
          <AgencyList customersList={customerGroup} />
        </Tabs.Panel>
      ) : (
        <></>
      )}
    </Tabs>
  ) : (
    <div className="customerListEmptyResult">
      <img src={BuildingPermitBro} alt="building permit" />
      <p>Aucun client pour cette catégorie</p>
    </div>
  );
};

export default CustomerList;
