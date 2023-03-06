import { IconAddressBook, IconSearch } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { ICustomer } from "../../../../../data/interfaces/ICustomer";
import { IDataFromAPI } from "../../../../../data/interfaces/IDataFromAPI";
import { Card } from "@mantine/core";
interface ISearchBarItemProps {
  action: IDataFromAPI;
  result: string;
}

const SearchBarItem = (props: ISearchBarItemProps) => {
  const [customer, setCustomer] = useState<ICustomer>();
  const [resultType, setResultType] = useState("");

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
      const property = result.split(": ")[0];
      setResultType(property);
    };

    if (props.action.type === "customer") {
      handleGetCustomerById(props.action.id);
    }
    handleResultProperty(props.result);
  }, []);

  const handleIcon = (type: string) => {
    if (type === "category" || type === "group" || type === "name") {
      return <IconAddressBook size={"1.8rem"} />;
    }

    return <IconSearch size={"1.8rem"} />;
  };

  return (
    <Card
      shadow="sm"
      p="md"
      radius="md"
      withBorder
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: "16px",
        cursor: "pointer",
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
          {resultType}
        </p>
        <p
          style={{
            margin: 0,
            fontStyle: "italic",
            color: "gray",
          }}
        >
          {`${customer?.name} - ${resultType}`}
        </p>
      </div>
    </Card>
  );
};

export default SearchBarItem;
