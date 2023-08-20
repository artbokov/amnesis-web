import classes from "./styles.module.scss";
import classNames from "classnames";

interface ButtonProps {
  Icon?: JSX.Element;
  text?: string;
  optionalStyles?: ("chat" | "disabled" | "bg-red" | "bg-blue")[];
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  Icon,
  text,
  optionalStyles,
  onClick,
}) => {
  const isDisabled = optionalStyles?.includes("disabled");

  return (
    <div
      className={classNames(
        classes.button,
        Icon ? null : classes["bg-red"],
        optionalStyles && optionalStyles.map((i) => classes[i]).join(" ")
      )}
      onClick={() => isDisabled || onClick()}
    >
      {text ? <div className={classes.text}>{text}</div> : Icon}
    </div>
  );
};

export default Button;
