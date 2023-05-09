import classNames from "classnames";
import classes from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

type CustomLinkProps = {
  text: string,
  navigateTo: string,
  isActive: boolean,
};
  
const CustomLink = ({ text, navigateTo, isActive }: CustomLinkProps) => {
  const navigation = useNavigate()
  return (
    <span 
      className={classNames(classes.link, isActive && classes.active)}
      onClick={() => navigation(navigateTo)}
    > 
      {text} 
     </span>
  );
}
    

export default CustomLink;