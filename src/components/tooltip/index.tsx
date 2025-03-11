function ToolTip(props: any) {
  const { innterRef, data } = props;
  const { text } = data;

  return (
    <div
      ref={innterRef}
      style={{
        position: "absolute",
        zIndex: 999,
        background: "#010209",
        padding: "5px",
        border: "2px solid #163FA2",
        visibility: "hidden",
        color: "#3B93E6",
        pointerEvents: "none",
      }}
    >
      {text || "this is ToolTip"}
    </div>
  );
}

export default ToolTip;
