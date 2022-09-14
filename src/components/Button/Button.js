import "../Button/Button.scss";

const Button = (props) => {
  const { children, type, classes, onClick, additionalProps } = props;
  return (
    <button
      className={`button ${classes}`}
      onClick={onClick}
      type={type}
      {...additionalProps}
    >
      {children}
    </button>
  );
};

export default Button;
