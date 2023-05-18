import { useLocation } from "react-router-dom";
import classes from "./styles.module.scss";
import CustomLink from "../CustomLink/CustomLink";

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

	return (
		<header className={classes.header}>
			<span className={classes.companyName}> AnaVIT </span>
			{links.map((link) => (
				<CustomLink
					key={link.path}
					text={link.text}
					navigateTo={link.path}
					isActive={link.path === location.pathname}
				/>
			))}
		</header>
	);
};

export default Header;
