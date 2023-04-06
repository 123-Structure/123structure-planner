import React from "react";

interface IVersion {
  version: string;
}

const Version = (props: IVersion) => {
  return (
    <span className="badge badge--success">Version : {props.version}</span>
  );
};

export default Version;
