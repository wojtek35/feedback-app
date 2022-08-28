function Spinner() {
  return (
    <img
      src={require("../assets/spinner.gif")}
      alt="Loading..."
      style={{
        width: "30px",
        margin: "auto",
        display: "block",
      }}
    />
  );
}

export default Spinner;
