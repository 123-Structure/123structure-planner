import { Tabs, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useCustomer } from "../../../../context/CustomerContext";
import {
  useCustomerRoutes,
  useUpdateCustomerRoutes,
} from "../../../../context/CustomerRoutes";
import { CustomerCategoryList } from "../../../../data/constants/CustomerCategoryList";
import { IDataAPICategory } from "../../../../data/interfaces/IDataAPICategory";
import CustomerList from "./CustomerList";

const CustomerCategories = () => {
  const [customersList, setCustomersList] = useState<IDataAPICategory[]>([]);

  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();

  const theme = useMantineTheme();

  const fetchCustomers = async (category: string) => {
    const APIBaseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(
      `${APIBaseUrl}/api/customers/category/${category}`,
      {
        method: "GET",
      }
    );
    const data = (await response.json()) as IDataAPICategory[];
    setCustomersList(data);
  };

  return (
    <>
      <Tabs
        orientation="vertical"
        value={customerRoutes.category}
        onTabChange={(val: string) => {
          fetchCustomers(val);
          setCustomerRoutes({
            ...customerRoutes,
            category: val,
          });
        }}
      >
        <Tabs.List>
          {CustomerCategoryList.map((category) => (
            <Tabs.Tab
              key={category}
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
