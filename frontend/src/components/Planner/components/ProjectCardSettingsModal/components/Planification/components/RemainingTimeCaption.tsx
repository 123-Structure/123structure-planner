interface IRemainingTimeCaption {
  color: string;
  label: string;
}

const RemainingTimeCaption = (props: IRemainingTimeCaption) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <div
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: props.color,
          borderRadius: "25%",
        }}
      ></div>
      <p
        style={{
          margin: 0,
        }}
      >
        {`: ${props.label}`}
      </p>
    </div>
  );
};

export default RemainingTimeCaption;
