import { Tabs, useMantineTheme } from "@mantine/core";
import {
  useCustomerRoutes,
  useUpdateCustomerRoutes,
} from "../../../../context/CustomerRoutes";
import CustomerList from "./CustomerList";

const CustomerCategories = () => {
  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();

  const theme = useMantineTheme();

  const categories = [
    "Constructeur",
    "Négoce",
    "Maitre d'Oeuvre",
    "Maçon",
    "Charpentier",
  ];

  const getDisplay = () => {
    const element = document.querySelector(
      ".customerCategories"
    ) as HTMLDivElement;
    if (element !== null) {
      console.log(element.style.display);
    }
  };

  getDisplay();

  return (
    <>
      <Tabs
        orientation="vertical"
        value={customerRoutes.category}
        onTabChange={(val:string) => {
          setCustomerRoutes({
            ...customerRoutes,
            category: val,
          });
        }}
      >
        <Tabs.List>
          {categories.map((category) => (
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

        {categories.map((category) => (
          <Tabs.Panel key={category} value={category}>
            <CustomerList category={category} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
};

export default CustomerCategories;
