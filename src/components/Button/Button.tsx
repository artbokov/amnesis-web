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
    id?: string;
    color?: "bg-red" | "bg-blue" | "bg-dark-blue";
    hoverEffect?: boolean;
    optionalStyles?: ("round" | "disabled")[];
    onClick: () => void;
    selected?: boolean;
};

const Button: React.FC<ButtonProps> = ({
    id,
    icon,
    label,
    color = "bg-red",
    hoverEffect = false,
    selected = false,
    optionalStyles,
    onClick,
}) => {
    const isDisabled = optionalStyles?.includes("disabled");

    return (
        <div
            id={id}
            className={classNames(
                classes["button"],
                label && classes[color],
                hoverEffect && classes["dim-on-hover"],
                optionalStyles?.map((i) => classes[i]).join(" "),
                selected && classes["selected"]
            )}
            onClick={() => isDisabled || onClick()}
        >
            {label ? <div className={classes.text}>{label}</div> : icon}
        </div>
    );
};

export default Button;
