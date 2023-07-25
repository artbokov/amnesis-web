import classes from "./styles.module.scss";
import { NavigationLink as Link } from "../index";

const links = [
  {
    path: "/info",
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
  return (
    <header className={classes.header}>
      <span className={classes.companyName}> AnaVIT </span>
      {links.map((i) => (
        <Link key={i.path} text={i.text} navigateTo={i.path} />
      ))}
    </header>
  );
};

export default Header;
