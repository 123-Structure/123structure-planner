interface IModalTilte {
  icon: React.ReactNode;
  title: string;
}

const CustomTitle = (props: IModalTilte) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.icon}
      <h2 style={{ margin: "0 0 0 8px" }}>{props.title}</h2>
    </div>
  );
};

export default CustomTitle;
