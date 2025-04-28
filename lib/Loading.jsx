const Loading = ({ height = 96, small = false, borderColor = "black" }) => {
  let heightStyle;

  if (height === "full") {
    heightStyle = "100%";
  } else if (height === "screen") {
    heightStyle = "100vh";
  } else {
    heightStyle = "384px";
  }

  return (
    <div
      className={`flex w-full items-center justify-center`}
      style={{ height: heightStyle }}
    >
      <div
        className={`${small ? "small_loading" : "loading"} `}
        style={{
          width: small ? "20px" : "40px",
          height: small ? "20px" : "40px",
          borderStyle: "solid",
          borderWidth: small ? "2px" : "3px",
          borderColor: borderColor,
        }}
      />
    </div>
  );
};

export default Loading;
