import { Tabs, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import {
  useCustomer,
  useUpdateCustomer,
} from "../../../../context/CustomerContext";
import {
  useCustomerRoutes,
  useUpdateCustomerRoutes,
} from "../../../../context/CustomerRoutes";
import { ICustomer } from "../../../../data/interfaces/ICustomer";
import { IDataAPICategory } from "../../../../data/interfaces/IDataAPICategory";
import { changeFavicon, changeTabTitle } from "../../../../utils/tabsUtils";
import Customer from "../Customer/Customer";
import AgencyList from "./AgencyList";

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

  const fetchCustomer = async (val: string | null) => {
    const customer = props.customersList.filter(
      (customer) => customer.name === val
    )[0];

    const APIBaseUrl = import.meta.env.VITE_API_URL;

    if (customer !== undefined) {
      const response = await fetch(
        `${APIBaseUrl}/api/customers/${customer._id}`,
        {
          method: "GET",
        }
      );
      const data = (await response.json()) as ICustomer;
      setCustomer(data);
      setCustomerGroup(undefined);
    } else {
      const response = await fetch(
        `${APIBaseUrl}/api/customers/group/${customerRoutes.category}/${val}`,
        {
          method: "GET",
        }
      );
      const data = (await response.json()) as IDataAPICategory[];
      setCustomer(undefined);
      setCustomerGroup(data);
    }
  };

  return (
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
  );
};

export default CustomerList;
