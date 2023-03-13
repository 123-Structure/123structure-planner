import { Tabs, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useCustomer } from "../../../../context/CustomerContext";
import {
  useCustomerRoutes,
  useUpdateCustomerRoutes,
} from "../../../../context/CustomerRoutes";
import { CustomerCategoryList } from "../../../../data/constants/CustomerCategoryList";
import { IDataAPICategory } from "../../../../data/interfaces/IDataAPICategory";
import { changeFavicon, changeTabTitle } from "../../../../utils/tabsUtils";
import CustomerList from "./CustomerList";

const CustomerCategories = () => {
  const [customersList, setCustomersList] = useState<IDataAPICategory[]>([]);

  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();

  const theme = useMantineTheme();

  const fetchCustomersList = async (
    commercial: string | null,
    category: string | null
  ) => {
    const APIBaseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(
      `${APIBaseUrl}/api/customers/category/${commercial}/${category}`,
      {
        method: "GET",
      }
    );
    const data = (await response.json()) as IDataAPICategory[];
    setCustomersList(data);
  };

  useEffect(() => {
    if (customerRoutes.category !== "") {
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
