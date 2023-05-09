import classes from "./styles.module.scss";
import classNames from "classnames";

type implementedClasses = "chat" | "disabled" ;

type buttonProps = {
  text: string,
  onClick: () => void,
  color?: "green" | "blue",
  optionalClasses?: (false | implementedClasses)[]
};

const Button = ({ text, onClick, color="green", optionalClasses }: buttonProps) => {
  const opClasses = optionalClasses ? optionalClasses.map(
    classname => classname && classes[classname]
  ) : [];
  const isDisabled = optionalClasses?.includes("disabled"); 

  return (
    <div
      className={classNames(classes.button, color && classes[color], ...opClasses)}
      onClick={() => isDisabled || onClick()}
    >
      {text}
    </div>
  )
};

export default Button;