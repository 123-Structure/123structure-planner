import { Dispatch, useEffect, useState } from "react";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import { IDataFromAPI } from "../../../../../data/interfaces/IDataFromAPI";
import { Card, Highlight, useMantineTheme } from "@mantine/core";
import { handleIcon } from "../../../utils/handleIcon";
import { handleSubtitle } from "../../../utils/handleSubtitle";
import { useUpdateCustomerRoutes } from "../../../../../hooks/CustomerRoutes/useUpdateCustomerRoutes";
import { useAuth } from "../../../../../hooks/Auth/useAuth";
import { showNotification } from "@mantine/notifications";

interface ISearchBarItemProps {
  action: IDataFromAPI;
  result: string;
  setOpenSearchBarModal: Dispatch<React.SetStateAction<boolean>>;
  setQuery: Dispatch<React.SetStateAction<string>>;
}

const SearchBarItem = (props: ISearchBarItemProps) => {
  const [customer, setCustomer] = useState<ICustomer>();
  const [resultType, setResultType] = useState("");
  const [title, setTitle] = useState("");

  const theme = useMantineTheme();

  const setCustomerRoutes = useUpdateCustomerRoutes();
  const { auth } = useAuth();

  const handleSearchItemSearch = (type: string) => {
    if (customer !== undefined) {
      switch (type) {
        case "category":
        case "name":
        case "location.cp":
        case "location.city":
        case "email":
        case "phone":
          setCustomerRoutes({
            commercial: customer.commercial[0],
            category: customer.category as string,
            customer: customer.group === "" ? customer.name : customer.group,
            agency: customer.group === "" ? "" : customer.name,
            appointment: "",
          });
          props.setOpenSearchBarModal(false);
          props.setQuery("");
          break;

        case "group":
          setCustomerRoutes({
            commercial: customer.commercial[0],
            category: customer.category as string,
            customer: customer.group,
            agency: "",
            appointment: "",
          });
          props.setOpenSearchBarModal(false);
          props.setQuery("");
          break;

        default:
          break;
      }

      if (type.startsWith("contact")) {
        setCustomerRoutes({
          commercial: customer.commercial[0],
          category: customer.category as string,
          customer: customer.group === "" ? customer.name : customer.group,
          agency: customer.group === "" ? "" : customer.name,
          appointment: "",
        });
        props.setOpenSearchBarModal(false);
        props.setQuery("");
      }

      if (type.startsWith("appointment")) {
        const appointmentIndex = parseInt(resultType.split(".")[1]);
        const title = customer.appointment[appointmentIndex].title;
        const date = customer.appointment[appointmentIndex].date;

        setCustomerRoutes({
          commercial: customer.commercial[0],
          category: customer.category as string,
          customer: customer.group === "" ? customer.name : customer.group,
          agency: customer.name,
          appointment: `${title} (${new Date(date).toLocaleDateString("fr")})`,
        });

        props.setOpenSearchBarModal(false);
        props.setQuery("");
      }

      return "";
    }
  };

  const handleGetCustomerById = async (id: string) => {
    if (auth.user) {
      const APIBaseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${APIBaseUrl}/api/customers/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      const customer = (await response.json()) as ICustomer;
      setCustomer(customer);
    } else {
      showNotification({
        title: "🔒 Authentification requise",
        message: "L'utilisateur n'est pas connecté",
        color: "red",
      });
    }
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

  useEffect(() => {
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
