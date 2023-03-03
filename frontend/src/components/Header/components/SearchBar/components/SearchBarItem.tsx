import React from "react";
import { IDataFromAPI } from "../../../../../data/interfaces/IDataFromAPI";

interface ISearchBarItemProps {
  action: IDataFromAPI;
}

const SearchBarItem = (props: ISearchBarItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div>A</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            margin: 0,
          }}
        >
          {props.action.id}
        </p>
        <p
          style={{
            margin: 0,
          }}
        >
          {props.action.score}
        </p>
      </div>
    </div>
  );
};

export default SearchBarItem;
