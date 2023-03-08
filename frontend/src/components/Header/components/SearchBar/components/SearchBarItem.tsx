import { useEffect, useState } from "react";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import { IDataFromAPI } from "../../../../../data/interfaces/IDataFromAPI";
import { Card, Highlight, useMantineTheme } from "@mantine/core";
import { handleIcon } from "../../../utils/handleIcon";
import { handleSubtitle } from "../../../utils/handleSubtitle";
import { useUpdateCustomerRoutes } from "../../../../../context/CustomerRoutes";

interface ISearchBarItemProps {
  action: IDataFromAPI;
  result: string;
}

const SearchBarItem = (props: ISearchBarItemProps) => {
  const [customer, setCustomer] = useState<ICustomer>();
  const [resultType, setResultType] = useState("");
  const [title, setTitle] = useState("");

  const theme = useMantineTheme();

  const setCustomerRoutes = useUpdateCustomerRoutes();

  const handleSearchItemSearch = (type: string) => {
    console.log(type);

    if (customer !== undefined) {
      switch (type) {
        case "category":
          setCustomerRoutes({
            category: customer.category as string,
            customer: "",
            agency: "",
          });
          break;

        case "name":
        case "location.cp":
        case "location.city":
        case "email":
        case "phone":
          setCustomerRoutes({
            category: customer.category as string,
            customer: customer.group === "" ? customer.name : customer.group,
            agency: customer.name,
          });
          break;

        case "group":
          setCustomerRoutes({
            category: customer.category as string,
            customer: customer.group,
            agency: "",
          });
          break;

        default:
          break;
      }

      if (type.startsWith("contact")) {
        setCustomerRoutes({
          category: customer.category as string,
          customer: customer.group === "" ? customer.name : customer.group,
          agency: customer.name,
        });
        const contactIndex = parseInt(resultType.split(".")[1]);
        const firstName = customer.contact[contactIndex].firstName;
        const lastName = customer.contact[contactIndex].lastName;

        console.log(
          `#contact_${customer.name.replaceAll(
            " ",
            "_"
          )}_${firstName}_${lastName}`
        );

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

      // "commercial.firstName": "text",
      // "commercial.lastName": "text",
      // "commercial.role": "text",
      // "commercial.company": "text",

      // "appointment.location.cp": "text",
      // "appointment.location.city": "text",
      // "appointment.title": "text",
      // "appointment.content": "text",

      if (type.includes("location")) {
        return "";
      }

      if (type.includes("email")) {
        return "";
      }

      if (type.includes("phone")) {
        return "";
      }

      if (type.includes("contact") || type.includes("commercial")) {
        return "";
      }

      if (type.includes("appointment")) {
        return "";
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
