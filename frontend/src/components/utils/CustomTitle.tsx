interface IModalTilteProps {
  icon: React.ReactNode;
  title: string;
  flexStart?: boolean;
}

const CustomTitle = (props: IModalTilteProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: props.flexStart === false ? "center" : "flex-start",
      }}
    >
      {props.icon}
      <h2 style={{ margin: "0 0 0 8px" }}>{props.title}</h2>
    </div>
  );
};

export default CustomTitle;
