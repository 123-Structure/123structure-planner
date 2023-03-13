import { Dispatch, useEffect, useState } from "react";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import { IDataFromAPI } from "../../../../../data/interfaces/IDataFromAPI";
import { Card, Highlight, useMantineTheme } from "@mantine/core";
import { handleIcon } from "../../../utils/handleIcon";
import { handleSubtitle } from "../../../utils/handleSubtitle";
import {
  useCustomerRoutes,
  useUpdateCustomerRoutes,
} from "../../../../../context/CustomerRoutes";

interface ISearchBarItemProps {
  action: IDataFromAPI;
  result: string;
  setOpenSearchBarModal: Dispatch<React.SetStateAction<boolean>>;
}

const SearchBarItem = (props: ISearchBarItemProps) => {
  const [customer, setCustomer] = useState<ICustomer>();
  const [resultType, setResultType] = useState("");
  const [title, setTitle] = useState("");

  const theme = useMantineTheme();

  const customerRoutes = useCustomerRoutes();
  const setCustomerRoutes = useUpdateCustomerRoutes();

  const handleSearchItemSearch = (type: string) => {
    if (customer !== undefined) {
      switch (type) {
        case "category":
          setCustomerRoutes({
            commercial: customer.commercial[0],
            category: customer.category as string,
            customer: "",
            agency: "",
            appointment: "",
          });
          const commercialButton: HTMLButtonElement[] = [];
          const categoryButton: HTMLButtonElement[] = [];
          const button = document.querySelectorAll("button");
          button.forEach((btn) => {
            btn.classList.contains(`${customer.commercial[0]}_Tab`)
              ? commercialButton.push(btn)
              : "";

            btn.classList.contains(
              `${customer.category}_${customerRoutes.commercial}`
            )
              ? categoryButton.push(btn)
              : "";
          });
          commercialButton[0].click();
          categoryButton[0].click();
          // props.setOpenSearchBarModal(false);
          break;

        case "name":
        case "location.cp":
        case "location.city":
        case "email":
        case "phone":
          setCustomerRoutes({
            ...customerRoutes,
            category: customer.category as string,
            customer: customer.group === "" ? customer.name : customer.group,
            agency: customer.name,
            appointment: "",
          });
          break;

        case "group":
          setCustomerRoutes({
            ...customerRoutes,
            category: customer.category as string,
            customer: customer.group,
            agency: "",
            appointment: "",
          });
          break;

        default:
          break;
      }

      if (type.startsWith("contact")) {
        setCustomerRoutes({
          ...customerRoutes,
          category: customer.category as string,
          customer: customer.group === "" ? customer.name : customer.group,
          agency: customer.name,
          appointment: "",
        });
        const contactIndex = parseInt(resultType.split(".")[1]);
        const firstName = customer.contact[contactIndex].firstName;
        const lastName = customer.contact[contactIndex].lastName;

        const contactButton = document.querySelector(
          `.contact_${customer.name.replaceAll(
            " ",
            "_"
          )}_${firstName}_${lastName}`
        ) as HTMLElement;
        if (contactButton !== null) {
          contactButton.click();
        }
      }

      if (type.startsWith("appointment")) {
        const appointmentIndex = parseInt(resultType.split(".")[1]);
        const title = customer.appointment[appointmentIndex].title;
        const date = customer.appointment[appointmentIndex].date;

        setCustomerRoutes({
          ...customerRoutes,
          category: customer.category as string,
          customer: customer.group === "" ? customer.name : customer.group,
          agency: customer.name,
          appointment: `${title} (${new Date(date).toLocaleDateString("fr")})`,
        });
      }

      return "";
    }
  };

  useEffect(() => {
    const handleGetCustomerById = async (id: string) => {
      const APIBaseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${APIBaseUrl}/api/customers/${id}`, {
        method: "GET",
      });
      const customer = (await response.json()) as ICustomer;
      setCustomer(customer);
    };

    const handleResultProperty = (result: string) => {
      const splitArray = result.split(": ");
      const property = splitArray[0];
      const value = splitArray.slice(1).join("");
      setResultType(property);
      setTitle(
        property.includes("appointment") && property.includes("content")
          ? "Compte-rendu de RDV"
          : value
      );
    };

    if (props.action.type === "customer") {
      handleGetCustomerById(props.action.id);
    }
    handleResultProperty(props.result);
  }, []);

  return (
    <Card
      className="searchBarItem"
      shadow="sm"
      p="md"
      radius="md"
      withBorder
      onClick={() => handleSearchItemSearch(resultType)}
      sx={{
        "&:hover": {
          backgroundColor: theme.colors.yellow[1],
        },
      }}
    >
      {handleIcon(resultType)}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "16px",
        }}
      >
        <p
          style={{
            margin: 0,
          }}
        >
          <Highlight
            highlightColor={theme.colors.yellow[6]}
            highlight={props.action.searchTerm}
          >
            {title}
          </Highlight>
        </p>
        <p
          style={{
            margin: 0,
            fontStyle: "italic",
            color: "gray",
          }}
        >
          {handleSubtitle(customer, resultType)}
        </p>
      </div>
    </Card>
  );
};

export default SearchBarItem;
