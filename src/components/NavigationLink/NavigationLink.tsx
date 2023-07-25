import classNames from "classnames";
import classes from "./styles.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

interface NavigationLinkProps {
  text: string;
  navigateTo: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  text,
  navigateTo,
}) => {
  const navigation = useNavigate();
  const location = useLocation();

  return (
    <span
      className={classNames(
        classes.link,
        location.pathname === navigateTo && classes.active
      )}
      onClick={() => navigation(navigateTo)}
    >
      {text}
    </span>
  );
};

export default NavigationLink;
