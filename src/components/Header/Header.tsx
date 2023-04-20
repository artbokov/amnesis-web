import { useLocation, useNavigate } from "react-router-dom";
import classes from "./styles.module.scss";
import classNames from "classnames";

const links = [
  {
    path: "/",
    text: "О нас",
  },
  {
    path: "/chat",
    text: "Чат",
  },
  {
    path: "/support",
    text: "Поддержка",
  },
];

const Header = () => {
  const location = useLocation();
  const navigation = useNavigate();

  return (
    <header className={classes.header}>
      <span className={classes.companyName}> AnaVIT </span>
      {links.map(link =>
        <CustomLink
          key={link.path}
          text={link.text}
          navigate={() => navigation(link.path)}
          isActive={link.path === location.pathname}
        />
      )}
    </header>
  );
};

type CustomLinkProps = {
  text: string,
  navigate: () => void,
  isActive: boolean,
};

const CustomLink = ({ text, navigate, isActive }: CustomLinkProps) =>
  <span className={classNames(classes.link, isActive && classes.active)} onClick={navigate}> {text} </span>;

export default Header;