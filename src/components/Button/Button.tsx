import classes from "./styles.module.scss";
import classNames from "classnames";

interface ButtonProps {
  text: string;
  optionalStyles?: ("chat" | "disabled" | "bg-red" | "bg-blue")[];
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, optionalStyles, onClick }) => {
  const isDisabled = optionalStyles?.includes("disabled");

  return (
    <div
      className={classNames(
        classes.button,
        classes["bg-red"],
        optionalStyles && optionalStyles.map((i) => classes[i]).join(" ")
      )}
      onClick={() => isDisabled || onClick()}
    >
      {text}
    </div>
  );
};

export default Button;
