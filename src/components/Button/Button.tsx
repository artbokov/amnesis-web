import classes from "./styles.module.scss";
import classNames from "classnames";

type implementedClasses = "chat";

type buttonProps = {
  text: string,
  onClick: () => void,
  color: "green" | "blue",
  optionalClasses?: implementedClasses[]
};

const Button = ({ text, onClick, color, optionalClasses }: buttonProps) => {
  const optionalClassesString = optionalClasses ? optionalClasses.map(
    classname => classes[classname]
  ) : [];

  return (
    <div
      className={classNames(classes.button, classes[color], ...optionalClassesString)}
      onClick={onClick}
    >
      {text}
    </div>
  )
};

export default Button;