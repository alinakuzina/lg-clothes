import style from "../Button/Button.module.scss";

const Button = (props) => {
  const { children, type, classes, onClick, additionalProps } = props;

  return (
    <button
      className={`${style.button} ${classes}`}
      onClick={onClick}
      type={type}
      {...additionalProps}
    >
      {children}
    </button>
  );
};

export default Button;
