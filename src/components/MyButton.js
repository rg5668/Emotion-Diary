const MyButton = ({ text, type, onClick }) => {
  // 만약 type이 지정되지 않은 버튼이 새로 생겼을때 default로 변경
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["MyButton", `MyButton_${type}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
