import { Tabs, useMantineTheme } from "@mantine/core";
import { useCustomers } from "../../../../context/CustomerContext";
import {
  useCustomerRoutes,
  useUpdateCustomerRoutes,
} from "../../../../context/CustomerRoutes";
import { changeFavicon, changeTabTitle } from "../../../../utils/tabsUtils";
import Customer from "../Customer/Customer";
import AgencyList from "./AgencyList";

interface ICustomerListProps {
  category: string;
}

const CustomerList = (props: ICustomerListProps) => {
  const theme = useMantineTheme();
  const { customers } = useCustomers();
  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();

  return (
    <Tabs
      orientation="vertical"
      value={customerRoutes.customer}
      onTabChange={(val: string) => {
        changeFavicon("👷");
        changeTabTitle(`123 Structure - ${val}`);
        setCustomerRoutes({
          ...customerRoutes,
          customer: val,
        });
      }}
    >
      <Tabs.List>
        {customers.customersList
          .filter((customer) => customer.category === props.category)
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

      {customers.customersList
        .filter(
          (customer) =>
            customer.category === props.category && customer.group === ""
        )
        .reduce((acc, customer) => {
          const value = customer.group === "" ? customer.name : customer.group;

          if (!acc.includes(value)) {
            acc.push(value);
          }
          return acc;
        }, [] as string[])
        .map((customer) => (
          <Tabs.Panel key={customer} value={customer}>
            <Customer
              customer={
                customers.customersList.filter((c) => c.name === customer)[0]
              }
            />
          </Tabs.Panel>
        ))}

      {customers.customersList
        .filter(
          (customer) =>
            customer.category === props.category && customer.group !== ""
        )
        .reduce((acc, customer) => {
          const value = customer.group === "" ? customer.name : customer.group;

          if (!acc.includes(value)) {
            acc.push(value);
          }
          return acc;
        }, [] as string[])
        .map((customer) => (
          <Tabs.Panel key={customer} value={customer}>
            <AgencyList
              customers={customers.customersList.filter(
                (c) => c.group === customer
              )}
            />
          </Tabs.Panel>
        ))}
    </Tabs>
  );
};

export default CustomerList;
