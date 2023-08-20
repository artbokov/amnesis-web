import classNames from "classnames";
import classes from "./styles.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

interface NavigationLinkProps {
    text: string;
    navigateTo: string;
    optionalStyles?: (
        | "bg-red"
        | "bg-blue"
        | "round"
        | "inline"
        | "underline"
        | "no-hover"
    )[];
    width?: number;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
    text,
    navigateTo,
    optionalStyles,
    width,
}) => {
    const navigation = useNavigate();
    const location = useLocation();

    return (
        <span
            className={classNames(
                classes["link"],
                location.pathname === navigateTo && classes.active,
                optionalStyles &&
                    optionalStyles.map((i) => classes[i]).join(" ")
            )}
            style={{ width: width || "auto" }}
            onClick={() => navigation(navigateTo)}
        >
            {text}
        </span>
    );
};

export default NavigationLink;
