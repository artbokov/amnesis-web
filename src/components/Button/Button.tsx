import classes from "./styles.module.scss";
import classNames from "classnames";

type ButtonProps = (
    | {
          icon: JSX.Element;
          label?: undefined;
      }
    | {
          icon?: undefined;
          label: string;
      }
) & {
    color?: "bg-red" | "bg-blue" | "bg-dark-blue";
    optionalStyles?: ("round" | "disabled")[];
    onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
    icon,
    label,
    color = "bg-red",
    optionalStyles,
    onClick,
}) => {
    const isDisabled = optionalStyles?.includes("disabled");

    return (
        <div
            className={classNames(
                classes["button"],
                label && classes[color],
                optionalStyles?.map((i) => classes[i]).join(" ")
            )}
            onClick={() => isDisabled || onClick()}
        >
            {label ? <div className={classes.text}>{label}</div> : icon}
        </div>
    );
};

export default Button;
